
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
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-8 animate-fade-in">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">AI-Powered Protection</span>
              </div>
              <Heading 
                title="AI Agents" 
                description="Configure and manage your autonomous deepfake detection agents with advanced AI capabilities" 
              />
            </div>
            
            {/* Status Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="group flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 px-4 py-2 rounded-full border border-green-200 dark:border-green-800 hover-scale">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  {Object.values(activeAgents).filter(Boolean).length} Active Agents
                </span>
              </div>
              <div className="group flex items-center gap-2 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 px-4 py-2 rounded-full border border-orange-200 dark:border-orange-800 hover-scale">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                  {Object.values(activeAgents).filter(a => !a).length} Inactive
                </span>
              </div>
              <div className="group flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-800 hover-scale">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  24/7 Monitoring
                </span>
              </div>
            </div>
          </div>
        
          {/* Main Content */}
          <Tabs defaultValue="dashboard" className="space-y-8">
            <div className="flex justify-center animate-fade-in">
              <TabsList className="grid w-full max-w-md grid-cols-2 h-12 p-1 bg-muted/50 border">
                <TabsTrigger value="dashboard" className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Agent Dashboard
                </TabsTrigger>
                <TabsTrigger value="builder" className="text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  Agent Builder
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="space-y-8 animate-fade-in">
              <AgentDashboard 
                activeAgents={activeAgents} 
                toggleAgent={toggleAgent}
              />
            </TabsContent>
            
            <TabsContent value="builder" className="space-y-8 animate-fade-in">
              <AgentBuilder onAgentCreated={handleAgentCreated} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Agents;
