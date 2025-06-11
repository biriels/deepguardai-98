
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Shield, Brain, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Standard",
      price: "Free",
      description: "Perfect for individuals getting started",
      features: [
        "Up to 10 detections per month",
        "Basic deepfake detection",
        "Image analysis only",
        "Community support",
        "Basic reporting"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Premium",
      price: "$10.99",
      description: "Ideal for businesses and professionals",
      features: [
        "Unlimited detections",
        "Advanced AI models ensemble",
        "Video, audio, image & text analysis",
        "Priority support",
        "Advanced analytics & reporting",
        "API access",
        "Real-time monitoring",
        "Custom detection models",
        "Batch processing",
        "White-label options"
      ],
      buttonText: "Start Premium",
      buttonVariant: "default" as const,
      popular: true
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto">
              Protect your business with industry-leading deepfake detection
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12 lg:mb-16">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative h-full ${plan.popular ? 'border-primary shadow-lg lg:scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm sm:text-base">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl sm:text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-muted-foreground text-sm sm:text-base">/month</span>}
                  </div>
                </CardHeader>

                <CardContent className="flex-grow">
                  <ul className="space-y-2 sm:space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base">{feature}</span>
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

          {/* Features Grid */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose DeepGuard Premium?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Enterprise Security</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Bank-grade security with SOC 2 compliance and encrypted data processing
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Advanced AI Models</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Multiple state-of-the-art models working together for 99%+ accuracy
                </p>
              </div>

              <div className="text-center">
                <div className="bg-primary/10 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Detailed Analytics</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Comprehensive reports and insights to protect your brand reputation
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
            
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
              <div className="border rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">What types of media can DeepGuard analyze?</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  DeepGuard can detect deepfakes in images, videos, audio files, and AI-generated text content.
                </p>
              </div>

              <div className="border rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">How accurate is the detection?</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Our ensemble of AI models achieves over 99% accuracy on standard benchmarks, with continuous improvements through machine learning.
                </p>
              </div>

              <div className="border rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Can I cancel my subscription anytime?</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Yes, you can cancel your Premium subscription at any time. Your access will continue until the end of your billing period.
                </p>
              </div>

              <div className="border rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Do you offer enterprise solutions?</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Yes, we offer custom enterprise solutions with dedicated support, on-premise deployment, and custom model training. Contact our sales team for more information.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-primary/5 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Protect Your Business?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of businesses already using DeepGuard to detect deepfakes
            </p>
            <Button size="lg" asChild>
              <Link to="/auth">Start Your Premium Trial</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
