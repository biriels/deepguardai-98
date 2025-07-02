
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
  toggleAgent: (agentType: keyof AgentDashboardProps["activeAgents"]) => void;
}

const AgentDashboard: React.FC<AgentDashboardProps> = ({
  activeAgents,
  toggleAgent,
}) => {
  return (
    <div className="space-y-8">
      {/* Agent Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {Object.values(activeAgents).filter(Boolean).length}
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Active Agents</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">24/7</div>
            <div className="text-sm text-green-600 dark:text-green-400">Monitoring</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">99.9%</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Uptime</div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div className="space-y-6 lg:space-y-0 lg:contents">
          <MonitoringAgent isActive={activeAgents.monitoring} onToggle={() => toggleAgent("monitoring")} />
          <DecisionAgent isActive={activeAgents.decision} onToggle={() => toggleAgent("decision")} />
          <NotificationAgent isActive={activeAgents.notification} onToggle={() => toggleAgent("notification")} />
          <LearningAgent isActive={activeAgents.learning} onToggle={() => toggleAgent("learning")} />
          <ReportingAgent isActive={activeAgents.reporting} onToggle={() => toggleAgent("reporting")} />
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
