
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, User, Users } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNotifications } from "@/contexts/NotificationContext";

interface NotificationAgentProps {
  isActive: boolean;
  onToggle: () => void;
}

const NotificationAgent = ({ isActive, onToggle }: NotificationAgentProps) => {
  const { state, addNotification } = useNotifications();
  
  const handleTestNotification = () => {
    addNotification({
      title: "Test Notification",
      description: "This is a test notification from the notification agent",
      type: "info"
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <CardTitle>Notification Agent</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Alerts stakeholders about suspicious content and detection activity
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
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Notification Channels</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border rounded p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">In-App</h4>
                </div>
                <Switch checked={true} />
              </div>
              <p className="text-xs text-muted-foreground">
                Send notifications within the application interface
              </p>
              <Button size="sm" variant="outline" className="w-full" onClick={handleTestNotification} disabled={!isActive}>
                Test Notification
              </Button>
            </div>
            
            <div className="border rounded p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Email</h4>
                </div>
                <Switch checked={true} />
              </div>
              <p className="text-xs text-muted-foreground">
                Send email notifications to registered users
              </p>
              <Button size="sm" variant="outline" className="w-full" disabled={!isActive}>
                Test Email
              </Button>
            </div>
            
            <div className="border rounded p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <h4 className="font-medium">Slack</h4>
                </div>
                <Switch checked={false} />
              </div>
              <p className="text-xs text-muted-foreground">
                Send notifications to configured Slack channels
              </p>
              <Button size="sm" variant="outline" className="w-full" disabled={true}>
                Configure
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Notification Rules</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { event: "Critical Deepfake Detected", channels: ["In-App", "Email", "Slack"], recipients: "All Admins", enabled: true },
                { event: "New Deepfake Detection", channels: ["In-App", "Email"], recipients: "Content Reviewers", enabled: true },
                { event: "Weekly Summary Report", channels: ["Email"], recipients: "All Users", enabled: true },
                { event: "System Health Alert", channels: ["In-App", "Email"], recipients: "System Admins", enabled: false },
                { event: "Model Performance Change", channels: ["In-App", "Email"], recipients: "Data Scientists", enabled: true }
              ].map((rule, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{rule.event}</TableCell>
                  <TableCell>{rule.channels.join(", ")}</TableCell>
                  <TableCell>{rule.recipients}</TableCell>
                  <TableCell className="text-right">
                    <Switch checked={rule.enabled} disabled={!isActive} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "10:24 AM", message: "Critical deepfake detected on Twitter", status: "sent" },
                { time: "9:18 AM", message: "Weekly detection report generated", status: "sent" },
                { time: "Yesterday", message: "Notification agent started monitoring", status: "sent" }
              ].map((notification, index) => (
                <div key={index} className="flex justify-between items-center gap-4 text-sm">
                  <div className="flex items-start gap-4">
                    <div className="text-muted-foreground w-20">{notification.time}</div>
                    <div>{notification.message}</div>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-600">
                    <CheckCircle className="h-3.5 w-3.5" />
                    <span className="text-xs">{notification.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default NotificationAgent;
