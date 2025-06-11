
import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Edit2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getDashboardMetrics, DashboardMetrics as Metrics } from "@/utils/dashboard/realTimeData";

export function DashboardMetrics() {
  const { toast } = useToast();
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
  const [tempValues, setTempValues] = useState<{ [key: string]: string }>({});

  const loadMetrics = async () => {
    try {
      setLoading(true);
      const data = await getDashboardMetrics();
      setMetrics(data);
      
      // Calculate percentage changes (mock for now since we need historical data)
      const changes = {
        totalDetections: "+8.2%",
        deepfakesDetected: data.deepfakesDetected > data.totalDetections * 0.3 ? "+12.5%" : "-5.1%",
        detectionAccuracy: "+2.4%",
        mediaAnalyzed: "+15.7%"
      };
      
      setMetrics(prev => prev ? { ...prev, changes } : null);
    } catch (error) {
      console.error('Error loading metrics:', error);
      toast({
        title: "Error Loading Metrics",
        description: "Failed to load real-time dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(loadMetrics, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleEditToggle = (key: string, currentValue: string) => {
    setEditing(prev => ({ ...prev, [key]: !prev[key] }));
    if (!editing[key]) {
      setTempValues(prev => ({ ...prev, [key]: currentValue }));
    }
  };

  const handleValueChange = (key: string, value: string) => {
    setTempValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveValue = (key: string) => {
    // In a real app, this would update the database
    setEditing(prev => ({ ...prev, [key]: false }));
    
    toast({
      title: "Metric Updated",
      description: `${key} has been updated to ${tempValues[key]}`,
    });
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="shadow-sm animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div className="h-4 w-24 bg-gray-200 rounded"></div>
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) return null;

  const metricItems = [
    {
      key: "totalDetections",
      title: "Total Detections",
      value: metrics.totalDetections.toLocaleString(),
      change: "+8.2%",
      positive: true,
    },
    {
      key: "deepfakesDetected", 
      title: "Deepfakes Detected",
      value: metrics.deepfakesDetected.toLocaleString(),
      change: metrics.deepfakesDetected > metrics.totalDetections * 0.3 ? "+12.5%" : "-5.1%",
      positive: metrics.deepfakesDetected <= metrics.totalDetections * 0.3,
    },
    {
      key: "detectionAccuracy",
      title: "Detection Accuracy", 
      value: `${metrics.detectionAccuracy}%`,
      change: "+2.4%",
      positive: true,
    },
    {
      key: "mediaAnalyzed",
      title: "Media Analyzed",
      value: metrics.mediaAnalyzed.toLocaleString(),
      change: "+15.7%", 
      positive: true,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Real-Time Detection Metrics</h2>
          <p className="text-sm text-muted-foreground">Live data from your detection database</p>
        </div>
        <Button size="sm" variant="outline" onClick={loadMetrics} disabled={loading}>
          Refresh Live Data
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricItems.map((metric) => (
          <Card key={metric.key} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-500">{metric.title}</CardTitle>
              <Button 
                size="icon" 
                variant="ghost" 
                className="h-6 w-6" 
                onClick={() => editing[metric.key] ? handleSaveValue(metric.key) : handleEditToggle(metric.key, metric.value)}
              >
                {editing[metric.key] ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Edit2 className="h-4 w-4" />
                )}
              </Button>
            </CardHeader>
            <CardContent>
              {editing[metric.key] ? (
                <Input 
                  value={tempValues[metric.key] || metric.value} 
                  onChange={(e) => handleValueChange(metric.key, e.target.value)}
                  className="text-xl font-bold h-8 py-0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveValue(metric.key);
                    }
                  }}
                />
              ) : (
                <div className="text-2xl font-bold">{metric.value}</div>
              )}
              <div className="flex items-center mt-1">
                <span
                  className={`inline-flex items-center ${
                    metric.positive ? "text-green-600" : "text-red-600"
                  } text-sm font-medium`}
                >
                  {metric.positive ? (
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="mr-1 h-4 w-4" />
                  )}
                  {metric.change}
                </span>
                <span className="text-gray-500 text-xs ml-1.5">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
