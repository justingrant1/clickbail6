import { use_mcp_tool } from './mcp-handlers';

// Stripe client utility for frontend
export const createStripeSubscription = async (
  customerData: {
    name: string;
    email: string;
  },
  paymentMethodId: string
) => {
  try {
    // This function would call a serverless function or API route that uses Stripe SDK
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

// Stripe MCP utility functions
export async function createMCPStripeCustomer(name: string, email: string) {
  try {
    const response = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'create_customer',
      arguments: {
        name,
        email,
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating Stripe customer:', error);
    return null;
  }
}

export async function createMCPStripeProduct(name: string, description?: string) {
  try {
    const response = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'create_product',
      arguments: {
        name,
        description,
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating Stripe product:', error);
    return null;
  }
}

export async function createMCPStripePrice(product: string, unit_amount: number, currency: string = 'usd') {
  try {
    const response = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'create_price',
      arguments: {
        product,
        unit_amount,
        currency,
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating Stripe price:', error);
    return null;
  }
}

export async function createMCPStripePaymentLink(price: string, quantity: number = 1) {
  try {
    const response = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'create_payment_link',
      arguments: {
        price,
        quantity,
      }
    });
    return response;
  } catch (error) {
    console.error('Error creating Stripe payment link:', error);
    return null;
  }
}

export async function listMCPStripeCustomers(email?: string, limit?: number) {
  try {
    const response = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'list_customers',
      arguments: {
        email,
        limit,
      }
    });
    return response;
  } catch (error) {
    console.error('Error listing Stripe customers:', error);
    return null;
  }
}

export async function listMCPStripeProducts(limit?: number) {
  try {
    const response = await use_mcp_tool({
      server_name: 'github.com/stripe/agent-toolkit',
      tool_name: 'list_products',
      arguments: {
        limit,
      }
    });
    return response;
  } catch (error) {
    console.error('Error listing Stripe products:', error);
    return null;
  }
}
