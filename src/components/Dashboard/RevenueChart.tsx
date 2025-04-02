
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

// Sample data for the charts
const generateDetectionData = () => [
  { name: "Jan", deepfakes: Math.floor(Math.random() * 200) + 100, genuine: Math.floor(Math.random() * 500) + 300, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Feb", deepfakes: Math.floor(Math.random() * 200) + 100, genuine: Math.floor(Math.random() * 500) + 300, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Mar", deepfakes: Math.floor(Math.random() * 200) + 100, genuine: Math.floor(Math.random() * 500) + 300, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Apr", deepfakes: Math.floor(Math.random() * 200) + 100, genuine: Math.floor(Math.random() * 500) + 300, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "May", deepfakes: Math.floor(Math.random() * 200) + 200, genuine: Math.floor(Math.random() * 500) + 400, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Jun", deepfakes: Math.floor(Math.random() * 200) + 200, genuine: Math.floor(Math.random() * 500) + 400, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Jul", deepfakes: Math.floor(Math.random() * 200) + 300, genuine: Math.floor(Math.random() * 500) + 500, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Aug", deepfakes: Math.floor(Math.random() * 200) + 300, genuine: Math.floor(Math.random() * 500) + 500, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Sep", deepfakes: Math.floor(Math.random() * 200) + 200, genuine: Math.floor(Math.random() * 500) + 400, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Oct", deepfakes: Math.floor(Math.random() * 200) + 200, genuine: Math.floor(Math.random() * 500) + 400, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Nov", deepfakes: Math.floor(Math.random() * 200) + 300, genuine: Math.floor(Math.random() * 500) + 500, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Dec", deepfakes: Math.floor(Math.random() * 200) + 400, genuine: Math.floor(Math.random() * 500) + 600, accuracy: Math.floor(Math.random() * 10) + 90 },
];

const generateDetectionDataWeekly = () => [
  { name: "Week 1", deepfakes: Math.floor(Math.random() * 50) + 50, genuine: Math.floor(Math.random() * 150) + 100, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Week 2", deepfakes: Math.floor(Math.random() * 50) + 50, genuine: Math.floor(Math.random() * 150) + 100, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Week 3", deepfakes: Math.floor(Math.random() * 50) + 50, genuine: Math.floor(Math.random() * 150) + 100, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Week 4", deepfakes: Math.floor(Math.random() * 50) + 75, genuine: Math.floor(Math.random() * 150) + 150, accuracy: Math.floor(Math.random() * 10) + 90 },
];

const generateDetectionDataDaily = () => [
  { name: "Mon", deepfakes: Math.floor(Math.random() * 20) + 20, genuine: Math.floor(Math.random() * 50) + 30, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Tue", deepfakes: Math.floor(Math.random() * 20) + 20, genuine: Math.floor(Math.random() * 50) + 30, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Wed", deepfakes: Math.floor(Math.random() * 20) + 25, genuine: Math.floor(Math.random() * 50) + 35, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Thu", deepfakes: Math.floor(Math.random() * 20) + 20, genuine: Math.floor(Math.random() * 50) + 30, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Fri", deepfakes: Math.floor(Math.random() * 20) + 30, genuine: Math.floor(Math.random() * 50) + 40, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Sat", deepfakes: Math.floor(Math.random() * 20) + 15, genuine: Math.floor(Math.random() * 50) + 25, accuracy: Math.floor(Math.random() * 10) + 90 },
  { name: "Sun", deepfakes: Math.floor(Math.random() * 20) + 10, genuine: Math.floor(Math.random() * 50) + 20, accuracy: Math.floor(Math.random() * 10) + 90 },
];

export function RevenueChart() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("yearly");
  const [chartData, setChartData] = useState(generateDetectionData());
  const [chartView, setChartView] = useState<"bar" | "area">("area");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [dataType, setDataType] = useState<"detection" | "accuracy">("detection");
  
  useEffect(() => {
    // Update chart data based on active tab
    refreshChartData();
  }, [activeTab]);

  const refreshChartData = () => {
    switch (activeTab) {
      case "daily":
        setChartData(generateDetectionDataDaily());
        break;
      case "weekly":
        setChartData(generateDetectionDataWeekly());
        break;
      case "yearly":
      default:
        setChartData(generateDetectionData());
        break;
    }
  };

  const handleRefresh = () => {
    refreshChartData();
    toast({
      title: "Chart Data Refreshed",
      description: "Latest detection data has been loaded",
    });
  };

  const handleDownload = () => {
    toast({
      title: "Chart Downloaded",
      description: `Detection chart data has been exported as CSV`,
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
      // In a real app, this would filter the data
      refreshChartData();
    }
  };

  return (
    <Card className="col-span-4 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle>Deepfake Detection Analytics</CardTitle>
          <CardDescription>
            Track your detection performance and accuracy over time
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
          
          {dataType === "detection" ? (
            <>
              <TabsContent value="daily" className="h-[300px]">
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
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
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
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
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
              
              <TabsContent value="weekly" className="h-[300px]">
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
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
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
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
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
              
              <TabsContent value="yearly" className="h-[300px]">
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
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
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
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
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
            </>
          ) : (
            <>
              {/* Accuracy view for all tabs */}
              {["daily", "weekly", "yearly"].map((tab) => (
                <TabsContent key={tab} value={tab} className="h-[300px]">
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
                        domain={[50, 100]}
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
              ))}
            </>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
