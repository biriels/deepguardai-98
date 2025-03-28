
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { MonitorPlay, PauseCircle, PlayCircle, RefreshCw, Trash2, Plus, Wifi } from "lucide-react";

const Monitoring = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoring</h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring of content across connected platforms
          </p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Active Monitors</CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Monitor
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="social" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="websites">Websites</TabsTrigger>
                <TabsTrigger value="custom">Custom API</TabsTrigger>
              </TabsList>

              <TabsContent value="social" className="space-y-4">
                {[
                  { 
                    name: "Twitter #AI Trend Monitor", 
                    status: "active", 
                    lastCheck: "1 min ago", 
                    detectionRate: 82, 
                    platform: "Twitter",
                    alerts: 24
                  },
                  { 
                    name: "Instagram Profile Guard", 
                    status: "active", 
                    lastCheck: "Just now", 
                    detectionRate: 95, 
                    platform: "Instagram",
                    alerts: 8
                  },
                  { 
                    name: "TikTok Trending Videos", 
                    status: "paused", 
                    lastCheck: "1 hour ago", 
                    detectionRate: 78, 
                    platform: "TikTok",
                    alerts: 17
                  },
                  { 
                    name: "LinkedIn Company Posts", 
                    status: "active", 
                    lastCheck: "5 mins ago", 
                    detectionRate: 91, 
                    platform: "LinkedIn",
                    alerts: 2
                  }
                ].map((monitor, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${monitor.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{monitor.name}</p>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {monitor.platform}
                          </Badge>
                        </div>
                        <div className="flex text-xs text-muted-foreground gap-2 mt-1">
                          <span>Last check: {monitor.lastCheck}</span>
                          <span>•</span>
                          <span>Detection rate: {monitor.detectionRate}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300">
                        {monitor.alerts} alerts
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      {monitor.status === "active" ? (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <PauseCircle className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <PlayCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="websites" className="space-y-4">
                {[
                  { 
                    name: "News Site Homepage", 
                    status: "active", 
                    lastCheck: "3 mins ago", 
                    detectionRate: 89, 
                    url: "newssource.com",
                    alerts: 12
                  },
                  { 
                    name: "E-commerce Listings", 
                    status: "active", 
                    lastCheck: "Just now", 
                    detectionRate: 93, 
                    url: "bigretailer.com/products",
                    alerts: 3
                  }
                ].map((monitor, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${monitor.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{monitor.name}</p>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {monitor.url}
                          </Badge>
                        </div>
                        <div className="flex text-xs text-muted-foreground gap-2 mt-1">
                          <span>Last check: {monitor.lastCheck}</span>
                          <span>•</span>
                          <span>Detection rate: {monitor.detectionRate}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300">
                        {monitor.alerts} alerts
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PauseCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="custom" className="space-y-4">
                {[
                  { 
                    name: "Custom API Endpoint", 
                    status: "active", 
                    lastCheck: "7 mins ago", 
                    detectionRate: 91, 
                    endpoint: "api.example.com/media",
                    alerts: 5
                  }
                ].map((monitor, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${monitor.status === "active" ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{monitor.name}</p>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {monitor.endpoint}
                          </Badge>
                        </div>
                        <div className="flex text-xs text-muted-foreground gap-2 mt-1">
                          <span>Last check: {monitor.lastCheck}</span>
                          <span>•</span>
                          <span>Detection rate: {monitor.detectionRate}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300">
                        {monitor.alerts} alerts
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <PauseCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Connection Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4 text-emerald-500" />
                    <span className="font-medium">Monitor Network</span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300">
                    Connected
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Network Latency</span>
                    <span className="font-medium">24ms</span>
                  </div>
                  <Progress value={24} max={100} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span className="font-medium">128ms</span>
                  </div>
                  <Progress value={38} max={100} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Detection Availability</span>
                    <span className="font-medium">99.8%</span>
                  </div>
                  <Progress value={99.8} max={100} className="h-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Platform Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    event: "New platform connected",
                    details: "YouTube channel monitoring added",
                    time: "12 minutes ago",
                    icon: <MonitorPlay className="h-4 w-4 text-violet-500" />
                  },
                  {
                    event: "Detection threshold updated",
                    details: "Twitter monitor sensitivity increased to 85%",
                    time: "1 hour ago",
                    icon: <RefreshCw className="h-4 w-4 text-amber-500" />
                  },
                  {
                    event: "Monitor paused",
                    details: "TikTok Trending Videos monitor temporarily disabled",
                    time: "2 hours ago",
                    icon: <PauseCircle className="h-4 w-4 text-red-500" />
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1">{activity.icon}</div>
                    <div>
                      <p className="font-medium">{activity.event}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Monitoring;
