
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
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Protect your business with industry-leading deepfake detection
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-muted-foreground">/month</span>}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter>
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
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DeepGuard Premium?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enterprise Security</h3>
              <p className="text-muted-foreground">
                Bank-grade security with SOC 2 compliance and encrypted data processing
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced AI Models</h3>
              <p className="text-muted-foreground">
                Multiple state-of-the-art models working together for 99%+ accuracy
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detailed Analytics</h3>
              <p className="text-muted-foreground">
                Comprehensive reports and insights to protect your brand reputation
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">What types of media can DeepGuard analyze?</h3>
              <p className="text-muted-foreground">
                DeepGuard can detect deepfakes in images, videos, audio files, and AI-generated text content.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">How accurate is the detection?</h3>
              <p className="text-muted-foreground">
                Our ensemble of AI models achieves over 99% accuracy on standard benchmarks, with continuous improvements through machine learning.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I cancel my subscription anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your Premium subscription at any time. Your access will continue until the end of your billing period.
              </p>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-2">Do you offer enterprise solutions?</h3>
              <p className="text-muted-foreground">
                Yes, we offer custom enterprise solutions with dedicated support, on-premise deployment, and custom model training. Contact our sales team for more information.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-primary/5 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Business?</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Join thousands of businesses already using DeepGuard to detect deepfakes
          </p>
          <Button size="lg" asChild>
            <Link to="/auth">Start Your Premium Trial</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
