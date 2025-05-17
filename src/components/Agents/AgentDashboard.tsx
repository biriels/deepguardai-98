
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  AlertTriangle, 
  Bell, 
  Activity, 
  Layers 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AgentDashboardProps {
  activeAgents: {
    monitoring: boolean;
    decision: boolean;
    notification: boolean;
    learning: boolean;
    reporting: boolean;
  };
  toggleAgent: (agentType: keyof typeof activeAgents) => void;
}

const AgentDashboard = ({ activeAgents, toggleAgent }: AgentDashboardProps) => {
  // Calculate overall system health based on active agents
  const activeCount = Object.values(activeAgents).filter(Boolean).length;
  const totalAgents = Object.keys(activeAgents).length;
  const systemHealth = (activeCount / totalAgents) * 100;

  const agents = [
    {
      type: "monitoring" as const,
      name: "Monitoring Agent",
      description: "Scans content repositories for potential deepfakes",
      icon: <Shield className="h-5 w-5" />,
      stats: { processed: 1254, flagged: 86 }
    },
    {
      type: "decision" as const,
      name: "Decision Agent",
      description: "Analyzes and classifies detected content",
      icon: <AlertTriangle className="h-5 w-5" />,
      stats: { processed: 842, flagged: 124 }
    },
    {
      type: "notification" as const,
      name: "Notification Agent",
      description: "Alerts stakeholders about suspicious content",
      icon: <Bell className="h-5 w-5" />,
      stats: { processed: 124, flagged: 124 }
    },
    {
      type: "learning" as const,
      name: "Learning Agent",
      description: "Improves detection based on feedback",
      icon: <Activity className="h-5 w-5" />,
      stats: { processed: 720, flagged: 0 }
    },
    {
      type: "reporting" as const,
      name: "Reporting Agent",
      description: "Generates insights and detection patterns",
      icon: <Layers className="h-5 w-5" />,
      stats: { processed: 42, flagged: 0 }
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold">Agent System Health</h2>
            <Badge variant={systemHealth > 80 ? "default" : systemHealth > 50 ? "outline" : "destructive"}>
              {systemHealth}% Active
            </Badge>
          </div>
          <Progress value={systemHealth} className="h-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {agents.map((agent) => (
            <div key={agent.type} className="border rounded-lg p-4 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {agent.icon}
                  <h3 className="font-medium">{agent.name}</h3>
                </div>
                <Switch 
                  checked={activeAgents[agent.type]} 
                  onCheckedChange={() => toggleAgent(agent.type)} 
                />
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">{agent.description}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-muted rounded p-2">
                  <div className="text-muted-foreground">Processed</div>
                  <div className="font-medium">{agent.stats.processed}</div>
                </div>
                <div className="bg-muted rounded p-2">
                  <div className="text-muted-foreground">Flagged</div>
                  <div className="font-medium">{agent.stats.flagged}</div>
                </div>
              </div>
              
              <Badge 
                className="mt-4 self-start"
                variant={activeAgents[agent.type] ? "default" : "outline"}
              >
                {activeAgents[agent.type] ? "Active" : "Inactive"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentDashboard;
