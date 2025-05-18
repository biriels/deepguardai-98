
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Bell, BarChart3, Brain, Settings, Users, FileText, AlertTriangle, ArrowRight, BookOpenText, Rocket, Star, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const LandingPage = () => {
  const { toast } = useToast();

  const showToast = (feature: string) => {
    toast({
      title: `Navigating to ${feature}`,
      description: `Opening ${feature.toLowerCase()} interface`
    });
  };

  const features = [
    {
      title: "Detection",
      description: "Analyze content to identify potential deepfakes",
      icon: <Shield className="h-6 w-6" />,
      path: "/detection",
      color: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Analytics",
      description: "View insights and statistics on detection activity",
      icon: <BarChart3 className="h-6 w-6" />,
      path: "/analytics",
      color: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      title: "AI Agents",
      description: "Configure autonomous agents for content monitoring",
      icon: <Brain className="h-6 w-6" />,
      path: "/agents",
      color: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Alerts",
      description: "View and manage deepfake detection alerts",
      icon: <AlertTriangle className="h-6 w-6" />,
      path: "/alerts",
      color: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
      title: "Monitoring",
      description: "Real-time monitoring of detection systems",
      icon: <Activity className="h-6 w-6" />,
      path: "/monitoring",
      color: "bg-pink-100 dark:bg-pink-900/20"
    },
    {
      title: "Reports",
      description: "Generate and view detailed detection reports",
      icon: <FileText className="h-6 w-6" />,
      path: "/reports",
      color: "bg-indigo-100 dark:bg-indigo-900/20"
    },
    {
      title: "Team",
      description: "Manage team members and permissions",
      icon: <Users className="h-6 w-6" />,
      path: "/team",
      color: "bg-orange-100 dark:bg-orange-900/20"
    },
    {
      title: "Settings",
      description: "Configure system preferences and security settings",
      icon: <Settings className="h-6 w-6" />,
      path: "/settings",
      color: "bg-teal-100 dark:bg-teal-900/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-blue-500/20"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mx-auto max-w-3xl">
            <Badge variant="outline" className="mb-6 px-3 py-1 text-sm bg-white/10 backdrop-blur-sm border-white/20 text-foreground">
              v2.0 | Advanced AI Detection
            </Badge>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-blue-500 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
              DeepGuard AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Combat digital misinformation with our powerful deepfake detection platform powered by autonomous AI agents
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                <Link to="/dashboard">Launch Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" className="backdrop-blur-sm bg-white/10 border-white/20">
                <Link to="/detection">Try Detection</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 mb-4 text-primary">
                <BookOpenText size={20} />
                <span className="font-semibold">Getting Started</span>
              </div>
              <h2 className="text-4xl font-bold mb-6">Begin Your Deepfake Detection Journey</h2>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">1</div>
                  <div>
                    <h3 className="font-semibold text-xl">Create your account</h3>
                    <p className="text-muted-foreground">Set up your organization and invite team members</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">2</div>
                  <div>
                    <h3 className="font-semibold text-xl">Configure your agents</h3>
                    <p className="text-muted-foreground">Tailor AI agents to your organization's needs</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center">3</div>
                  <div>
                    <h3 className="font-semibold text-xl">Integrate with your platforms</h3>
                    <p className="text-muted-foreground">Connect to your content systems via our simple API</p>
                  </div>
                </div>
                <Button className="mt-4" asChild>
                  <Link to="/api-docs">
                    View API Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <div className="bg-card p-1 rounded-xl">
                <img 
                  src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="DeepGuard AI Dashboard"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <BookOpenText size={20} />
              <span className="font-semibold">How It Works</span>
            </div>
            <h2 className="text-4xl font-bold">Autonomous AI Detection System</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Our platform leverages multiple AI agents working together to provide comprehensive deepfake detection and management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
                <Shield className="text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Detection</h3>
              <p className="text-muted-foreground">
                Advanced neural networks analyze visual and audio content to identify manipulated media with up to 99.8% accuracy
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
                <Brain className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learning</h3>
              <p className="text-muted-foreground">
                Our AI continuously learns from new deepfake techniques, ensuring protection against emerging threats
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                <AlertTriangle className="text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Alerts</h3>
              <p className="text-muted-foreground">
                Real-time notification system informs your team immediately when suspicious content is detected
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" className="mt-4" asChild>
              <Link to="/detection">
                Learn more about our technology
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-accent/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 text-primary">
              <Star size={20} />
              <span className="font-semibold">Features</span>
            </div>
            <h2 className="text-4xl font-bold">Comprehensive Protection Suite</h2>
            <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
              Discover all the powerful tools and features available in the DeepGuard AI platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Link 
                key={feature.title} 
                to={feature.path}
                onClick={() => showToast(feature.title)}
                className="no-underline text-foreground"
              >
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border-white/10 backdrop-blur-sm bg-white/5">
                  <CardHeader>
                    <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-2`}>
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="w-full" asChild>
                      <div>Explore {feature.title} <ArrowRight className="ml-2 h-4 w-4" /></div>
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Request Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-blue-600/20 to-violet-600/20 backdrop-blur-sm border border-white/10 p-8 md:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <div className="inline-flex items-center gap-2 mb-4 text-primary">
                  <Rocket size={20} />
                  <span className="font-semibold">Request a Demo</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">Ready to see DeepGuard AI in action?</h2>
                <p className="text-muted-foreground mb-8">
                  Schedule a personalized demo with our team to see how our platform can help protect your organization from deepfake threats
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Mail className="text-blue-500 h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email Demo</p>
                      <p className="text-sm text-muted-foreground">Get a detailed presentation in your inbox</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                      <Video className="text-violet-500 h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Video Demo</p>
                      <p className="text-sm text-muted-foreground">Schedule a live video demonstration</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-card/70 backdrop-blur-sm p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">First Name</label>
                      <input type="text" className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-md" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Last Name</label>
                      <input type="text" className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-md" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <input type="email" className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Company</label>
                    <input type="text" className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-md" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Message</label>
                    <textarea className="w-full px-3 py-2 bg-background/50 border border-white/10 rounded-md h-24"></textarea>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                    Request Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join leading organizations worldwide using DeepGuard AI to protect their digital content integrity
          </p>
          <Button asChild size="lg" className="px-8 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
