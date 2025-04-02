
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
} from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, Save } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Sample data for the charts
const generateRevenueData = () => [
  { name: "Jan", revenue: Math.floor(Math.random() * 5000) + 3000 },
  { name: "Feb", revenue: Math.floor(Math.random() * 5000) + 3000 },
  { name: "Mar", revenue: Math.floor(Math.random() * 5000) + 3000 },
  { name: "Apr", revenue: Math.floor(Math.random() * 5000) + 4000 },
  { name: "May", revenue: Math.floor(Math.random() * 5000) + 5000 },
  { name: "Jun", revenue: Math.floor(Math.random() * 5000) + 5000 },
  { name: "Jul", revenue: Math.floor(Math.random() * 5000) + 7000 },
  { name: "Aug", revenue: Math.floor(Math.random() * 5000) + 8000 },
  { name: "Sep", revenue: Math.floor(Math.random() * 5000) + 7000 },
  { name: "Oct", revenue: Math.floor(Math.random() * 5000) + 6000 },
  { name: "Nov", revenue: Math.floor(Math.random() * 5000) + 8000 },
  { name: "Dec", revenue: Math.floor(Math.random() * 5000) + 10000 },
];

const generateRevenueDataWeekly = () => [
  { name: "Week 1", revenue: Math.floor(Math.random() * 1000) + 1000 },
  { name: "Week 2", revenue: Math.floor(Math.random() * 1000) + 1000 },
  { name: "Week 3", revenue: Math.floor(Math.random() * 1000) + 1000 },
  { name: "Week 4", revenue: Math.floor(Math.random() * 1000) + 1500 },
];

const generateRevenueDataDaily = () => [
  { name: "Mon", revenue: Math.floor(Math.random() * 200) + 200 },
  { name: "Tue", revenue: Math.floor(Math.random() * 200) + 200 },
  { name: "Wed", revenue: Math.floor(Math.random() * 200) + 250 },
  { name: "Thu", revenue: Math.floor(Math.random() * 200) + 200 },
  { name: "Fri", revenue: Math.floor(Math.random() * 200) + 300 },
  { name: "Sat", revenue: Math.floor(Math.random() * 200) + 150 },
  { name: "Sun", revenue: Math.floor(Math.random() * 200) + 100 },
];

export function RevenueChart() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("yearly");
  const [chartData, setChartData] = useState(generateRevenueData());
  const [chartView, setChartView] = useState<"bar" | "area">("area");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isPredictionVisible, setIsPredictionVisible] = useState(false);
  
  useEffect(() => {
    // Update chart data based on active tab
    refreshChartData();
  }, [activeTab]);

  const refreshChartData = () => {
    switch (activeTab) {
      case "daily":
        setChartData(generateRevenueDataDaily());
        break;
      case "weekly":
        setChartData(generateRevenueDataWeekly());
        break;
      case "yearly":
      default:
        setChartData(generateRevenueData());
        break;
    }
  };

  const handleRefresh = () => {
    refreshChartData();
    toast({
      title: "Chart Data Refreshed",
      description: "Latest revenue data has been loaded",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Chart Downloaded",
      description: `Revenue chart data has been exported as CSV`,
    });
  };

  const handleTogglePrediction = () => {
    setIsPredictionVisible(!isPredictionVisible);
    toast({
      title: isPredictionVisible ? "Predictions Hidden" : "Predictions Shown",
      description: isPredictionVisible ? "Future revenue projections hidden" : "Future revenue projections added to chart",
    });
  };

  const handleDateRangeApply = () => {
    if (startDate && endDate) {
      toast({
        title: "Date Range Applied",
        description: `Data filtered from ${format(startDate, "PP")} to ${format(endDate, "PP")}`,
      });
      // In a real app, this would filter the data
      refreshChartData();
    }
  };

  return (
    <Card className="col-span-4 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Track your revenue performance over time
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
            onClick={handleTogglePrediction}
          >
            {isPredictionVisible ? "Hide Prediction" : "Show Prediction"}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleRefresh}
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
              className="lucide lucide-refresh-cw"
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
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="yearly" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="h-[300px]">
            {chartView === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2668f5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2668f5" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelStyle={{ color: '#111' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  />
                  <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2668f5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2668f5" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelStyle={{ color: '#111' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2668f5"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          
          <TabsContent value="weekly" className="h-[300px]">
            {chartView === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2668f5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2668f5" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelStyle={{ color: '#111' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  />
                  <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2668f5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2668f5" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelStyle={{ color: '#111' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2668f5"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
          
          <TabsContent value="yearly" className="h-[300px]">
            {chartView === "bar" ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2668f5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2668f5" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelStyle={{ color: '#111' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  />
                  <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2668f5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2668f5" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Revenue']}
                    labelStyle={{ color: '#111' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #f0f0f0' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2668f5"
                    strokeWidth={2}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
