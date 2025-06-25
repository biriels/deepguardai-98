
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import Layout from '@/components/Layout/Layout';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { refreshUserPlan } = useUser();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [message, setMessage] = useState('');
  const [planDetails, setPlanDetails] = useState<{ plan: string; amount: number } | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');
      
      if (!reference) {
        setStatus('failed');
        setMessage('No payment reference found');
        return;
      }

      try {
        console.log('Verifying payment with reference:', reference);
        const { data, error } = await supabase.functions.invoke('paystack-verify', {
          body: { reference }
        });

        if (error) {
          console.error('Payment verification error:', error);
          throw error;
        }

        console.log('Payment verification response:', data);

        if (data?.status && data?.data?.status === 'success') {
          setStatus('success');
          
          // Extract plan details from payment data
          const paymentData = data.data;
          const amount = paymentData.amount / 100; // Convert from kobo to naira
          let planType = 'starter';
          
          if (amount >= 99) {
            planType = 'professional';
          } else if (amount >= 29) {
            planType = 'starter';
          }
          
          setPlanDetails({
            plan: planType.charAt(0).toUpperCase() + planType.slice(1),
            amount: amount
          });
          
          setMessage(`Payment successful! Your ${planType.charAt(0).toUpperCase() + planType.slice(1)} plan has been activated.`);
          
          // Refresh user plan to reflect the upgrade
          if (refreshUserPlan) {
            await refreshUserPlan();
          }
          
          toast({
            title: "Payment Successful",
            description: `Your ${planType.charAt(0).toUpperCase() + planType.slice(1)} plan is now active!`,
          });
        } else {
          setStatus('failed');
          setMessage('Payment verification failed. Please contact support if payment was deducted.');
          toast({
            title: "Payment Failed",
            description: "Payment could not be verified. Please contact support.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage('Failed to verify payment. Please contact support if payment was deducted.');
        toast({
          title: "Verification Error",
          description: "Could not verify payment. Please contact support.",
          variant: "destructive",
        });
      }
    };

    verifyPayment();
  }, [searchParams, toast, refreshUserPlan]);

  const handleContinue = () => {
    if (status === 'success') {
      navigate('/dashboard');
    } else {
      navigate('/pricing');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {status === 'loading' && <Loader2 className="w-16 h-16 animate-spin text-primary" />}
              {status === 'success' && <CheckCircle className="w-16 h-16 text-green-500" />}
              {status === 'failed' && <XCircle className="w-16 h-16 text-red-500" />}
            </div>
            <CardTitle>
              {status === 'loading' && 'Verifying Payment...'}
              {status === 'success' && 'Payment Successful!'}
              {status === 'failed' && 'Payment Failed'}
            </CardTitle>
            <CardDescription>{message}</CardDescription>
            {status === 'success' && planDetails && (
              <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800">
                  {planDetails.plan} Plan Activated
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Amount: ₦{planDetails.amount.toLocaleString()}
                </p>
              </div>
            )}
          </CardHeader>
          
          <CardContent className="text-center">
            {status !== 'loading' && (
              <Button onClick={handleContinue} className="w-full">
                {status === 'success' ? 'Go to Dashboard' : 'Try Again'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PaymentCallback;
