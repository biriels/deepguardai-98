
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardMetrics } from "@/components/Dashboard/DashboardMetrics";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, Clock, ArrowUpRight } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DeepGuard Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring and protection against deepfakes on social media
          </p>
        </div>

        <DashboardMetrics />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <Shield className="h-5 w-5 text-violet-500" />
                Protection Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Overall Security</span>
                  <span className="text-sm font-semibold text-violet-600">87%</span>
                </div>
                <Progress value={87} className="h-2 bg-gray-100 dark:bg-gray-800" />
                
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Monitors</span>
                    <span className="font-medium">16/18</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Scans Today</span>
                    <span className="font-medium">348</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Threats Neutralized</span>
                    <span className="font-medium">27</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Recent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    title: "Deepfake Video Detected",
                    platform: "TikTok",
                    time: "10 minutes ago",
                    level: "High"
                  },
                  {
                    title: "Manipulated Image Found",
                    platform: "Instagram",
                    time: "42 minutes ago",
                    level: "Medium"
                  },
                  {
                    title: "AI Generated Content",
                    platform: "Twitter",
                    time: "2 hours ago",
                    level: "Low"
                  }
                ].map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 border-b last:border-0 pb-3 last:pb-0">
                    <div className={`w-2 h-2 mt-2 rounded-full ${
                      alert.level === "High" ? "bg-red-500" :
                      alert.level === "Medium" ? "bg-amber-500" : "bg-green-500"
                    }`} />
                    <div className="flex-1">
                      <p className="font-medium">{alert.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <span>{alert.platform}</span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <Clock className="h-3 w-3" />
                          {alert.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2 text-sm">
                  View All Alerts
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Detection Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Deepfake Videos", count: 132, change: "+12%" },
                  { label: "AI Generated Text", count: 837, change: "+28%" },
                  { label: "Manipulated Images", count: 271, change: "+9%" }
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm">{stat.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{stat.count}</span>
                      <span className="text-xs flex items-center text-emerald-500 font-medium">
                        <ArrowUpRight className="h-3 w-3 mr-0.5" />
                        {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="pt-2 mt-2 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Detection Accuracy</span>
                    <span className="text-sm font-semibold">94.6%</span>
                  </div>
                  <Progress value={94.6} className="h-2 bg-gray-100 dark:bg-gray-800" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Alert className="border-violet-200 bg-violet-50 dark:bg-violet-900/20 dark:border-violet-800/30">
          <Shield className="h-4 w-4 text-violet-500 dark:text-violet-400" />
          <AlertTitle className="text-violet-800 dark:text-violet-300">Protection Mode Active</AlertTitle>
          <AlertDescription className="text-violet-700 dark:text-violet-400">
            DeepGuard is actively monitoring 18 social platforms for potential deepfakes and AI-generated content.
          </AlertDescription>
        </Alert>
      </div>
    </Layout>
  );
};

export default Index;
