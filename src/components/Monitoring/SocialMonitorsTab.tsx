
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SocialMonitor } from "./MonitorTypes";
import MonitorItem from "./MonitorItem";

interface SocialMonitorsTabProps {
  monitors: SocialMonitor[];
  onRefresh: (id: string, type: string) => void;
  onToggleStatus: (id: string, type: string) => void;
  onDelete: (id: string, type: string) => void;
  onOpenAddDialog: () => void;
}

const SocialMonitorsTab = ({
  monitors,
  onRefresh,
  onToggleStatus,
  onDelete,
  onOpenAddDialog,
}: SocialMonitorsTabProps) => {
  if (monitors.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No social media monitors added yet.</p>
        <Button variant="outline" className="mt-4" onClick={onOpenAddDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Social Media Monitor
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
          type="social"
          name={monitor.name}
          status={monitor.status}
          lastCheck={monitor.lastCheck}
          detectionRate={monitor.detectionRate}
          secondaryInfo={monitor.platform}
          alerts={monitor.alerts}
          onRefresh={onRefresh}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default SocialMonitorsTab;
