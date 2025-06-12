
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

export const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "10 API calls per month",
        "Basic deepfake detection",
        "Image analysis only",
        "Community support"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Starter",
      price: "$29",
      description: "For small businesses",
      features: [
        "1,000 API calls per month",
        "Enhanced detection models",
        "Image & video analysis",
        "Email support",
        "Advanced reporting"
      ],
      buttonText: "Start Starter Plan",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Professional",
      price: "$99",
      description: "For growing businesses",
      features: [
        "10,000 API calls per month",
        "Premium AI models",
        "All content types",
        "Priority support",
        "Custom analytics"
      ],
      buttonText: "Go Professional",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Scale as you grow with our flexible API pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "$0" && <span className="text-muted-foreground">/month</span>}
                </div>
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

              <CardFooter className="pt-4">
                <Button 
                  variant={plan.buttonVariant} 
                  className="w-full"
                  asChild
                >
                  <Link to="/auth">{plan.buttonText}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Need more API calls? We offer volume discounts and enterprise pricing.
          </p>
          <Button variant="outline" asChild>
            <Link to="/pricing">View All Plans & API Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
