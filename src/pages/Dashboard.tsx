
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { DashboardMetrics } from "@/components/Dashboard/DashboardMetrics";
import { RevenueChart } from "@/components/Dashboard/RevenueChart";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Dashboard = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useIsMobile();

  const handleRefreshDashboard = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Dashboard Updated",
        description: "Latest data has been loaded",
      });
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back! Here's an overview of your business metrics
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
                className="w-full justify-start" 
                onClick={() => toast({ 
                  title: "Report Exported", 
                  description: "Monthly report has been downloaded" 
                })}
              >
                Export Monthly Report
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => toast({ 
                  title: "Notification Sent", 
                  description: "Team members have been notified" 
                })}
              >
                Notify Team
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-start"
                onClick={() => toast({ 
                  title: "Settings Opened", 
                  description: "Redirecting to account settings" 
                })}
              >
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
