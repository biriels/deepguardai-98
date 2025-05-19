
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MonitoringAgent from "./MonitoringAgent";
import DecisionAgent from "./DecisionAgent";
import NotificationAgent from "./NotificationAgent";
import LearningAgent from "./LearningAgent";
import ReportingAgent from "./ReportingAgent";

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

const AgentDashboard: React.FC<AgentDashboardProps> = ({
  activeAgents,
  toggleAgent,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MonitoringAgent isActive={activeAgents.monitoring} onToggle={() => toggleAgent("monitoring")} />
      <DecisionAgent isActive={activeAgents.decision} onToggle={() => toggleAgent("decision")} />
      <NotificationAgent isActive={activeAgents.notification} onToggle={() => toggleAgent("notification")} />
      <LearningAgent isActive={activeAgents.learning} onToggle={() => toggleAgent("learning")} />
      <ReportingAgent isActive={activeAgents.reporting} onToggle={() => toggleAgent("reporting")} />
    </div>
  );
};

export default AgentDashboard;
