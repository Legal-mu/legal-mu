import { Router } from 'express';
import express from 'express';
import { createSubscription, handleWebhook } from '../controllers/stripeController';
import { authenticate } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/stripe/webhook
 * @desc    Stripe Webhook handler (raw body required)
 * @access  Public
 */
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

/**
 * @route   POST /api/stripe/create-subscription
 * @desc    Create Stripe Subscription for Elements
 * @access  Private (Lawyer)
 */
router.post('/create-subscription', authenticate, express.json(), createSubscription);

export default router;
