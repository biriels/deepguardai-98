
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertCircle, Bell, BellOff, CheckCircle, Clock, Filter, Settings, Shield, Smartphone, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Alerts = () => {
  const isMobile = useIsMobile();
  
  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Alerts</h1>
            <p className="text-muted-foreground mt-1 md:mt-2 text-sm md:text-base">
              Review and manage alerts from deepfake detection systems
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-center">
            <Button variant="outline" size={isMobile ? "sm" : "default"}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size={isMobile ? "sm" : "default"}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2 md:pb-3">
            <CardTitle className="text-lg md:text-xl">Alert Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-red-50 rounded-lg dark:bg-red-900/20">
                <div className="rounded-full bg-red-100 p-2 md:p-2.5 dark:bg-red-800/30">
                  <AlertCircle className="h-5 w-5 md:h-6 md:w-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">7</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Critical Alerts</div>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-amber-50 rounded-lg dark:bg-amber-900/20">
                <div className="rounded-full bg-amber-100 p-2 md:p-2.5 dark:bg-amber-800/30">
                  <Bell className="h-5 w-5 md:h-6 md:w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">18</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Warning Alerts</div>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-green-50 rounded-lg dark:bg-green-900/20 sm:col-span-2 md:col-span-1">
                <div className="rounded-full bg-green-100 p-2 md:p-2.5 dark:bg-green-800/30">
                  <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold">42</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Resolved</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="warning" className="hidden md:block">Warning</TabsTrigger>
            <TabsTrigger value="resolved" className="hidden md:block">Resolved</TabsTrigger>
          </TabsList>
          <div className="flex md:hidden mt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="warning">Warning</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardContent className="p-0 overflow-auto">
                <div className="md:hidden space-y-4 p-4">
                  {/* Mobile card view for alerts */}
                  {[
                    {
                      id: 1,
                      status: "critical",
                      title: "Deepfake video detected",
                      description: "AI-generated public figure video detected on social platform",
                      source: "Twitter",
                      sourceIcon: <Smartphone className="h-4 w-4 text-muted-foreground" />,
                      dateTime: "Today, 10:34 AM"
                    },
                    {
                      id: 2,
                      status: "critical",
                      title: "Multiple AI voices detected",
                      description: "Synthetic voice content detected on trending podcast",
                      source: "Spotify",
                      sourceIcon: <Smartphone className="h-4 w-4 text-muted-foreground" />,
                      dateTime: "Today, 9:15 AM"
                    },
                    {
                      id: 3,
                      status: "warning",
                      title: "Altered image detected",
                      description: "Manipulated image found on news site",
                      source: "News Portal",
                      sourceIcon: <Shield className="h-4 w-4 text-muted-foreground" />,
                      dateTime: "Yesterday, 4:20 PM"
                    },
                    {
                      id: 4,
                      status: "warning",
                      title: "Suspicious text pattern",
                      description: "AI-generated text detected in comments section",
                      source: "Forum",
                      sourceIcon: <Shield className="h-4 w-4 text-muted-foreground" />,
                      dateTime: "Yesterday, 2:45 PM"
                    },
                    {
                      id: 5,
                      status: "resolved",
                      title: "Deepfake audio clip",
                      description: "Synthetic voice message identified and contained",
                      source: "WhatsApp",
                      sourceIcon: <Smartphone className="h-4 w-4 text-muted-foreground" />,
                      dateTime: "May 10, 2023, 1:30 PM"
                    }
                  ].map((alert) => (
                    <div key={alert.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <Badge variant={
                          alert.status === "critical" ? "destructive" : 
                          alert.status === "warning" ? "default" : "outline"
                        }>
                          {alert.status === "critical" ? "Critical" : 
                           alert.status === "warning" ? "Warning" : "Resolved"}
                        </Badge>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            {alert.status === "resolved" ? <BellOff className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{alert.description}</div>
                      </div>
                      <div className="flex justify-between items-center mt-3 text-xs">
                        <div className="flex items-center gap-1">
                          {alert.sourceIcon}
                          <span>{alert.source}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{alert.dateTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop table view */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Status</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="w-[160px]">Date/Time</TableHead>
                        <TableHead className="text-right w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          status: "critical",
                          title: "Deepfake video detected",
                          description: "AI-generated public figure video detected on social platform",
                          source: "Twitter",
                          sourceIcon: <Smartphone className="h-4 w-4 text-muted-foreground" />,
                          dateTime: "Today, 10:34 AM"
                        },
                        {
                          id: 2,
                          status: "critical",
                          title: "Multiple AI voices detected",
                          description: "Synthetic voice content detected on trending podcast",
                          source: "Spotify",
                          sourceIcon: <Smartphone className="h-4 w-4 text-muted-foreground" />,
                          dateTime: "Today, 9:15 AM"
                        },
                        {
                          id: 3,
                          status: "warning",
                          title: "Altered image detected",
                          description: "Manipulated image found on news site",
                          source: "News Portal",
                          sourceIcon: <Shield className="h-4 w-4 text-muted-foreground" />,
                          dateTime: "Yesterday, 4:20 PM"
                        },
                        {
                          id: 4,
                          status: "warning",
                          title: "Suspicious text pattern",
                          description: "AI-generated text detected in comments section",
                          source: "Forum",
                          sourceIcon: <Shield className="h-4 w-4 text-muted-foreground" />,
                          dateTime: "Yesterday, 2:45 PM"
                        },
                        {
                          id: 5,
                          status: "resolved",
                          title: "Deepfake audio clip",
                          description: "Synthetic voice message identified and contained",
                          source: "WhatsApp",
                          sourceIcon: <Smartphone className="h-4 w-4 text-muted-foreground" />,
                          dateTime: "May 10, 2023, 1:30 PM"
                        }
                      ].map((alert) => (
                        <TableRow key={alert.id}>
                          <TableCell>
                            <Badge variant={
                              alert.status === "critical" ? "destructive" : 
                              alert.status === "warning" ? "default" : "outline"
                            }>
                              {alert.status === "critical" ? "Critical" : 
                               alert.status === "warning" ? "Warning" : "Resolved"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{alert.title}</div>
                            <div className="text-sm text-muted-foreground">{alert.description}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {alert.sourceIcon}
                              <span>{alert.source}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{alert.dateTime}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                {alert.status === "resolved" ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="critical" className="mt-4">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="text-center py-6 md:py-10">
                  <h3 className="text-base md:text-lg font-medium mb-2">Critical Alerts Tab Content</h3>
                  <p className="text-sm text-muted-foreground">Shows only critical alerts.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="warning" className="mt-4">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="text-center py-6 md:py-10">
                  <h3 className="text-base md:text-lg font-medium mb-2">Warning Alerts Tab Content</h3>
                  <p className="text-sm text-muted-foreground">Shows only warning alerts.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resolved" className="mt-4">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="text-center py-6 md:py-10">
                  <h3 className="text-base md:text-lg font-medium mb-2">Resolved Alerts Tab Content</h3>
                  <p className="text-sm text-muted-foreground">Shows only resolved alerts.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Alerts;
