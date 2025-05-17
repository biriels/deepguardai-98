
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, ArrowUpRight, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

interface LearningAgentProps {
  isActive: boolean;
}

const LearningAgent = ({ isActive }: LearningAgentProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle>Learning Agent</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Improves detection accuracy over time based on feedback
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isActive ? "default" : "outline"}>
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border rounded-lg p-4">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div>
              <h3 className="font-medium">Model Training Status</h3>
              <p className="text-sm text-muted-foreground">
                Current model: DeepGuard v3.2.1
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" disabled={!isActive}>
                Start Training
              </Button>
              <Button variant="outline" disabled={!isActive}>
                Update Model
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <div>Overall Model Performance</div>
                <div className="font-medium">75%</div>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-3 space-y-2">
                <div className="text-sm font-medium">Video Detection</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">86%</div>
                  <div className="flex items-center text-emerald-600 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+3.2%</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-3 space-y-2">
                <div className="text-sm font-medium">Audio Detection</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">72%</div>
                  <div className="flex items-center text-emerald-600 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+1.7%</span>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-3 space-y-2">
                <div className="text-sm font-medium">Image Detection</div>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">91%</div>
                  <div className="flex items-center text-emerald-600 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>+2.4%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-4">Learning Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between border rounded p-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Auto-Learning</div>
                  <div className="text-xs text-muted-foreground">Automatically improve based on feedback</div>
                </div>
                <Switch checked={isActive} />
              </div>
              
              <div className="flex items-center justify-between border rounded p-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Feedback Collection</div>
                  <div className="text-xs text-muted-foreground">Gather user feedback on detections</div>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between border rounded p-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Daily Model Updates</div>
                  <div className="text-xs text-muted-foreground">Update model parameters daily</div>
                </div>
                <Switch checked={false} />
              </div>
            </div>
            
            <div className="border rounded-md p-4">
              <h4 className="font-medium mb-3">Training Progress</h4>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Processing</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Feature Extraction</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Model Training</span>
                    <span>68%</span>
                  </div>
                  <Progress value={68} className="h-1.5" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Validation</span>
                    <span>0%</span>
                  </div>
                  <Progress value={0} className="h-1.5" />
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground flex items-center justify-between">
                <span>Estimated completion:</span>
                <span>42 minutes</span>
              </div>
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Learning Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-md p-3 flex items-start gap-2">
                <div className="p-1.5 rounded-full bg-amber-100">
                  <Activity className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Model Performance Alert</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    False positive rate for political content has increased by 4.2% over the past week.
                    Recommended action: Review training data for political content.
                  </div>
                </div>
              </div>
              
              <div className="border rounded-md p-3 flex items-start gap-2">
                <div className="p-1.5 rounded-full bg-emerald-100">
                  <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Accuracy Improvement</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Audio deepfake detection accuracy improved by 7.3% after incorporating last month's feedback data.
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default LearningAgent;
