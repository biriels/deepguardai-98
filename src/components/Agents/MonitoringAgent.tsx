
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

interface MonitoringAgentProps {
  isActive: boolean;
  onToggle: () => void;
}

const MonitoringAgent = ({ isActive, onToggle }: MonitoringAgentProps) => {
  const [sources, setSources] = useState([
    { id: 1, name: "Twitter", status: "monitoring", progress: 68, lastScan: "10 min ago", contentCount: 1245 },
    { id: 2, name: "Instagram", status: "monitoring", progress: 92, lastScan: "5 min ago", contentCount: 872 },
    { id: 3, name: "YouTube", status: "paused", progress: 0, lastScan: "1 hour ago", contentCount: 367 },
    { id: 4, name: "News Sites", status: "monitoring", progress: 45, lastScan: "2 min ago", contentCount: 538 },
  ]);

  const handleToggleSource = (id: number) => {
    setSources(sources.map(source => {
      if (source.id === id) {
        return {
          ...source,
          status: source.status === "monitoring" ? "paused" : "monitoring",
          progress: source.status === "monitoring" ? 0 : Math.floor(Math.random() * 100)
        };
      }
      return source;
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Monitoring Agent</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Autonomously scans content sources for potential deepfakes
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isActive ? "default" : "outline"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search monitored sources..."
              className="pl-9"
            />
          </div>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Source
          </Button>
        </div>

        <div className="border rounded-lg p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-medium">Monitoring Configuration</h3>
              <p className="text-sm text-muted-foreground">Adjust how the agent scans content</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center justify-between space-x-2 border rounded p-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Continuous Monitoring</div>
                  <div className="text-xs text-muted-foreground">Scan in real-time</div>
                </div>
                <Switch checked={isActive} onCheckedChange={onToggle} />
              </div>
              <div className="flex items-center justify-between space-x-2 border rounded p-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Deep Scanning</div>
                  <div className="text-xs text-muted-foreground">Higher accuracy, slower scan</div>
                </div>
                <Switch checked={true} />
              </div>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden sm:table-cell">Progress</TableHead>
                <TableHead className="hidden md:table-cell">Last Scan</TableHead>
                <TableHead className="hidden md:table-cell">Content Count</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>
                    <Badge variant={source.status === "monitoring" ? "default" : "outline"}>
                      {source.status === "monitoring" ? "Active" : "Paused"}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                      <Progress value={source.progress} className="h-2 w-full max-w-[100px]" />
                      <span className="text-xs">{source.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{source.lastScan}</TableCell>
                  <TableCell className="hidden md:table-cell">{source.contentCount}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleSource(source.id)}
                    >
                      {source.status === "monitoring" ? "Pause" : "Resume"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "9:42 AM", message: "Twitter scan complete - 2 potential deepfakes detected" },
                { time: "9:37 AM", message: "Instagram monitoring started - scanning latest posts" },
                { time: "9:30 AM", message: "News Sites scan complete - 0 potential deepfakes detected" },
                { time: "9:15 AM", message: "YouTube monitoring paused - API rate limit reached" }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 text-sm">
                  <div className="text-muted-foreground">{activity.time}</div>
                  <div>{activity.message}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default MonitoringAgent;
