
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Loader2 } from "lucide-react";
import { useAuthContext } from '@/contexts/AuthContext';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PricingPlan {
  name: string;
  price: string;
  priceValue: number;
  description: string;
  features: string[];
  credits: number;
  buttonText: string;
  buttonVariant: "default" | "outline";
  popular: boolean;
}

interface InteractivePricingCardProps {
  plan: PricingPlan;
}

export const InteractivePricingCard: React.FC<InteractivePricingCardProps> = ({ plan }) => {
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState<'one_time' | 'subscription'>('subscription');
  const { user } = useAuthContext();
  const { userPlan } = useUser();
  const { toast } = useToast();

  // Check if this is the user's current plan
  const isCurrentPlan = () => {
    const planName = plan.name.toLowerCase();
    if (planName === 'free' && userPlan === 'standard') return true;
    if (planName === 'starter' && userPlan === 'starter') return true;
    if (planName === 'professional' && userPlan === 'professional') return true;
    return false;
  };

  const handlePayment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to purchase a plan.",
        variant: "destructive",
      });
      return;
    }

    if (plan.priceValue === 0) {
      toast({
        title: "Free Plan",
        description: "You're already on the free plan!",
      });
      return;
    }

    if (isCurrentPlan()) {
      toast({
        title: "Current Plan",
        description: `You're already on the ${plan.name} plan!`,
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Initializing payment for plan:', plan.name);
      const { data, error } = await supabase.functions.invoke('paystack-initialize', {
        body: {
          email: user.email,
          amount: plan.priceValue,
          metadata: {
            user_id: user.id,
            plan_type: plan.name.toLowerCase(),
            payment_type: paymentType,
          }
        }
      });

      if (error) {
        console.error('Payment initialization error:', error);
        throw error;
      }

      console.log('Payment initialization response:', data);

      if (data?.data?.authorization_url) {
        // Store the selected plan in localStorage for reference
        localStorage.setItem('selectedPlan', JSON.stringify({
          name: plan.name,
          price: plan.priceValue,
          paymentType
        }));
        
        // Redirect to Paystack payment page
        window.location.href = data.data.authorization_url;
      } else {
        throw new Error('Invalid payment response');
      }
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (isCurrentPlan()) return "Current Plan";
    if (plan.priceValue === 0) return "Current Plan";
    return plan.buttonText;
  };

  const getButtonVariant = () => {
    if (isCurrentPlan()) return "outline" as const;
    return plan.buttonVariant;
  };

  return (
    <Card className={`relative h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} ${isCurrentPlan() ? 'border-green-500 bg-green-50' : ''}`}>
      {plan.popular && !isCurrentPlan() && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
          <Star className="w-3 h-3 mr-1" />
          Most Popular
        </Badge>
      )}
      
      {isCurrentPlan() && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500">
          Your Plan
        </Badge>
      )}
      
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl">{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-3xl font-bold">{plan.price}</span>
          {plan.priceValue > 0 && <span className="text-muted-foreground">/month</span>}
        </div>
        {plan.credits > 0 && (
          <div className="mt-2">
            <Badge variant="secondary">{plan.credits.toLocaleString()} API calls/month</Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-start">
              <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="pt-4 flex flex-col space-y-3">
        {plan.priceValue > 0 && !isCurrentPlan() && (
          <div className="flex gap-2 w-full">
            <Button
              variant={paymentType === 'subscription' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPaymentType('subscription')}
              className="flex-1"
            >
              Monthly
            </Button>
            <Button
              variant={paymentType === 'one_time' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPaymentType('one_time')}
              className="flex-1"
            >
              One-time
            </Button>
          </div>
        )}
        
        <Button 
          variant={getButtonVariant()} 
          className="w-full"
          onClick={handlePayment}
          disabled={loading || isCurrentPlan()}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            getButtonText()
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};
