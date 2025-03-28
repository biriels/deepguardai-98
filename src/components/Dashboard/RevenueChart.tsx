
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

// Sample data for the charts
const generateRevenueData = () => [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 4200 },
  { name: "Mar", revenue: 3800 },
  { name: "Apr", revenue: 5600 },
  { name: "May", revenue: 7000 },
  { name: "Jun", revenue: 6200 },
  { name: "Jul", revenue: 8100 },
  { name: "Aug", revenue: 9400 },
  { name: "Sep", revenue: 8700 },
  { name: "Oct", revenue: 7400 },
  { name: "Nov", revenue: 9800 },
  { name: "Dec", revenue: 12000 },
];

const generateRevenueDataWeekly = () => [
  { name: "Week 1", revenue: 1200 },
  { name: "Week 2", revenue: 1400 },
  { name: "Week 3", revenue: 1100 },
  { name: "Week 4", revenue: 2100 },
];

const generateRevenueDataDaily = () => [
  { name: "Mon", revenue: 300 },
  { name: "Tue", revenue: 270 },
  { name: "Wed", revenue: 320 },
  { name: "Thu", revenue: 280 },
  { name: "Fri", revenue: 390 },
  { name: "Sat", revenue: 190 },
  { name: "Sun", revenue: 150 },
];

export function RevenueChart() {
  const [activeTab, setActiveTab] = useState("yearly");
  const [chartData, setChartData] = useState(generateRevenueData());

  useEffect(() => {
    // Update chart data based on active tab
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
  }, [activeTab]);

  return (
    <Card className="col-span-4 shadow-sm">
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>
          Track your revenue performance over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="yearly" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily" className="h-[300px]">
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
          </TabsContent>
          
          <TabsContent value="weekly" className="h-[300px]">
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
          </TabsContent>
          
          <TabsContent value="yearly" className="h-[300px]">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
