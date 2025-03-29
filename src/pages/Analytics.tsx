
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Calendar, Download, Filter, LineChart, PieChart } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart as RechartLineChart, Pie, PieChart as RechartPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const analyticsData = {
  weeklyDetections: [
    { name: "Mon", deepfakes: 12, altered: 8, genuine: 42 },
    { name: "Tue", deepfakes: 19, altered: 11, genuine: 38 },
    { name: "Wed", deepfakes: 15, altered: 9, genuine: 45 },
    { name: "Thu", deepfakes: 22, altered: 17, genuine: 36 },
    { name: "Fri", deepfakes: 28, altered: 12, genuine: 41 },
    { name: "Sat", deepfakes: 14, altered: 8, genuine: 32 },
    { name: "Sun", deepfakes: 16, altered: 10, genuine: 29 }
  ],
  contentTypes: [
    { name: "Videos", value: 45 },
    { name: "Images", value: 32 },
    { name: "Audio", value: 18 },
    { name: "Text", value: 5 }
  ],
  detectionTrend: [
    { date: "Jan", detections: 35 },
    { date: "Feb", detections: 42 },
    { date: "Mar", detections: 58 },
    { date: "Apr", detections: 63 },
    { date: "May", detections: 75 },
    { date: "Jun", detections: 92 }
  ],
  platformBreakdown: [
    { platform: "Twitter", percentage: 38 },
    { platform: "Facebook", percentage: 22 },
    { platform: "Instagram", percentage: 15 },
    { platform: "TikTok", percentage: 18 },
    { platform: "Other", percentage: 7 }
  ]
};

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

const Analytics = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Advanced insights and statistics for deepfake detection
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trends">Detection Trends</TabsTrigger>
            <TabsTrigger value="platforms">Platform Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Weekly Detection Summary</CardTitle>
                    <BarChart3 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription>Content analyzed by authenticity status</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={analyticsData.weeklyDetections}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="deepfakes" name="Deepfakes" fill="#8884d8" />
                        <Bar dataKey="altered" name="Altered Content" fill="#82ca9d" />
                        <Bar dataKey="genuine" name="Genuine Content" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Content Type Distribution</CardTitle>
                    <PieChart className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <CardDescription>Breakdown by media format</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartPieChart>
                        <Pie
                          data={analyticsData.contentTypes}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {analyticsData.contentTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Detection Trend (Last 6 Months)</CardTitle>
                  <LineChart className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Monthly detection volume over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartLineChart
                      data={analyticsData.detectionTrend}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="detections" 
                        name="Total Detections" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                    </RechartLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Platform Distribution</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Detections by social media platform</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analyticsData.platformBreakdown}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="platform" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="percentage" 
                        name="Percentage of Detections" 
                        fill="#8884d8" 
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">Detection Trends Tab Content</h3>
                  <p className="text-muted-foreground">Detailed trend analysis would be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-10">
                  <h3 className="text-lg font-medium mb-2">Platform Analysis Tab Content</h3>
                  <p className="text-muted-foreground">Detailed platform breakdown would be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
