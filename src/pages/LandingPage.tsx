
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Brain, BarChart3, CheckCircle, ArrowRight, Zap, Globe, Users, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import PricingSection from "@/components/Landing/PricingSection";

const LandingPage = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Advanced Detection",
      description: "State-of-the-art AI models detect deepfakes with 99%+ accuracy across images, videos, and audio."
    },
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "Real-time Analysis",
      description: "Get instant results with our optimized detection pipeline. Analyze content in seconds, not minutes."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      title: "Detailed Insights",
      description: "Comprehensive reports with confidence scores, anomaly detection, and forensic evidence."
    }
  ];

  const trustIndicators = [
    { icon: <Users className="h-5 w-5" />, text: "10,000+ businesses trust us" },
    { icon: <Globe className="h-5 w-5" />, text: "99.8% uptime guarantee" },
    { icon: <Lock className="h-5 w-5" />, text: "SOC 2 compliant" },
    { icon: <Zap className="h-5 w-5" />, text: "Sub-second response times" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-2" />
              <span className="text-xl font-bold">DeepGuard</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link to="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link to="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              New: Real-time video analysis now available
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
              Detect Deepfakes with
              <span className="text-primary block">AI-Powered Precision</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Protect your business from synthetic media threats. Our advanced AI detects deepfakes in images, videos, and audio with industry-leading accuracy.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-8 text-sm text-muted-foreground">
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2">
                  {indicator.icon}
                  <span>{indicator.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/auth">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/detection">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Try Detection Demo
                </Button>
              </Link>
            </div>

            {/* Demo placeholder */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-card rounded-lg border shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Live Detection Demo</h3>
                  <Badge variant="secondary">Real-time</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="w-full h-32 bg-muted-foreground/20 rounded mb-2 flex items-center justify-center">
                      <span className="text-muted-foreground">Upload Media</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Drop your file here</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Authenticity Score</span>
                        <span className="text-sm font-medium text-green-600">94.7% Authentic</span>
                      </div>
                      <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "94.7%" }}></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        Analysis complete in 0.8s
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Detection Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides comprehensive deepfake detection across all media types.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Secure Your Content?
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Join thousands of businesses protecting their reputation with DeepGuard's advanced detection technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary mr-2" />
                <span className="text-xl font-bold">DeepGuard</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Leading the fight against synthetic media with AI-powered deepfake detection technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link to="/detection" className="hover:text-foreground">Detection</Link></li>
                <li><Link to="/dashboard" className="hover:text-foreground">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#" className="hover:text-foreground">About</Link></li>
                <li><Link to="#" className="hover:text-foreground">Contact</Link></li>
                <li><Link to="#" className="hover:text-foreground">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 DeepGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
