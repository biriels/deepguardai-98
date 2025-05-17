
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, Check, Sliders } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DecisionAgentProps {
  isActive: boolean;
}

const DecisionAgent: React.FC<DecisionAgentProps> = ({ isActive }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Decision Agent
            </CardTitle>
            <CardDescription>
              Analyzes and classifies detected content
            </CardDescription>
          </div>
          <Badge variant={isActive ? "default" : "outline"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Decision Configuration</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Confidence Threshold</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Auto-block Threshold</span>
              <span className="text-sm font-medium">92%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Review Threshold</span>
              <span className="text-sm font-medium">75%</span>
            </div>
            <Button variant="outline" size="sm" className="w-full flex gap-2">
              <Sliders className="h-4 w-4" />
              <span>Adjust Thresholds</span>
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Recent Decisions</h3>
          <div className="space-y-2">
            {isActive ? (
              <>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Content ID #8723</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Authentic</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Content ID #8721</span>
                  </div>
                  <Badge variant="outline" className="bg-red-50">Deepfake</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Content ID #8720</span>
                  </div>
                  <Badge variant="outline" className="bg-green-50">Authentic</Badge>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-4">
                Agent is currently inactive
              </div>
            )}
          </div>
          <Button variant="link" size="sm" className="mt-2 w-full flex items-center justify-center gap-1">
            <span>View All Decisions</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DecisionAgent;
