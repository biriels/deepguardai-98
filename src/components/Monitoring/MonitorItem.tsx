
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PauseCircle, PlayCircle, RefreshCw, Trash2 } from "lucide-react";

interface MonitorItemProps {
  id: string;
  type: string;
  name: string;
  status: "active" | "paused";
  lastCheck: string;
  detectionRate: number;
  secondaryInfo: string;
  alerts: number;
  onRefresh: (id: string, type: string) => void;
  onToggleStatus: (id: string, type: string) => void;
  onDelete: (id: string, type: string) => void;
}

const MonitorItem = ({
  id,
  type,
  name,
  status,
  lastCheck,
  detectionRate,
  secondaryInfo,
  alerts,
  onRefresh,
  onToggleStatus,
  onDelete,
}: MonitorItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${status === "active" ? "bg-emerald-500" : "bg-amber-500"}`}></div>
        <div>
          <div className="flex items-center">
            <p className="font-medium">{name}</p>
            <Badge variant="outline" className="ml-2 text-xs">
              {secondaryInfo}
            </Badge>
          </div>
          <div className="flex text-xs text-muted-foreground gap-2 mt-1">
            <span>Last check: {lastCheck}</span>
            <span>•</span>
            <span>Detection rate: {detectionRate}%</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-300">
          {alerts} alerts
        </Badge>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => onRefresh(id, type)}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => onToggleStatus(id, type)}
        >
          {status === "active" ? (
            <PauseCircle className="h-4 w-4" />
          ) : (
            <PlayCircle className="h-4 w-4" />
          )}
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-red-500"
          onClick={() => onDelete(id, type)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MonitorItem;
