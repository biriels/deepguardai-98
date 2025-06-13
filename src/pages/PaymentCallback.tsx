
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout/Layout';

const PaymentCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');
      
      if (!reference) {
        setStatus('failed');
        setMessage('No payment reference found');
        return;
      }

      try {
        const { data, error } = await supabase.functions.invoke('paystack-verify', {
          body: { reference }
        });

        if (error) throw error;

        if (data?.status && data?.data?.status === 'success') {
          setStatus('success');
          setMessage('Payment successful! Your plan has been activated.');
          toast({
            title: "Payment Successful",
            description: "Your plan has been activated successfully!",
          });
        } else {
          setStatus('failed');
          setMessage('Payment verification failed');
          toast({
            title: "Payment Failed",
            description: "Payment could not be verified. Please contact support.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage('Failed to verify payment');
        toast({
          title: "Verification Error",
          description: "Could not verify payment. Please contact support.",
          variant: "destructive",
        });
      }
    };

    verifyPayment();
  }, [searchParams, toast]);

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
