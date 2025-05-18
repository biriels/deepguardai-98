
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Wifi } from "lucide-react";
import { NetworkStatus } from "./MonitorTypes";

interface ConnectionStatusCardProps {
  networkStatus: NetworkStatus;
  onRefresh: () => void;
}

const ConnectionStatusCard = ({ networkStatus, onRefresh }: ConnectionStatusCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Connection Status</CardTitle>
        <Button variant="ghost" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Wifi className={`h-4 w-4 ${networkStatus.connected ? 'text-emerald-500' : 'text-red-500'}`} />
              <span className="font-medium">Monitor Network</span>
            </div>
            <Badge variant="outline" className={networkStatus.connected ? 
              "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300" : 
              "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}>
              {networkStatus.connected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Network Latency</span>
              <span className="font-medium">{networkStatus.latency}ms</span>
            </div>
            <Progress value={networkStatus.latency} max={100} className="h-1" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>API Response Time</span>
              <span className="font-medium">{networkStatus.apiResponse}ms</span>
            </div>
            <Progress value={networkStatus.apiResponse / 4} max={100} className="h-1" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Detection Availability</span>
              <span className="font-medium">{networkStatus.availability}%</span>
            </div>
            <Progress value={networkStatus.availability} max={100} className="h-1" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionStatusCard;
