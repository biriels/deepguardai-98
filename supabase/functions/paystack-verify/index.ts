
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
    const url = new URL(req.url)
    const reference = url.pathname.split('/').pop()
    
    if (!reference) {
      throw new Error('Payment reference is required')
    }

    console.log('Verifying payment with reference:', reference)

    const paystackSecretKey = Deno.env.get('PAYSTACK_SECRET_KEY')
    if (!paystackSecretKey) {
      throw new Error('Paystack secret key not configured')
    }

    // Verify payment with Paystack
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecretKey}`,
        'Content-Type': 'application/json',
      },
    })

    const result = await response.json()

    if (!response.ok || !result.status) {
      throw new Error(result.message || 'Payment verification failed')
    }

    const paymentData = result.data
    console.log('Payment verification successful:', paymentData)
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Update transaction status
    const { data: transaction } = await supabase
      .from('payment_transactions')
      .update({ 
        status: paymentData.status === 'success' ? 'success' : 'failed',
        paystack_data: paymentData
      })
      .eq('reference', reference)
      .select()
      .single()

    if (paymentData.status === 'success' && transaction) {
      console.log('Payment successful, updating user plan')
      
      // Determine credits based on plan
      let creditsLimit = 10 // free plan default
      let userRole = 'standard'
      
      if (transaction.plan_type === 'starter') {
        creditsLimit = 1000
        userRole = 'starter'
      } else if (transaction.plan_type === 'professional') {
        creditsLimit = 10000
        userRole = 'premium'
      }

      // Update or create user plan
      const { error: planError } = await supabase
        .from('user_plans')
        .upsert({
          user_id: transaction.user_id,
          plan_type: transaction.plan_type,
          status: 'active',
          credits_limit: creditsLimit,
          credits_used: 0,
          payment_reference: reference,
          subscription_code: paymentData.subscription?.subscription_code || null,
          next_payment_date: transaction.payment_type === 'subscription' 
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
            : null
        }, {
          onConflict: 'user_id'
        })

      if (planError) {
        console.error('Error updating user plan:', planError)
      } else {
        console.log('User plan updated successfully')
      }

      // Update user role to reflect the new plan
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: transaction.user_id,
          role: userRole
        }, {
          onConflict: 'user_id'
        })

      if (roleError) {
        console.error('Error updating user role:', roleError)
      } else {
        console.log('User role updated to:', userRole)
      }
    }

    return new Response(
      JSON.stringify(result),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Payment verification error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
