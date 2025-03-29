
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  MonitorPlay, 
  PauseCircle, 
  PlayCircle, 
  RefreshCw, 
  Trash2, 
  Plus, 
  Wifi,
  Search,
  X
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

// Define monitor types
type MonitorPlatform = "Twitter" | "Instagram" | "TikTok" | "LinkedIn" | "YouTube";
type WebsiteMonitor = {
  id: string;
  name: string;
  status: "active" | "paused";
  lastCheck: string;
  detectionRate: number;
  url: string;
  alerts: number;
};

type SocialMonitor = {
  id: string;
  name: string;
  status: "active" | "paused";
  lastCheck: string;
  detectionRate: number;
  platform: MonitorPlatform;
  alerts: number;
};

type ApiMonitor = {
  id: string;
  name: string;
  status: "active" | "paused";
  lastCheck: string;
  detectionRate: number;
  endpoint: string;
  alerts: number;
};

type NetworkStatus = {
  connected: boolean;
  latency: number;
  apiResponse: number;
  availability: number;
};

type ActivityEvent = {
  id: string;
  event: string;
  details: string;
  time: string;
  icon: JSX.Element;
};

const initialSocialMonitors: SocialMonitor[] = [
  { 
    id: "s1",
    name: "Twitter #AI Trend Monitor", 
    status: "active", 
    lastCheck: "1 min ago", 
    detectionRate: 82, 
    platform: "Twitter",
    alerts: 24
  },
  { 
    id: "s2",
    name: "Instagram Profile Guard", 
    status: "active", 
    lastCheck: "Just now", 
    detectionRate: 95, 
    platform: "Instagram",
    alerts: 8
  },
  { 
    id: "s3",
    name: "TikTok Trending Videos", 
    status: "paused", 
    lastCheck: "1 hour ago", 
    detectionRate: 78, 
    platform: "TikTok",
    alerts: 17
  },
  { 
    id: "s4",
    name: "LinkedIn Company Posts", 
    status: "active", 
    lastCheck: "5 mins ago", 
    detectionRate: 91, 
    platform: "LinkedIn",
    alerts: 2
  }
];

const initialWebsiteMonitors: WebsiteMonitor[] = [
  { 
    id: "w1",
    name: "News Site Homepage", 
    status: "active", 
    lastCheck: "3 mins ago", 
    detectionRate: 89, 
    url: "newssource.com",
    alerts: 12
  },
  { 
    id: "w2",
    name: "E-commerce Listings", 
    status: "active", 
    lastCheck: "Just now", 
    detectionRate: 93, 
    url: "bigretailer.com/products",
    alerts: 3
  }
];

const initialApiMonitors: ApiMonitor[] = [
  { 
    id: "a1",
    name: "Custom API Endpoint", 
    status: "active", 
    lastCheck: "7 mins ago", 
    detectionRate: 91, 
    endpoint: "api.example.com/media",
    alerts: 5
  }
];

const initialNetworkStatus: NetworkStatus = {
  connected: true,
  latency: 24,
  apiResponse: 128,
  availability: 99.8
};

const initialActivity: ActivityEvent[] = [
  {
    id: "act1",
    event: "New platform connected",
    details: "YouTube channel monitoring added",
    time: "12 minutes ago",
    icon: <MonitorPlay className="h-4 w-4 text-violet-500" />
  },
  {
    id: "act2",
    event: "Detection threshold updated",
    details: "Twitter monitor sensitivity increased to 85%",
    time: "1 hour ago",
    icon: <RefreshCw className="h-4 w-4 text-amber-500" />
  },
  {
    id: "act3",
    event: "Monitor paused",
    details: "TikTok Trending Videos monitor temporarily disabled",
    time: "2 hours ago",
    icon: <PauseCircle className="h-4 w-4 text-red-500" />
  },
];

const Monitoring = () => {
  const { toast } = useToast();
  const [socialMonitors, setSocialMonitors] = useState<SocialMonitor[]>(initialSocialMonitors);
  const [websiteMonitors, setWebsiteMonitors] = useState<WebsiteMonitor[]>(initialWebsiteMonitors);
  const [apiMonitors, setApiMonitors] = useState<ApiMonitor[]>(initialApiMonitors);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(initialNetworkStatus);
  const [activities, setActivities] = useState<ActivityEvent[]>(initialActivity);
  
  // State for new monitor dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("social");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState<{id: string, type: string} | null>(null);
  
  // New monitor form state
  const [newMonitor, setNewMonitor] = useState({
    name: "",
    platform: "Twitter" as MonitorPlatform,
    url: "",
    endpoint: ""
  });

  const handleAddMonitor = () => {
    if (!newMonitor.name) {
      toast({
        title: "Validation Error",
        description: "Please provide a name for the monitor",
        variant: "destructive"
      });
      return;
    }

    const newId = Math.random().toString(36).substring(2, 9);
    const timestamp = new Date().toISOString();
    
    let addedMonitor = null;
    
    if (activeTab === "social") {
      if (!newMonitor.platform) {
        toast({
          title: "Validation Error",
          description: "Please select a platform",
          variant: "destructive"
        });
        return;
      }
      
      const newSocialMonitor: SocialMonitor = {
        id: `s-${newId}`,
        name: newMonitor.name,
        status: "active",
        lastCheck: "Just now",
        detectionRate: 85,
        platform: newMonitor.platform,
        alerts: 0
      };
      
      setSocialMonitors([...socialMonitors, newSocialMonitor]);
      addedMonitor = newSocialMonitor;
      
    } else if (activeTab === "websites") {
      if (!newMonitor.url) {
        toast({
          title: "Validation Error",
          description: "Please provide a URL",
          variant: "destructive"
        });
        return;
      }
      
      const newWebsiteMonitor: WebsiteMonitor = {
        id: `w-${newId}`,
        name: newMonitor.name,
        status: "active",
        lastCheck: "Just now",
        detectionRate: 85,
        url: newMonitor.url,
        alerts: 0
      };
      
      setWebsiteMonitors([...websiteMonitors, newWebsiteMonitor]);
      addedMonitor = newWebsiteMonitor;
      
    } else if (activeTab === "custom") {
      if (!newMonitor.endpoint) {
        toast({
          title: "Validation Error",
          description: "Please provide an API endpoint",
          variant: "destructive"
        });
        return;
      }
      
      const newApiMonitor: ApiMonitor = {
        id: `a-${newId}`,
        name: newMonitor.name,
        status: "active",
        lastCheck: "Just now",
        detectionRate: 85,
        endpoint: newMonitor.endpoint,
        alerts: 0
      };
      
      setApiMonitors([...apiMonitors, newApiMonitor]);
      addedMonitor = newApiMonitor;
    }
    
    // Add activity
    const newActivity: ActivityEvent = {
      id: `act-${newId}`,
      event: "New monitor added",
      details: `${newMonitor.name} monitor was created`,
      time: "Just now",
      icon: <MonitorPlay className="h-4 w-4 text-violet-500" />
    };
    
    setActivities([newActivity, ...activities.slice(0, 2)]);
    
    // Reset form and close dialog
    setNewMonitor({
      name: "",
      platform: "Twitter",
      url: "",
      endpoint: ""
    });
    
    setIsAddDialogOpen(false);
    
    toast({
      title: "Monitor Added",
      description: `${addedMonitor?.name} has been added successfully`,
    });
  };

  const handleRefreshMonitor = (id: string, type: string) => {
    let updatedMonitor;
    const now = "Just now";
    
    if (type === "social") {
      const updatedMonitors = socialMonitors.map(monitor => {
        if (monitor.id === id) {
          updatedMonitor = { ...monitor, lastCheck: now };
          return updatedMonitor;
        }
        return monitor;
      });
      setSocialMonitors(updatedMonitors);
    } else if (type === "websites") {
      const updatedMonitors = websiteMonitors.map(monitor => {
        if (monitor.id === id) {
          updatedMonitor = { ...monitor, lastCheck: now };
          return updatedMonitor;
        }
        return monitor;
      });
      setWebsiteMonitors(updatedMonitors);
    } else if (type === "custom") {
      const updatedMonitors = apiMonitors.map(monitor => {
        if (monitor.id === id) {
          updatedMonitor = { ...monitor, lastCheck: now };
          return updatedMonitor;
        }
        return monitor;
      });
      setApiMonitors(updatedMonitors);
    }
    
    toast({
      title: "Monitor Refreshed",
      description: `${updatedMonitor?.name || "Monitor"} data has been refreshed`,
    });
  };

  const handleToggleStatus = (id: string, type: string) => {
    let updatedMonitor;
    
    if (type === "social") {
      const updatedMonitors = socialMonitors.map(monitor => {
        if (monitor.id === id) {
          const newStatus = monitor.status === "active" ? "paused" : "active";
          updatedMonitor = { ...monitor, status: newStatus };
          return updatedMonitor;
        }
        return monitor;
      });
      setSocialMonitors(updatedMonitors);
    } else if (type === "websites") {
      const updatedMonitors = websiteMonitors.map(monitor => {
        if (monitor.id === id) {
          const newStatus = monitor.status === "active" ? "paused" : "active";
          updatedMonitor = { ...monitor, status: newStatus };
          return updatedMonitor;
        }
        return monitor;
      });
      setWebsiteMonitors(updatedMonitors);
    } else if (type === "custom") {
      const updatedMonitors = apiMonitors.map(monitor => {
        if (monitor.id === id) {
          const newStatus = monitor.status === "active" ? "paused" : "active";
          updatedMonitor = { ...monitor, status: newStatus };
          return updatedMonitor;
        }
        return monitor;
      });
      setApiMonitors(updatedMonitors);
    }
    
    // Add activity
    const newActivity: ActivityEvent = {
      id: `act-${Math.random().toString(36).substring(2, 9)}`,
      event: updatedMonitor?.status === "active" ? "Monitor activated" : "Monitor paused",
      details: `${updatedMonitor?.name || "Monitor"} has been ${updatedMonitor?.status === "active" ? "activated" : "paused"}`,
      time: "Just now",
      icon: updatedMonitor?.status === "active" ? 
        <PlayCircle className="h-4 w-4 text-emerald-500" /> : 
        <PauseCircle className="h-4 w-4 text-red-500" />
    };
    
    setActivities([newActivity, ...activities.slice(0, 2)]);
    
    toast({
      title: updatedMonitor?.status === "active" ? "Monitor Activated" : "Monitor Paused",
      description: `${updatedMonitor?.name} has been ${updatedMonitor?.status === "active" ? "activated" : "paused"}`,
    });
  };

  const openDeleteConfirmation = (id: string, type: string) => {
    setSelectedMonitor({ id, type });
    setConfirmDialogOpen(true);
  };

  const handleDeleteMonitor = () => {
    if (!selectedMonitor) return;
    
    let deletedMonitor;
    
    if (selectedMonitor.type === "social") {
      deletedMonitor = socialMonitors.find(m => m.id === selectedMonitor.id);
      setSocialMonitors(socialMonitors.filter(m => m.id !== selectedMonitor.id));
    } else if (selectedMonitor.type === "websites") {
      deletedMonitor = websiteMonitors.find(m => m.id === selectedMonitor.id);
      setWebsiteMonitors(websiteMonitors.filter(m => m.id !== selectedMonitor.id));
    } else if (selectedMonitor.type === "custom") {
      deletedMonitor = apiMonitors.find(m => m.id === selectedMonitor.id);
      setApiMonitors(apiMonitors.filter(m => m.id !== selectedMonitor.id));
    }
    
    // Add activity
    const newActivity: ActivityEvent = {
      id: `act-${Math.random().toString(36).substring(2, 9)}`,
      event: "Monitor deleted",
      details: `${deletedMonitor?.name || "Monitor"} has been removed`,
      time: "Just now",
      icon: <Trash2 className="h-4 w-4 text-red-500" />
    };
    
    setActivities([newActivity, ...activities.slice(0, 2)]);
    
    setConfirmDialogOpen(false);
    setSelectedMonitor(null);
    
    toast({
      title: "Monitor Deleted",
      description: `${deletedMonitor?.name || "Monitor"} has been removed`,
    });
  };

  const simulateNetworkStatusChange = () => {
    const randomLatency = Math.floor(Math.random() * 80) + 10;
    const randomApiResponse = Math.floor(Math.random() * 200) + 80;
    const randomAvailability = 99 + Math.random();
    
    setNetworkStatus({
      connected: Math.random() > 0.1, // 90% chance of being connected
      latency: randomLatency,
      apiResponse: randomApiResponse,
      availability: parseFloat(randomAvailability.toFixed(1))
    });
    
    toast({
      title: "Network Status Updated",
      description: "Connection statistics have been refreshed",
    });
  };

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
              <Button size="sm" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Monitor
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="social" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="websites">Websites</TabsTrigger>
                <TabsTrigger value="custom">Custom API</TabsTrigger>
              </TabsList>

              <TabsContent value="social" className="space-y-4">
                {socialMonitors.length === 0 ? (
                  <div className="text-center p-8 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">No social media monitors added yet.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Add Social Media Monitor
                    </Button>
                  </div>
                ) : (
                  socialMonitors.map((monitor) => (
                    <div key={monitor.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleRefreshMonitor(monitor.id, "social")}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        {monitor.status === "active" ? (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleToggleStatus(monitor.id, "social")}
                          >
                            <PauseCircle className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleToggleStatus(monitor.id, "social")}
                          >
                            <PlayCircle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => openDeleteConfirmation(monitor.id, "social")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="websites" className="space-y-4">
                {websiteMonitors.length === 0 ? (
                  <div className="text-center p-8 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">No website monitors added yet.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Add Website Monitor
                    </Button>
                  </div>
                ) : (
                  websiteMonitors.map((monitor) => (
                    <div key={monitor.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleRefreshMonitor(monitor.id, "websites")}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleToggleStatus(monitor.id, "websites")}
                        >
                          {monitor.status === "active" ? (
                            <PauseCircle className="h-4 w-4" />
                          ) : (
                            <PlayCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => openDeleteConfirmation(monitor.id, "websites")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>

              <TabsContent value="custom" className="space-y-4">
                {apiMonitors.length === 0 ? (
                  <div className="text-center p-8 border border-dashed rounded-lg">
                    <p className="text-muted-foreground">No API monitors added yet.</p>
                    <Button variant="outline" className="mt-4" onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" /> Add API Monitor
                    </Button>
                  </div>
                ) : (
                  apiMonitors.map((monitor) => (
                    <div key={monitor.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleRefreshMonitor(monitor.id, "custom")}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleToggleStatus(monitor.id, "custom")}
                        >
                          {monitor.status === "active" ? (
                            <PauseCircle className="h-4 w-4" />
                          ) : (
                            <PlayCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-500"
                          onClick={() => openDeleteConfirmation(monitor.id, "custom")}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Connection Status</CardTitle>
              <Button variant="ghost" size="sm" onClick={simulateNetworkStatusChange}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Wifi className={`h-4 w-4 ${networkStatus.connected ? 'text-emerald-500' : 'text-red-500'}`} />
                    <span className="font-medium">Monitor Network</span>
                  </div>
                  <Badge variant="outline" className={networkStatus.connected ? 
                    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" : 
                    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}>
                    {networkStatus.connected ? "Connected" : "Disconnected"}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Network Latency</span>
                    <span className="font-medium">{networkStatus.latency}ms</span>
                  </div>
                  <Progress value={networkStatus.latency} max={100} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>API Response Time</span>
                    <span className="font-medium">{networkStatus.apiResponse}ms</span>
                  </div>
                  <Progress value={networkStatus.apiResponse / 4} max={100} className="h-1" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Detection Availability</span>
                    <span className="font-medium">{networkStatus.availability}%</span>
                  </div>
                  <Progress value={networkStatus.availability} max={100} className="h-1" />
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
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
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

      {/* Add Monitor Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Monitor</DialogTitle>
            <DialogDescription>
              Configure a new monitor to track content across platforms.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Monitor name"
                className="col-span-3"
                value={newMonitor.name}
                onChange={(e) => setNewMonitor({...newMonitor, name: e.target.value})}
              />
            </div>
            
            {activeTab === "social" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="platform" className="text-right">
                  Platform
                </Label>
                <Select 
                  value={newMonitor.platform} 
                  onValueChange={(value) => 
                    setNewMonitor({...newMonitor, platform: value as MonitorPlatform})
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {activeTab === "websites" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">
                  Website URL
                </Label>
                <Input
                  id="url"
                  placeholder="example.com/page"
                  className="col-span-3"
                  value={newMonitor.url}
                  onChange={(e) => setNewMonitor({...newMonitor, url: e.target.value})}
                />
              </div>
            )}
            
            {activeTab === "custom" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endpoint" className="text-right">
                  API Endpoint
                </Label>
                <Input
                  id="endpoint"
                  placeholder="api.example.com/endpoint"
                  className="col-span-3"
                  value={newMonitor.endpoint}
                  onChange={(e) => setNewMonitor({...newMonitor, endpoint: e.target.value})}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMonitor}>
              Add Monitor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Monitor</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this monitor? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteMonitor}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Monitoring;
