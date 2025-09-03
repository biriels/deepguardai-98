import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Users, Target, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "We prioritize the security and privacy of our users above all else, using cutting-edge technology to protect against emerging threats."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Our solutions are designed with the end user in mind, ensuring accessibility and ease of use without compromising on effectiveness."
    },
    {
      icon: Target,
      title: "Precision",
      description: "We leverage advanced AI models to deliver highly accurate threat detection with minimal false positives."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in our technology, support, and service delivery to exceed user expectations."
    }
  ];

  const team = [
    {
      name: "Alex Thompson",
      role: "Chief Executive Officer",
      bio: "Former cybersecurity expert with 15+ years in AI and threat detection."
    },
    {
      name: "Sarah Chen",
      role: "Chief Technology Officer", 
      bio: "AI researcher specializing in computer vision and deep learning systems."
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Security",
      bio: "Cybersecurity veteran with expertise in breach detection and prevention."
    },
    {
      name: "Emily Watson",
      role: "Head of Product",
      bio: "Product strategist focused on user experience and AI-powered solutions."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold">
              DeepGuard
            </Link>
            <Link to="/dashboard">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            About DeepGuard
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Protecting Digital Integrity with Advanced AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            DeepGuard is a cutting-edge AI platform designed to detect and prevent deepfakes, 
            monitor digital threats, and safeguard personal and organizational data from emerging 
            cyber risks in our increasingly digital world.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              To democratize advanced threat detection technology and make it accessible to individuals 
              and organizations of all sizes, empowering them to navigate the digital landscape with 
              confidence and security.
            </p>
          </CardContent>
        </Card>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="p-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-lg max-w-none">
            <div className="space-y-6 text-muted-foreground">
              <p>
                DeepGuard was founded in 2024 by a team of cybersecurity experts and AI researchers 
                who recognized the growing threat of sophisticated digital deception technologies. 
                As deepfakes and AI-generated content became more realistic and accessible, traditional 
                security measures proved inadequate.
              </p>
              <p>
                Our founding team, with combined decades of experience in cybersecurity, artificial 
                intelligence, and digital forensics, set out to create a comprehensive solution that 
                could stay ahead of emerging threats while remaining user-friendly and accessible.
              </p>
              <p>
                Today, DeepGuard protects thousands of users worldwide, from individuals safeguarding 
                their personal digital presence to enterprises securing their digital assets against 
                sophisticated AI-powered attacks.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-muted/30 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust DeepGuard to protect their digital presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 DeepGuard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;