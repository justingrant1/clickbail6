import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-05-28.basil', // Use the latest available API version
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerData, paymentMethodId } = body;

    // First create a customer in Stripe
    const customer = await stripe.customers.create({
      name: customerData.name,
      email: customerData.email,
    });

    if (!customer.id) {
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      );
    }

    // For a real application, you would have predefined products and prices
    // But for this example, we'll create them on demand
    
    // Check if product already exists
    let product;
    const existingProducts = await stripe.products.list({
      active: true,
      limit: 100,
    });
    
    // Find product by name or create a new one
    const existingProduct = existingProducts.data.find(p => p.name === 'Clickbail Starter Plan');
    
    if (existingProduct) {
      product = existingProduct;
    } else {
      product = await stripe.products.create({
        name: 'Clickbail Starter Plan',
        description: 'Starter plan with 7-day free trial then $49/month'
      });
    }

    // Check if price already exists for this product
    let price;
    const existingPrices = await stripe.prices.list({
      product: product.id,
      active: true,
      limit: 100,
    });
    
    // Find price or create a new one
    const existingPrice = existingPrices.data.find(
      p => p.unit_amount === 4900 && p.currency === 'usd'
    );
    
    if (existingPrice) {
      price = existingPrice;
    } else {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: 4900, // $49.00
        currency: 'usd',
        recurring: {
          interval: 'month'
        }
      });
    }

    // In a real implementation, we would attach the payment method to the customer
    // For this example, we'll skip this step since we're using a simulated payment method
    // await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });
    
    // Set as the default payment method
    // await stripe.customers.update(customer.id, {
    //   invoice_settings: { default_payment_method: paymentMethodId },
    // });

    // Create the subscription with a trial period
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      trial_period_days: 7,
    });

    // For TypeScript safety, we'll just use the subscription ID
    // In a real implementation, you would properly handle payment setup

    return NextResponse.json({
      success: true,
      customerId: customer.id,
      subscriptionId: subscription.id,
      message: 'Subscription created successfully with 7-day trial'
    });
    
  } catch (error: any) {
    console.error('Error creating subscription:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
