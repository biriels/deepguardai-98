
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Check, Sliders } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface DecisionAgentProps {
  isActive: boolean;
  onToggle: () => void;
}

const DecisionAgent: React.FC<DecisionAgentProps> = ({ isActive, onToggle }) => {
  return (
    <Card className={`transition-all duration-300 hover:shadow-lg ${isActive ? 'ring-2 ring-primary/20 bg-gradient-to-br from-background to-muted/30' : ''}`}>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className={`p-2 rounded-lg ${isActive ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-muted'}`}>
                <AlertTriangle className={`h-5 w-5 ${isActive ? 'text-yellow-600 dark:text-yellow-400' : 'text-muted-foreground'}`} />
              </div>
              Decision Agent
            </CardTitle>
            <CardDescription className="mt-2">
              Analyzes and classifies detected content with AI-powered decision making
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Badge 
              variant={isActive ? "default" : "outline"} 
              className={`${isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}`}
            >
              {isActive ? "Active" : "Inactive"}
            </Badge>
            <Switch checked={isActive} onCheckedChange={onToggle} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Decision Configuration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <div className="text-lg font-semibold text-primary">85%</div>
              <div className="text-xs text-muted-foreground">Confidence</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <div className="text-lg font-semibold text-destructive">92%</div>
              <div className="text-xs text-muted-foreground">Auto-block</div>
            </div>
            <div className="bg-muted/50 p-3 rounded-lg text-center">
              <div className="text-lg font-semibold text-yellow-600">75%</div>
              <div className="text-xs text-muted-foreground">Review</div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full flex gap-2" disabled={!isActive}>
            <Sliders className="h-4 w-4" />
            <span>Adjust Thresholds</span>
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Recent Decisions</h3>
          <div className="space-y-3">
            {isActive ? (
              <>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-green-100 dark:bg-green-900 rounded">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium">Content #8723</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300">
                    Authentic
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-red-100 dark:bg-red-900 rounded">
                      <AlertTriangle className="h-3 w-3 text-red-600 dark:text-red-400" />
                    </div>
                    <span className="text-sm font-medium">Content #8721</span>
                  </div>
                  <Badge variant="outline" className="bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300">
                    Deepfake
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="p-1 bg-green-100 dark:bg-green-900 rounded">
                      <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-sm font-medium">Content #8720</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300">
                    Authentic
                  </Badge>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-8 bg-muted/30 rounded-lg">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Agent is currently inactive</p>
              </div>
            )}
          </div>
          <Button variant="link" size="sm" className="w-full flex items-center justify-center gap-2 mt-4" disabled={!isActive}>
            <span>View All Decisions</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DecisionAgent;
