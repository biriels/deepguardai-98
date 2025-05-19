
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
      <div className="space-y-6">
        <Heading 
          title="AI Agents" 
          description="Configure and manage your autonomous deepfake detection agents" 
        />
        
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList>
            <TabsTrigger value="dashboard">Agent Dashboard</TabsTrigger>
            <TabsTrigger value="builder">Agent Builder</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-4">
            <AgentDashboard 
              activeAgents={activeAgents} 
              toggleAgent={toggleAgent}
            />
          </TabsContent>
          
          <TabsContent value="builder">
            <AgentBuilder onAgentCreated={handleAgentCreated} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Agents;
