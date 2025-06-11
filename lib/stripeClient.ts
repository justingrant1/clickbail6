// Import Stripe SDK (install using: npm install @stripe/stripe-js)
import { loadStripe } from '@stripe/stripe-js';

// Load the Stripe publishable key from environment variables
export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

// Stripe client utility for frontend
export const createStripeSubscription = async (
  customerData: {
    name: string;
    email: string;
  },
  paymentMethodId: string
) => {
  try {
    // This function calls our API route that uses Stripe SDK
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerData,
        paymentMethodId,
        planId: 'starter_plan', // The ID of your plan in Stripe
        trialPeriodDays: 7, // 7-day free trial
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create subscription');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Stripe subscription:', error);
    throw error;
  }
};
