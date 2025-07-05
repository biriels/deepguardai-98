
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
    <Card className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 ${
      isActive 
        ? 'border-primary/30 bg-gradient-to-br from-background via-background to-primary/5 shadow-lg' 
        : 'border-border hover:border-border/60 bg-background'
    }`}>
      <CardHeader className="pb-4 relative overflow-hidden">
        {/* Background decoration */}
        {isActive && (
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
        )}
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 relative">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-3 text-lg sm:text-xl">
              <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900 dark:to-amber-900 shadow-sm' 
                  : 'bg-muted group-hover:bg-muted/80'
              }`}>
                <AlertTriangle className={`h-5 w-5 transition-colors duration-300 ${
                  isActive 
                    ? 'text-yellow-600 dark:text-yellow-400' 
                    : 'text-muted-foreground group-hover:text-foreground'
                }`} />
              </div>
              <div>
                <div className="font-bold">Decision Agent</div>
                <div className="text-xs text-muted-foreground font-normal">AI-Powered Classification</div>
              </div>
            </CardTitle>
            <CardDescription className="mt-3 text-sm leading-relaxed">
              Analyzes and classifies detected content with advanced AI-powered decision making algorithms
            </CardDescription>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Badge 
              variant={isActive ? "default" : "outline"}
              className={`px-3 py-1 font-medium transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 dark:from-green-900 dark:to-emerald-900 dark:text-green-200 border-green-200 dark:border-green-800' 
                  : 'hover:bg-muted/50'
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </Badge>
            <Switch 
              checked={isActive} 
              onCheckedChange={onToggle}
              className="data-[state=checked]:bg-primary"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">Decision Configuration</h3>
            <div className="text-xs text-muted-foreground">Real-time Processing</div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/50 text-center hover-scale">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">85%</div>
              <div className="text-xs text-blue-600/70 dark:text-blue-400/70 font-medium mt-1">Confidence</div>
            </div>
            <div className="group bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/50 dark:to-rose-950/50 p-4 rounded-xl border border-red-200/50 dark:border-red-800/50 text-center hover-scale">
              <div className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400 group-hover:scale-105 transition-transform">92%</div>
              <div className="text-xs text-red-600/70 dark:text-red-400/70 font-medium mt-1">Auto-block</div>
            </div>
            <div className="group bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/50 dark:to-amber-950/50 p-4 rounded-xl border border-yellow-200/50 dark:border-yellow-800/50 text-center hover-scale">
              <div className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400 group-hover:scale-105 transition-transform">75%</div>
              <div className="text-xs text-yellow-600/70 dark:text-yellow-400/70 font-medium mt-1">Review</div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex gap-2 hover-scale border-dashed hover:border-solid hover:bg-muted/50" 
            disabled={!isActive}
          >
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
