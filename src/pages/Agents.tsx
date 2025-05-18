
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Heading } from "@/components/ui/heading";
import AgentDashboard from "@/components/Agents/AgentDashboard";
import { useToast } from "@/hooks/use-toast";

const Agents = () => {
  const { toast } = useToast();
  
  // Agent state and toggle function should be declared here and passed to AgentDashboard
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
      title: `Agent ${activeAgents[agentType] ? "Disabled" : "Enabled"}`,
      description: `${agentType.charAt(0).toUpperCase() + agentType.slice(1)} agent has been ${activeAgents[agentType] ? "disabled" : "enabled"}.`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <Heading 
          title="AI Agents" 
          description="Configure and manage your autonomous deepfake detection agents" 
        />
        <AgentDashboard 
          activeAgents={activeAgents} 
          toggleAgent={toggleAgent}
        />
      </div>
    </Layout>
  );
};

export default Agents;
