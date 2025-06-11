import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabaseClient';

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil', // Use the latest available API version
});

// This is your Stripe CLI webhook secret for testing
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature') || '';

  let event;

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'customer.subscription.created':
      const subscriptionCreated = event.data.object as Stripe.Subscription;
      await handleSubscriptionCreated(subscriptionCreated);
      break;
    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object as Stripe.Subscription;
      await handleSubscriptionUpdated(subscriptionUpdated);
      break;
    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object as Stripe.Subscription;
      await handleSubscriptionDeleted(subscriptionDeleted);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Helper functions to handle subscription events

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  try {
    // Find the customer in our database
    const customerId = subscription.customer as string;
    
    // Query for users with this stripe_customer_id
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .single();
    
    if (userError) {
      console.error('Error finding user:', userError);
      return;
    }
    
    if (userData) {
      // Update the user's subscription status
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          subscription_status: subscription.status,
          subscription_id: subscription.id,
          subscription_period_end: new Date((subscription as any).current_period_end * 1000).toISOString()
        })
        .eq('id', userData.id);
        
      if (updateError) {
        console.error('Error updating user subscription status:', updateError);
      }
    } else {
      console.log('No user found for customer ID:', customerId);
    }
  } catch (error) {
    console.error('Error handling subscription created:', error);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  try {
    // Find the user with this subscription ID
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('subscription_id', subscription.id)
      .single();
    
    if (userError) {
      console.error('Error finding user:', userError);
      return;
    }
    
    if (userData) {
      // Update the user's subscription status
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          subscription_status: subscription.status,
          subscription_period_end: new Date((subscription as any).current_period_end * 1000).toISOString()
        })
        .eq('id', userData.id);
        
      if (updateError) {
        console.error('Error updating user subscription status:', updateError);
      }
    } else {
      console.log('No user found for subscription ID:', subscription.id);
    }
  } catch (error) {
    console.error('Error handling subscription updated:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    // Find the user with this subscription ID
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('subscription_id', subscription.id)
      .single();
    
    if (userError) {
      console.error('Error finding user:', userError);
      return;
    }
    
    if (userData) {
      // Update the user's subscription status
      const { error: updateError } = await supabase
        .from('users')
        .update({ 
          subscription_status: 'canceled',
          subscription_period_end: new Date((subscription as any).current_period_end * 1000).toISOString()
        })
        .eq('id', userData.id);
        
      if (updateError) {
        console.error('Error updating user subscription status:', updateError);
      }
    } else {
      console.log('No user found for subscription ID:', subscription.id);
    }
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
  }
}
