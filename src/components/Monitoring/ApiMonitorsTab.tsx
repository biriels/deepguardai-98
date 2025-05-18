
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ApiMonitor } from "./MonitorTypes";
import MonitorItem from "./MonitorItem";

interface ApiMonitorsTabProps {
  monitors: ApiMonitor[];
  onRefresh: (id: string, type: string) => void;
  onToggleStatus: (id: string, type: string) => void;
  onDelete: (id: string, type: string) => void;
  onOpenAddDialog: () => void;
}

const ApiMonitorsTab = ({
  monitors,
  onRefresh,
  onToggleStatus,
  onDelete,
  onOpenAddDialog,
}: ApiMonitorsTabProps) => {
  if (monitors.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No API monitors added yet.</p>
        <Button variant="outline" className="mt-4" onClick={onOpenAddDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add API Monitor
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {monitors.map((monitor) => (
        <MonitorItem
          key={monitor.id}
          id={monitor.id}
          type="custom"
          name={monitor.name}
          status={monitor.status}
          lastCheck={monitor.lastCheck}
          detectionRate={monitor.detectionRate}
          secondaryInfo={monitor.endpoint}
          alerts={monitor.alerts}
          onRefresh={onRefresh}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ApiMonitorsTab;
