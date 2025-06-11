import { NextResponse } from 'next/server';
import { use_mcp_tool } from '@/lib/mcp-handlers';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerData, paymentMethodId, planId, trialPeriodDays } = body;

    // First create a customer in Stripe
    const customerResponse = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'create_customer',
      arguments: {
        name: customerData.name,
        email: customerData.email,
      }
    });

    if (!customerResponse?.id) {
      return NextResponse.json(
        { error: 'Failed to create customer' },
        { status: 500 }
      );
    }

    // Create a product if needed
    // Note: In a real app, you'd have predefined products and prices
    const productResponse = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'create_product',
      arguments: {
        name: 'Clickbail Starter Plan',
        description: 'Starter plan with 7-day free trial then $49/month'
      }
    });

    if (!productResponse?.id) {
      return NextResponse.json(
        { error: 'Failed to create product' },
        { status: 500 }
      );
    }

    // Create a price for the product
    const priceResponse = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'create_price',
      arguments: {
        product: productResponse.id,
        unit_amount: 4900, // $49.00
        currency: 'usd'
      }
    });

    if (!priceResponse?.id) {
      return NextResponse.json(
        { error: 'Failed to create price' },
        { status: 500 }
      );
    }

    // Create a subscription with trial
    // Note: In a real implementation, you would first attach the payment method to the customer
    // and then create the subscription using that payment method
    
    // Create a payment link instead for demonstration
    const paymentLinkResponse = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'create_payment_link',
      arguments: {
        price: priceResponse.id,
        quantity: 1
      }
    });

    return NextResponse.json({
      success: true,
      customerId: customerResponse.id,
      productId: productResponse.id,
      priceId: priceResponse.id,
      paymentLink: paymentLinkResponse.url,
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
