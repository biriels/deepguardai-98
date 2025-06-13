
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email, amount, plan, metadata } = await req.json()
    
    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!paystackSecretKey) {
      throw new Error('Paystack secret key not configured')
    }

    const reference = `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    const paymentData = {
      email,
      amount: amount * 100, // Paystack expects amount in kobo
      reference,
      callback_url: `${req.headers.get('origin')}/payment/callback`,
      metadata: {
        ...metadata,
        reference,
      }
    }

    // If it's a subscription, add plan code
    if (metadata?.payment_type === 'subscription' && plan) {
      paymentData.plan = plan
    }

    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Payment initialization failed')
    }

    // Store transaction in database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    await supabase
      .from('payment_transactions')
      .insert({
        user_id: metadata.user_id,
        reference,
        amount: amount,
        currency: 'NGN',
        plan_type: metadata.plan_type,
        payment_type: metadata.payment_type,
        status: 'pending'
      })

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
