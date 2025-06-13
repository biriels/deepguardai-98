
export interface PaystackPaymentData {
  email: string;
  amount: number;
  plan?: string;
  reference?: string;
  callback_url?: string;
  metadata?: {
    user_id: string;
    plan_type: string;
    payment_type: 'one_time' | 'subscription';
  };
}

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export const initializePaystackPayment = async (paymentData: PaystackPaymentData): Promise<PaystackResponse> => {
  const response = await fetch('/api/paystack/initialize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    throw new Error('Failed to initialize payment');
  }

  return response.json();
};

export const verifyPaystackPayment = async (reference: string) => {
  const response = await fetch(`/api/paystack/verify/${reference}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to verify payment');
  }

  return response.json();
};

export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  }).format(amount);
};
