import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import prisma from '../db/prisma';
import { AppError } from '../middleware/errorHandler';
import { UserStatus, LawyerProfileStatus } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2023-10-16' as any,
});

/**
 * Plan to Price ID mapping
 * TODO: Replace these with your actual Stripe Price IDs from Step 1 of the plan
 */
const PLAN_PRICE_MAPPING: Record<string, string> = {
    'basic': 'price_1SvDw4JNHB6KaOUIO84apqQJ',
    'superior': 'price_1SvDreJNHB6KaOUIgc59PMmb',
    'online-pro': 'price_1SvDwYJNHB6KaOUIJ3QBRrYp',
};

/**
 * @desc    Create a Stripe Subscription and return clientSecret for Elements
 * @route   POST /api/stripe/create-subscription
 * @access  Private
 */
export async function createSubscription(req: Request, res: Response, next: NextFunction) {
    try {
        const { planId } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            throw new AppError('User not authenticated', 401);
        }

        const priceId = PLAN_PRICE_MAPPING[planId.toLowerCase()];
        if (!priceId) {
            throw new AppError('Invalid plan ID', 400);
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new AppError('User not found', 404);
        }

        // 1. Ensure customer exists
        let customerId = user.stripeCustomerId;
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: user.email,
                metadata: { userId: user.id },
            });
            customerId = customer.id;
            await prisma.user.update({
                where: { id: user.id },
                data: { stripeCustomerId: customerId },
            });
        }

        // 2. Create subscription
        const subscription = await stripe.subscriptions.create({
            customer: customerId,
            items: [{ price: priceId }],
            payment_behavior: 'default_incomplete',
            payment_settings: { save_default_payment_method: 'on_subscription' },
            expand: ['latest_invoice.payment_intent'],
            metadata: {
                userId: user.id,
                planId: planId
            },
        });

        const invoice = subscription.latest_invoice as any;
        const paymentIntent = invoice.payment_intent as Stripe.PaymentIntent;

        res.json({
            success: true,
            subscriptionId: subscription.id,
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * @desc    Handle Stripe Webhooks
 */
export async function handleWebhook(req: Request, res: Response, next: NextFunction) {
    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET || ''
        );
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'invoice.paid':
            const invoice = event.data.object as Stripe.Invoice;
            await handleInvoicePaid(invoice);
            break;
        case 'customer.subscription.deleted':
            const subscription = event.data.object as Stripe.Subscription;
            await handleSubscriptionDeleted(subscription);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
}

async function handleInvoicePaid(invoice: any) {
    const subscriptionId = invoice.subscription as string;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const userId = subscription.metadata?.userId;
    const planId = subscription.metadata?.planId;

    if (userId) {
        await prisma.user.update({
            where: { id: userId },
            data: {
                stripeSubscriptionId: subscriptionId,
                subscriptionPlanId: planId,
                subscriptionStatus: 'active',
                status: UserStatus.APPROVED,
            },
        });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { lawyerProfile: true }
        });

        if (user?.lawyerProfile) {
            await prisma.lawyerProfile.update({
                where: { id: user.lawyerProfile.id },
                data: { status: LawyerProfileStatus.APPROVED }
            });
        }
    }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const stripeSubscriptionId = subscription.id;
    const user = await prisma.user.findFirst({
        where: { stripeSubscriptionId }
    });

    if (user) {
        await prisma.user.update({
            where: { id: user.id },
            data: {
                subscriptionStatus: 'canceled',
            }
        });
    }
}
