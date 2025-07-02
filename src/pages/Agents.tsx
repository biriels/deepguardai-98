
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Heading } from "@/components/ui/heading";
import AgentDashboard from "@/components/Agents/AgentDashboard";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentBuilder from "@/components/Agents/AgentBuilder";

const Agents = () => {
  const { toast } = useToast();
  
  const [activeAgents, setActiveAgents] = React.useState({
    monitoring: true,
    decision: true,
    notification: false,
    learning: true,
    reporting: true
  });

  const toggleAgent = (agentType: keyof typeof activeAgents) => {
    setActiveAgents(prev => ({
      ...prev,
      [agentType]: !prev[agentType]
    }));
    
    // Show toast notification when an agent is toggled
    toast({
      title: `${agentType.charAt(0).toUpperCase() + agentType.slice(1)} Agent ${activeAgents[agentType] ? "Disabled" : "Enabled"}`,
      description: `${agentType.charAt(0).toUpperCase() + agentType.slice(1)} agent has been ${activeAgents[agentType] ? "disabled" : "enabled"}.`,
      variant: activeAgents[agentType] ? "destructive" : "default"
    });
  };

  const handleAgentCreated = (agentName: string) => {
    toast({
      title: "New Agent Created",
      description: `${agentName} has been successfully added to your agents.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <div className="text-center">
            <Heading 
              title="AI Agents" 
              description="Configure and manage your autonomous deepfake detection agents" 
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>{Object.values(activeAgents).filter(Boolean).length} Active</span>
            </div>
            <div className="flex items-center gap-2 bg-muted px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
              <span>{Object.values(activeAgents).filter(a => !a).length} Inactive</span>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="dashboard" className="space-y-6">
          <div className="flex justify-center">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="dashboard" className="text-sm">Agent Dashboard</TabsTrigger>
              <TabsTrigger value="builder" className="text-sm">Agent Builder</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="space-y-6">
            <AgentDashboard 
              activeAgents={activeAgents} 
              toggleAgent={toggleAgent}
            />
          </TabsContent>
          
          <TabsContent value="builder" className="space-y-6">
            <AgentBuilder onAgentCreated={handleAgentCreated} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Agents;
