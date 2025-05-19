
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Layers, Download, BarChart, Calendar, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";

interface ReportingAgentProps {
  isActive: boolean;
  onToggle: () => void;
}

const ReportingAgent = ({ isActive, onToggle }: ReportingAgentProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            <CardTitle>Reporting Agent</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Generates insights and patterns from deepfake detection data
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={isActive ? "default" : "outline"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
          <Switch checked={isActive} onCheckedChange={onToggle} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2" disabled={!isActive}>
              <Calendar className="h-4 w-4" />
              Last 30 days
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2" disabled={!isActive}>
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2" disabled={!isActive}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" disabled={!isActive}>Generate Report</Button>
          </div>
        </div>
        
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
            <TabsTrigger value="sources">Source Analysis</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Deepfake Detection Trends</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center bg-muted rounded">
                  {isActive ? (
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <div className="text-muted-foreground">Agent is inactive</div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Content Type Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center bg-muted rounded">
                  {isActive ? (
                    <BarChart className="h-8 w-8 text-muted-foreground" />
                  ) : (
                    <div className="text-muted-foreground">Agent is inactive</div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                {isActive ? (
                  <div className="space-y-4">
                    {[
                      "Deepfake videos featuring political figures increased by 32% this month",
                      "Social media platforms account for 68% of all detected deepfakes",
                      "Audio deepfakes are growing at 2.4x the rate of video deepfakes",
                      "Detection accuracy improved by 7.2% since implementing user feedback"
                    ].map((insight, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-md">
                        <div className="p-1.5 rounded-full bg-primary/10">
                          <Layers className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-sm">{insight}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Activate the reporting agent to view insights
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sources" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Content Source Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {isActive ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Source</TableHead>
                        <TableHead className="hidden sm:table-cell">Content Type</TableHead>
                        <TableHead className="text-right">Detection Count</TableHead>
                        <TableHead className="text-right">% of Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { source: "Twitter", type: "Video, Image", count: 423, percentage: 34.2 },
                        { source: "TikTok", type: "Video", count: 287, percentage: 23.1 },
                        { source: "Instagram", type: "Image, Video", count: 194, percentage: 15.7 },
                        { source: "YouTube", type: "Video, Audio", count: 152, percentage: 12.3 },
                        { source: "News Sites", type: "Image, Video", count: 98, percentage: 7.9 },
                        { source: "Other", type: "Various", count: 84, percentage: 6.8 }
                      ].map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.source}</TableCell>
                          <TableCell className="hidden sm:table-cell">{item.type}</TableCell>
                          <TableCell className="text-right">{item.count}</TableCell>
                          <TableCell className="text-right">{item.percentage}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Activate the reporting agent to view source analysis
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-4 space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-4">Scheduled Reports</h3>
              
              <div className="space-y-4">
                {[
                  { title: "Weekly Detection Summary", schedule: "Every Monday at 9:00 AM", recipients: "All Admins", lastSent: "May 13, 2025" },
                  { title: "Monthly Trend Analysis", schedule: "1st day of month at 10:00 AM", recipients: "Executive Team", lastSent: "May 1, 2025" },
                  { title: "Quarterly Performance Report", schedule: "Every 3 months", recipients: "Board Members", lastSent: "Apr 1, 2025" }
                ].map((report, index) => (
                  <div key={index} className="border rounded p-4">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h4 className="font-medium">{report.title}</h4>
                        <div className="text-xs text-muted-foreground mt-1 space-y-1">
                          <div>Schedule: {report.schedule}</div>
                          <div>Recipients: {report.recipients}</div>
                          <div>Last sent: {report.lastSent}</div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled={!isActive}>Edit</Button>
                        <Button variant="outline" size="sm" disabled={!isActive}>View</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ReportingAgent;
