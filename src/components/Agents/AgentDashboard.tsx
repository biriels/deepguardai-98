
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
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="group bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-100 dark:from-blue-950/50 dark:via-blue-950/30 dark:to-indigo-950/50 border-blue-200/50 dark:border-blue-800/50 hover-scale">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-300 group-hover:scale-105 transition-transform">
                  {Object.values(activeAgents).filter(Boolean).length}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">Active Agents</div>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-950/50 dark:via-emerald-950/30 dark:to-green-950/50 border-green-200/50 dark:border-green-800/50 hover-scale">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-300 group-hover:scale-105 transition-transform">24/7</div>
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">Monitoring</div>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group bg-gradient-to-br from-purple-50 via-violet-50 to-purple-100 dark:from-purple-950/50 dark:via-violet-950/30 dark:to-purple-950/50 border-purple-200/50 dark:border-purple-800/50 hover-scale">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-300 group-hover:scale-105 transition-transform">99.9%</div>
                <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">Uptime</div>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-orange-950/50 dark:via-amber-950/30 dark:to-orange-950/50 border-orange-200/50 dark:border-orange-800/50 hover-scale">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-orange-700 dark:text-orange-300 group-hover:scale-105 transition-transform">1.2K</div>
                <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">Scans Today</div>
              </div>
              <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Cards Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold">Agent Control Center</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Manage and configure your AI detection agents</p>
          </div>
        </div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <MonitoringAgent isActive={activeAgents.monitoring} onToggle={() => toggleAgent("monitoring")} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <DecisionAgent isActive={activeAgents.decision} onToggle={() => toggleAgent("decision")} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <NotificationAgent isActive={activeAgents.notification} onToggle={() => toggleAgent("notification")} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <LearningAgent isActive={activeAgents.learning} onToggle={() => toggleAgent("learning")} />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <ReportingAgent isActive={activeAgents.reporting} onToggle={() => toggleAgent("reporting")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
