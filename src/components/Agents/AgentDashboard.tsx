
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Bell, BarChart3, Brain } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DecisionAgent from "./DecisionAgent";
import MonitoringAgent from "./MonitoringAgent";
import NotificationAgent from "./NotificationAgent";
import ReportingAgent from "./ReportingAgent";
import LearningAgent from "./LearningAgent";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";

interface AgentDashboardProps {
  activeAgents: {
    monitoring: boolean;
    decision: boolean;
    notification: boolean;
    learning: boolean;
    reporting: boolean;
  };
  toggleAgent: (agent: keyof typeof activeAgents) => void;
}

const AgentDashboard = ({ activeAgents, toggleAgent }: AgentDashboardProps) => {
  const { toast } = useToast();
  const [deployDialogOpen, setDeployDialogOpen] = React.useState(false);
  const [newAgentName, setNewAgentName] = React.useState("");
  const [newAgentType, setNewAgentType] = React.useState("custom");
  const [newAgentDescription, setNewAgentDescription] = React.useState("");

  const handleDeployNewAgent = () => {
    setDeployDialogOpen(true);
  };

  const handleCreateAgent = () => {
    if (!newAgentName.trim()) {
      toast({
        title: "Error",
        description: "Agent name is required",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would create a new agent in the backend
    toast({
      title: "Agent Created",
      description: `${newAgentName} agent has been deployed successfully.`,
    });
    
    // Reset form and close dialog
    setNewAgentName("");
    setNewAgentType("custom");
    setNewAgentDescription("");
    setDeployDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Agents Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Configure and monitor autonomous agents in your deepfake detection system
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm py-1">
            {Object.values(activeAgents).filter(Boolean).length} Active Agents
          </Badge>
          <Button variant="default" size="sm" onClick={handleDeployNewAgent}>
            Deploy New Agent
          </Button>
        </div>
      </div>

      <Tabs defaultValue="monitoring">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="decision">Decision</TabsTrigger>
          <TabsTrigger value="notification">Notification</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
        </TabsList>
        <TabsContent value="monitoring">
          <MonitoringAgent 
            isActive={activeAgents.monitoring}
            onToggle={() => toggleAgent('monitoring')}
          />
        </TabsContent>
        <TabsContent value="decision">
          <DecisionAgent 
            isActive={activeAgents.decision}
            onToggle={() => toggleAgent('decision')}
          />
        </TabsContent>
        <TabsContent value="notification">
          <NotificationAgent 
            isActive={activeAgents.notification}
            onToggle={() => toggleAgent('notification')}
          />
        </TabsContent>
        <TabsContent value="learning">
          <LearningAgent 
            isActive={activeAgents.learning}
            onToggle={() => toggleAgent('learning')}
          />
        </TabsContent>
        <TabsContent value="reporting">
          <ReportingAgent 
            isActive={activeAgents.reporting}
            onToggle={() => toggleAgent('reporting')}
          />
        </TabsContent>
      </Tabs>

      {/* Create new agent dialog */}
      <Dialog open={deployDialogOpen} onOpenChange={setDeployDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Deploy New AI Agent</DialogTitle>
            <DialogDescription>
              Create a custom agent to extend your deepfake detection capabilities.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <FormLabel htmlFor="agent-name">Agent Name</FormLabel>
              <Input 
                id="agent-name" 
                placeholder="Enter agent name" 
                value={newAgentName}
                onChange={(e) => setNewAgentName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <FormLabel htmlFor="agent-type">Agent Type</FormLabel>
              <select 
                id="agent-type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={newAgentType}
                onChange={(e) => setNewAgentType(e.target.value)}
              >
                <option value="custom">Custom Agent</option>
                <option value="monitoring">Monitoring Agent</option>
                <option value="detection">Detection Agent</option>
                <option value="analysis">Analysis Agent</option>
                <option value="response">Response Agent</option>
              </select>
            </div>

            <div className="grid gap-2">
              <FormLabel htmlFor="agent-description">Description</FormLabel>
              <textarea 
                id="agent-description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="Describe the agent's purpose and capabilities"
                value={newAgentDescription}
                onChange={(e) => setNewAgentDescription(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeployDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAgent}>Deploy Agent</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AgentDashboard;
