
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout/Layout";
import { DashboardMetrics } from "@/components/Dashboard/DashboardMetrics";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw, Shield, AlertTriangle, BarChart3, Image, Video, FileAudio, FileText, Mail, Phone, Eye, ArrowRight } from "lucide-react";
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

  const handleNavigateToBreachDetection = () => {
    navigate('/breach-detection');
    toast({ 
      title: "Breach Detection Opened", 
      description: "Check for compromised accounts and data breaches" 
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Security Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor deepfake detection, data breaches, and security threats in real-time
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
                onClick={handleNavigateToBreachDetection}
              >
                <AlertTriangle className="h-4 w-4" />
                Check Data Breaches
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start gap-2"
                onClick={handleNavigateToAlerts}
              >
                <Eye className="h-4 w-4" />
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
              <div className="border-t border-border pt-4 mt-4">
                <h3 className="text-sm font-medium mb-2 text-foreground">Latest Scans</h3>
                <div className="space-y-3">
                  {recentScans.length > 0 ? (
                    recentScans.map((scan) => (
                      <div 
                        key={scan.id} 
                        className={`flex items-center gap-3 border-l-2 ${
                          scan.isDeepfake ? 'border-destructive' : 'border-primary'
                        } pl-3 py-1`}
                      >
                        {getContentIcon(scan.contentType)}
                        <div>
                          <p className="text-sm font-medium truncate max-w-[120px] text-foreground">
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

        {/* New Breach Detection Section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">Data Breach Monitoring</CardTitle>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleNavigateToBreachDetection}
              >
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">5</div>
                  <div className="text-xs text-muted-foreground">Active Breaches</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-xs text-muted-foreground">Monitored Emails</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">6</div>
                  <div className="text-xs text-muted-foreground">Monitored Phones</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">13</div>
                  <div className="text-xs text-muted-foreground">Secured Accounts</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Recent Breach Alerts</h4>
                <div className="space-y-2">
                  {[
                    { type: 'email', identifier: 'user@*****.com', breach: 'LastPass', severity: 'critical' },
                    { type: 'phone', identifier: '+1***-***-1234', breach: 'TelecomBreach2023', severity: 'high' },
                    { type: 'email', identifier: 'test@*****.com', breach: 'Twitter', severity: 'medium' }
                  ].map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-2">
                        {alert.type === 'email' ? (
                          <Mail className="h-3 w-3 text-blue-600" />
                        ) : (
                          <Phone className="h-3 w-3 text-purple-600" />
                        )}
                        <div>
                          <div className="text-sm font-medium">{alert.identifier}</div>
                          <div className="text-xs text-muted-foreground">{alert.breach}</div>
                        </div>
                      </div>
                      <Badge 
                        variant={alert.severity === 'critical' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start text-sm" 
                variant="outline" 
                size="sm"
                onClick={handleNavigateToBreachDetection}
              >
                <Mail className="h-4 w-4 mr-2" />
                Check Email Breaches
              </Button>
              <Button 
                className="w-full justify-start text-sm" 
                variant="outline" 
                size="sm"
                onClick={handleNavigateToBreachDetection}
              >
                <Phone className="h-4 w-4 mr-2" />
                Check Phone Breaches
              </Button>
              <Button 
                className="w-full justify-start text-sm" 
                variant="outline" 
                size="sm"
              >
                <Shield className="h-4 w-4 mr-2" />
                Security Report
              </Button>
              <div className="pt-2 border-t">
                <div className="text-xs text-muted-foreground mb-2">Quick Scan</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Email
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Phone
                  </Button>
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
