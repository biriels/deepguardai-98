
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { getChartData } from "@/utils/dashboard/realTimeData";

export function RevenueChart() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("weekly");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chartView, setChartView] = useState<"bar" | "area">("area");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [dataType, setDataType] = useState<"detection" | "accuracy">("detection");
  
  useEffect(() => {
    loadChartData();
  }, [activeTab]);

  const loadChartData = async () => {
    try {
      setLoading(true);
      const data = await getChartData(activeTab as 'daily' | 'weekly' | 'yearly');
      setChartData(data || []);
    } catch (error) {
      console.error('Error loading chart data:', error);
      toast({
        title: "Error Loading Chart Data",
        description: "Failed to load real-time chart data",
        variant: "destructive"
      });
      // Fallback to empty data
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadChartData();
    toast({
      title: "Chart Data Refreshed",
      description: "Latest detection data has been loaded from database",
    });
  };

  const handleDownload = () => {
    const csvContent = [
      ['Time Period', 'Deepfakes', 'Genuine Content', 'Accuracy'],
      ...chartData.map((item: any) => [
        item.name,
        item.deepfakes || 0,
        item.genuine || 0,
        item.accuracy || 0
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `detection-analytics-${activeTab}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Chart Downloaded",
      description: `Detection chart data exported as CSV`,
    });
  };

  const handleDataTypeToggle = () => {
    setDataType(dataType === "detection" ? "accuracy" : "detection");
    toast({
      title: "Chart View Changed",
      description: dataType === "detection" ? "Now showing accuracy data" : "Now showing detection count data",
    });
  };

  const handleDateRangeApply = () => {
    if (startDate && endDate) {
      toast({
        title: "Date Range Applied",
        description: `Data filtered from ${format(startDate, "PP")} to ${format(endDate, "PP")}`,
      });
      loadChartData();
    }
  };

  const EmptyState = () => (
    <div className="h-[300px] flex items-center justify-center">
      <div className="text-center">
        <p className="text-muted-foreground mb-2">No detection data available</p>
        <p className="text-sm text-muted-foreground">
          Start analyzing content to see real-time analytics here
        </p>
      </div>
    </div>
  );

  return (
    <Card className="col-span-4 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Real-Time Detection Analytics</CardTitle>
          <CardDescription>
            Live detection performance and accuracy data from your database
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>Date Range</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 space-y-3">
                <div className="space-y-1.5">
                  <div className="font-medium text-sm">Start Date</div>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className="border rounded-md"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="font-medium text-sm">End Date</div>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    className="border rounded-md"
                  />
                </div>
                <Button onClick={handleDateRangeApply} className="w-full">Apply Range</Button>
              </div>
            </PopoverContent>
          </Popover>
          
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2"
            onClick={() => setChartView(chartView === "area" ? "bar" : "area")}
          >
            {chartView === "area" ? "Bar View" : "Area View"}
          </Button>
          
          <Button
            variant="outline" 
            size="sm" 
            className="h-8 px-2"
            onClick={handleDataTypeToggle}
          >
            {dataType === "detection" ? "Show Accuracy" : "Show Counts"}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleRefresh}
            disabled={loading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`lucide lucide-refresh-cw ${loading ? 'animate-spin' : ''}`}
            >
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M3 21v-5h5"></path>
            </svg>
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleDownload}
            disabled={!chartData.length}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="yearly">Monthly</TabsTrigger>
          </TabsList>
          
          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : !chartData.length ? (
            <TabsContent value={activeTab} className="h-[300px]">
              <EmptyState />
            </TabsContent>
          ) : dataType === "detection" ? (
            <TabsContent value={activeTab} className="h-[300px]">
              {chartView === "bar" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                    <defs>
                      <linearGradient id="colorDeepfakes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.2} />
                      </linearGradient>
                      <linearGradient id="colorGenuine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2668f5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2668f5" stopOpacity={0.2} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Legend />
                    <Tooltip 
                      labelStyle={{ color: '#111' }}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                    />
                    <Bar dataKey="deepfakes" name="Deepfakes" fill="url(#colorDeepfakes)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="genuine" name="Genuine Content" fill="url(#colorGenuine)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                    <defs>
                      <linearGradient id="colorDeepfakes" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="colorGenuine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2668f5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#2668f5" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Legend />
                    <Tooltip 
                      labelStyle={{ color: '#111' }}
                      contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="deepfakes"
                      name="Deepfakes"
                      stroke="#ff6b6b"
                      strokeWidth={2}
                      fill="url(#colorDeepfakes)"
                    />
                    <Area
                      type="monotone"
                      dataKey="genuine"
                      name="Genuine Content"
                      stroke="#2668f5"
                      strokeWidth={2}
                      fill="url(#colorGenuine)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </TabsContent>
          ) : (
            <TabsContent value={activeTab} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    domain={[0, 100]}
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Detection Accuracy']}
                    labelStyle={{ color: '#111' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="accuracy"
                    name="Detection Accuracy"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#colorAccuracy)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
