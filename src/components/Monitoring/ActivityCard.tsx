
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityEvent } from "./MonitorTypes";

interface ActivityCardProps {
  activities: ActivityEvent[];
}

const ActivityCard = ({ activities }: ActivityCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Platform Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="mt-1">{activity.icon}</div>
              <div>
                <p className="font-medium">{activity.event}</p>
                <p className="text-sm text-muted-foreground">{activity.details}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
