'use client';

import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ReactNode } from 'react';

// Initialize Stripe outside of component to prevent re-renders
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface StripeWrapperProps {
    children: ReactNode;
    options: StripeElementsOptions;
}

export default function StripeWrapper({ children, options }: StripeWrapperProps) {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return (
            <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg">
                Stripe Publishable Key is missing in environment variables.
            </div>
        );
    }

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
}
