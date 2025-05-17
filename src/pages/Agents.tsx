
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MonitoringAgent from "@/components/Agents/MonitoringAgent";
import DecisionAgent from "@/components/Agents/DecisionAgent";
import NotificationAgent from "@/components/Agents/NotificationAgent";
import LearningAgent from "@/components/Agents/LearningAgent";
import ReportingAgent from "@/components/Agents/ReportingAgent";
import AgentDashboard from "@/components/Agents/AgentDashboard";

const Agents = () => {
  const [activeAgents, setActiveAgents] = useState({
    monitoring: true,
    decision: true,
    notification: true,
    learning: false,
    reporting: true,
  });

  const toggleAgent = (agentType: keyof typeof activeAgents) => {
    setActiveAgents((prev) => ({
      ...prev,
      [agentType]: !prev[agentType],
    }));
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">DeepGuard Agent System</h1>
          <p className="text-muted-foreground mt-2">
            Intelligent agents that autonomously monitor, analyze, and protect against deepfakes
          </p>
        </div>

        <AgentDashboard activeAgents={activeAgents} toggleAgent={toggleAgent} />

        <Tabs defaultValue="monitoring" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="decision">Decision</TabsTrigger>
            <TabsTrigger value="notification">Notification</TabsTrigger>
            <TabsTrigger value="learning">Learning</TabsTrigger>
            <TabsTrigger value="reporting">Reporting</TabsTrigger>
          </TabsList>

          <TabsContent value="monitoring">
            <MonitoringAgent isActive={activeAgents.monitoring} />
          </TabsContent>

          <TabsContent value="decision">
            <DecisionAgent isActive={activeAgents.decision} />
          </TabsContent>

          <TabsContent value="notification">
            <NotificationAgent isActive={activeAgents.notification} />
          </TabsContent>

          <TabsContent value="learning">
            <LearningAgent isActive={activeAgents.learning} />
          </TabsContent>

          <TabsContent value="reporting">
            <ReportingAgent isActive={activeAgents.reporting} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Agents;
