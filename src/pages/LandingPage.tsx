
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Bell, BarChart3, Brain, Settings, Users, FileText, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            DeepGuard AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced deepfake detection platform with autonomous agents, real-time monitoring, and comprehensive analytics
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
              <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1 cursor-pointer">
                <CardHeader>
                  <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-2`}>
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <div>Explore {feature.title}</div>
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <Button asChild size="lg" className="px-8">
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
