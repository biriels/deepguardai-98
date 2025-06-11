
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { DashboardMetrics } from "@/components/Dashboard/DashboardMetrics";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Shield, AlertTriangle, BarChart3, Image, Video, FileAudio, FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useNavigate } from "react-router-dom";
import { getDashboardMetrics, RecentDetection } from "@/utils/dashboard/realTimeData";

const Dashboard = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [recentScans, setRecentScans] = useState<RecentDetection[]>([]);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const loadRecentScans = async () => {
    try {
      const metrics = await getDashboardMetrics();
      setRecentScans(metrics.recentDetections.slice(0, 2));
    } catch (error) {
      console.error('Error loading recent scans:', error);
    }
  };

  useEffect(() => {
    loadRecentScans();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(loadRecentScans, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefreshDashboard = async () => {
    setIsRefreshing(true);
    
    try {
      await loadRecentScans();
      toast({
        title: "Dashboard Updated",
        description: "Latest detection data has been loaded from database",
      });
    } catch (error) {
      toast({
        title: "Error Refreshing",
        description: "Failed to load latest data",
        variant: "destructive"
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleNavigateToDetection = () => {
    navigate('/detection');
    toast({ 
      title: "Detection Tool Opened", 
      description: "Ready to analyze new media content" 
    });
  };

  const handleNavigateToAlerts = () => {
    navigate('/alerts');
    toast({ 
      title: "Alert Center Opened", 
      description: "Viewing recent detection alerts" 
    });
  };

  const handleNavigateToAnalytics = () => {
    navigate('/analytics');
    toast({ 
      title: "Analytics Opened", 
      description: "Viewing detailed detection analytics" 
    });
  };

  const getContentIcon = (contentType: string) => {
    switch (contentType) {
      case 'image': return <Image className="h-4 w-4 text-muted-foreground" />;
      case 'video': return <Video className="h-4 w-4 text-muted-foreground" />;
      case 'audio': return <FileAudio className="h-4 w-4 text-muted-foreground" />;
      case 'text': return <FileText className="h-4 w-4 text-muted-foreground" />;
      default: return <Image className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deepfake Detection Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor detection trends and analyze media authenticity in real-time
          </p>
        </div>
        <Button 
          onClick={handleRefreshDashboard} 
          disabled={isRefreshing}
          className={`gap-2 ${isMobile ? "w-full" : ""}`}
        >
          <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Dashboard'}
        </Button>
      </div>
      
      <div className="space-y-6">
        <DashboardMetrics />

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
          <RevenueChart />
          
          <Card className="lg:col-span-1 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2" 
                onClick={handleNavigateToDetection}
              >
                <Shield className="h-4 w-4" />
                Analyze New Content
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2"
                onClick={handleNavigateToAlerts}
              >
                <AlertTriangle className="h-4 w-4" />
                View Recent Alerts
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2"
                onClick={handleNavigateToAnalytics}
              >
                <BarChart3 className="h-4 w-4" />
                View Full Analytics
              </Button>
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-medium mb-2">Latest Scans</h3>
                <div className="space-y-3">
                  {recentScans.length > 0 ? (
                    recentScans.map((scan) => (
                      <div 
                        key={scan.id} 
                        className={`flex items-center gap-3 border-l-2 ${
                          scan.isDeepfake ? 'border-red-500' : 'border-green-500'
                        } pl-3 py-1`}
                      >
                        {getContentIcon(scan.contentType)}
                        <div>
                          <p className="text-sm font-medium truncate max-w-[120px]">
                            {scan.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {scan.isDeepfake ? 'Deepfake' : 'Authentic'} ({Math.round(scan.detectionScore)}%)
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">No recent scans</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Start analyzing content to see results
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
