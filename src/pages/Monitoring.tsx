
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonitorPlay, PauseCircle, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import components and types
import { 
  ActivityEvent, 
  ApiMonitor, 
  MonitorFormData, 
  MonitorPlatform, 
  SocialMonitor, 
  WebsiteMonitor 
} from "@/components/Monitoring/MonitorTypes";
import { 
  initialActivity, 
  initialApiMonitors, 
  initialNetworkStatus, 
  initialSocialMonitors, 
  initialWebsiteMonitors 
} from "@/components/Monitoring/MonitorData";
import SocialMonitorsTab from "@/components/Monitoring/SocialMonitorsTab";
import WebsiteMonitorsTab from "@/components/Monitoring/WebsiteMonitorsTab";
import ApiMonitorsTab from "@/components/Monitoring/ApiMonitorsTab";
import ConnectionStatusCard from "@/components/Monitoring/ConnectionStatusCard";
import ActivityCard from "@/components/Monitoring/ActivityCard";
import AddMonitorDialog from "@/components/Monitoring/AddMonitorDialog";
import DeleteConfirmDialog from "@/components/Monitoring/DeleteConfirmDialog";
import MonitoringHeader from "@/components/Monitoring/MonitoringHeader";

const Monitoring = () => {
  const { toast } = useToast();
  const [socialMonitors, setSocialMonitors] = useState<SocialMonitor[]>(initialSocialMonitors);
  const [websiteMonitors, setWebsiteMonitors] = useState<WebsiteMonitor[]>(initialWebsiteMonitors);
  const [apiMonitors, setApiMonitors] = useState<ApiMonitor[]>(initialApiMonitors);
  const [networkStatus, setNetworkStatus] = useState(initialNetworkStatus);
  const [activities, setActivities] = useState<ActivityEvent[]>(initialActivity);
  
  // State for dialogs and tabs
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("social");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState<{id: string, type: string} | null>(null);
  
  // New monitor form state
  const [newMonitor, setNewMonitor] = useState<MonitorFormData>({
    name: "",
    platform: "Twitter",
    url: "",
    endpoint: ""
  });

  // Calculate total active monitors
  const totalActiveMonitors = 
    socialMonitors.filter(m => m.status === "active").length +
    websiteMonitors.filter(m => m.status === "active").length +
    apiMonitors.filter(m => m.status === "active").length;

  const handleFormChange = (key: keyof MonitorFormData, value: string) => {
    setNewMonitor(prev => ({
      ...prev,
      [key]: value
    }));
  };

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
      icon: <PauseCircle className="h-4 w-4 text-red-500" />
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
        <MonitoringHeader 
          totalActiveMonitors={totalActiveMonitors} 
          onAddMonitor={() => setIsAddDialogOpen(true)} 
        />

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Active Monitors</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="social" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="websites">Websites</TabsTrigger>
                <TabsTrigger value="custom">Custom API</TabsTrigger>
              </TabsList>

              <TabsContent value="social">
                <SocialMonitorsTab
                  monitors={socialMonitors}
                  onRefresh={handleRefreshMonitor}
                  onToggleStatus={handleToggleStatus}
                  onDelete={openDeleteConfirmation}
                  onOpenAddDialog={() => setIsAddDialogOpen(true)}
                />
              </TabsContent>

              <TabsContent value="websites">
                <WebsiteMonitorsTab
                  monitors={websiteMonitors}
                  onRefresh={handleRefreshMonitor}
                  onToggleStatus={handleToggleStatus}
                  onDelete={openDeleteConfirmation}
                  onOpenAddDialog={() => setIsAddDialogOpen(true)}
                />
              </TabsContent>

              <TabsContent value="custom">
                <ApiMonitorsTab
                  monitors={apiMonitors}
                  onRefresh={handleRefreshMonitor}
                  onToggleStatus={handleToggleStatus}
                  onDelete={openDeleteConfirmation}
                  onOpenAddDialog={() => setIsAddDialogOpen(true)}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <ConnectionStatusCard 
            networkStatus={networkStatus} 
            onRefresh={simulateNetworkStatusChange} 
          />
          <ActivityCard activities={activities} />
        </div>
      </div>

      <AddMonitorDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        activeTab={activeTab}
        formData={newMonitor}
        onChange={handleFormChange}
        onSubmit={handleAddMonitor}
      />

      <DeleteConfirmDialog
        isOpen={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        onConfirm={handleDeleteMonitor}
      />
    </Layout>
  );
};

export default Monitoring;
