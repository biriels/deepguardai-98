
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MonitoringHeaderProps {
  totalActiveMonitors: number;
  onAddMonitor: () => void;
}

const MonitoringHeader = ({ totalActiveMonitors, onAddMonitor }: MonitoringHeaderProps) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Monitoring</h1>
          <p className="text-muted-foreground mt-2">
            Real-time monitoring of content across connected platforms
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm py-1">
            {totalActiveMonitors} Active Monitors
          </Badge>
          <Button variant="default" size="sm" onClick={onAddMonitor}>
            <Plus className="h-4 w-4 mr-2" />
            Add Monitor
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonitoringHeader;
