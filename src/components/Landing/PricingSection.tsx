
import React from "react";
import { InteractivePricingCard } from "@/components/Pricing/InteractivePricingCard";

export const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      priceValue: 0,
      description: "Perfect for getting started",
      features: [
        "10 API calls per month",
        "Basic deepfake detection",
        "Image analysis only",
        "Community support"
      ],
      credits: 10,
      buttonText: "Current Plan",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Starter",
      price: "$29",
      priceValue: 29,
      description: "For small businesses",
      features: [
        "1,000 API calls per month",
        "Enhanced detection models",
        "Image & video analysis",
        "Email support",
        "Advanced reporting"
      ],
      credits: 1000,
      buttonText: "Choose Starter",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Professional",
      price: "$99",
      priceValue: 99,
      description: "For growing businesses",
      features: [
        "10,000 API calls per month",
        "Premium AI models",
        "All content types",
        "Priority support",
        "Custom analytics"
      ],
      credits: 10000,
      buttonText: "Choose Professional",
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
            Choose the perfect plan for your needs. Pay monthly or one-time with secure Paystack integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <InteractivePricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
