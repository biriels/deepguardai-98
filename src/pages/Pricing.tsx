
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Shield, Brain, BarChart3, Zap, Clock, Users, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individuals getting started",
      features: [
        "10 API calls per month",
        "Basic deepfake detection",
        "Image analysis only",
        "Community support",
        "Basic reporting",
        "48-hour response time"
      ],
      apiLimits: {
        calls: "10/month",
        fileSize: "5MB max",
        formats: "JPG, PNG"
      },
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Starter",
      price: "$29",
      description: "For small businesses and professionals",
      features: [
        "1,000 API calls per month",
        "Enhanced detection models",
        "Image & video analysis",
        "Email support",
        "Advanced reporting",
        "24-hour response time",
        "Webhook notifications"
      ],
      apiLimits: {
        calls: "1,000/month",
        fileSize: "50MB max",
        formats: "All major formats"
      },
      buttonText: "Start Starter Plan",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Professional",
      price: "$99",
      description: "For growing businesses with higher volume",
      features: [
        "10,000 API calls per month",
        "Premium AI models ensemble",
        "Video, audio, image & text analysis",
        "Priority support",
        "Custom analytics dashboard",
        "API access with higher limits",
        "Real-time monitoring",
        "Batch processing",
        "4-hour response time"
      ],
      apiLimits: {
        calls: "10,000/month",
        fileSize: "200MB max",
        formats: "All formats + bulk"
      },
      buttonText: "Go Professional",
      buttonVariant: "default" as const,
      popular: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations with custom needs",
      features: [
        "Unlimited API calls",
        "Custom detection models",
        "All content types supported",
        "Dedicated support team",
        "Custom integrations",
        "On-premise deployment option",
        "White-label solutions",
        "SLA guarantees",
        "1-hour response time",
        "Custom reporting"
      ],
      apiLimits: {
        calls: "Unlimited",
        fileSize: "No limits",
        formats: "All + custom"
      },
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  const apiPricing = [
    {
      tier: "Pay-as-you-go",
      price: "$0.10",
      unit: "per API call",
      description: "No monthly commitment, pay only for what you use",
      features: [
        "No setup fees",
        "All detection models",
        "Standard support",
        "Usage analytics"
      ]
    },
    {
      tier: "Volume Discount",
      price: "$0.05",
      unit: "per API call",
      description: "For 50,000+ calls per month",
      features: [
        "50% discount on high volume",
        "Priority processing",
        "Dedicated support",
        "Custom billing"
      ]
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
              Protect your business with industry-leading deepfake detection. Scale with confidence.
            </p>
          </div>

          {/* Monthly Plans */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">Monthly Subscription Plans</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4 mb-12">
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
                      {plan.price !== "Custom" && plan.price !== "$0" && <span className="text-muted-foreground text-sm sm:text-base">/month</span>}
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow space-y-4">
                    {/* API Limits */}
                    <div className="bg-muted/50 rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2">API Limits</h4>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex justify-between">
                          <span>API Calls:</span>
                          <span className="font-medium">{plan.apiLimits.calls}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>File Size:</span>
                          <span className="font-medium">{plan.apiLimits.fileSize}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Formats:</span>
                          <span className="font-medium">{plan.apiLimits.formats}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
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
          </div>

          {/* API Pricing */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">API Usage Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {apiPricing.map((tier, index) => (
                <Card key={index} className="h-full">
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{tier.tier}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-3xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground ml-2">{tier.unit}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/auth">Get Started</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Comparison */}
          <div className="mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Why Choose DeepGuard?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
                  <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Real-time detection with sub-second response times via optimized API
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
                <h3 className="font-semibold mb-2 text-sm sm:text-base">What happens if I exceed my API limit?</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  You can upgrade your plan anytime or use our pay-as-you-go pricing for additional calls at $0.10 per API call.
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
                  Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.
                </p>
              </div>

              <div className="border rounded-lg p-4 sm:p-6">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Do you offer volume discounts?</h3>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Yes, we offer 50% discounts for high-volume usage (50,000+ API calls per month) and custom enterprise pricing.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-primary/5 rounded-lg p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Protect Your Business?</h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of businesses already using DeepGuard to detect deepfakes and protect their reputation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/auth">Start Free Trial</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/auth">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;
