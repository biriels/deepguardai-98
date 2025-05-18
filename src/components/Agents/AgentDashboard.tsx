
import React, { useState } from "react";
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

const AgentDashboard = () => {
  const [activeAgents, setActiveAgents] = useState({
    monitoring: true,
    decision: true,
    notification: false,
    learning: true,
    reporting: true
  });

  const toggleAgent = (agent: keyof typeof activeAgents) => {
    setActiveAgents(prev => ({
      ...prev,
      [agent]: !prev[agent]
    }));
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
          <Button variant="default" size="sm">
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
  );
};

export default AgentDashboard;
