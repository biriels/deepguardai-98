
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Search, Slider } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider as SliderComponent } from "@/components/ui/slider";

interface DecisionAgentProps {
  isActive: boolean;
}

const DecisionAgent = ({ isActive }: DecisionAgentProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <CardTitle>Decision Agent</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Autonomously analyzes and classifies potential deepfakes
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
          <h3 className="font-medium mb-4">Decision Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">Confidence Threshold</div>
                  <div className="text-sm">75%</div>
                </div>
                <SliderComponent defaultValue={[75]} max={100} step={1} />
                <p className="text-xs text-muted-foreground mt-1">
                  Content above this threshold will be automatically flagged
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm">Auto-Block Threshold</div>
                  <div className="text-sm">90%</div>
                </div>
                <SliderComponent defaultValue={[90]} max={100} step={1} />
                <p className="text-xs text-muted-foreground mt-1">
                  Content above this threshold will be automatically blocked
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between border rounded p-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Automatic Decisions</div>
                  <div className="text-xs text-muted-foreground">Apply decisions without human review</div>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between border rounded p-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Human-in-the-loop</div>
                  <div className="text-xs text-muted-foreground">Require review for borderline cases</div>
                </div>
                <Switch checked={true} />
              </div>
              
              <div className="flex items-center justify-between border rounded p-3">
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Contextual Analysis</div>
                  <div className="text-xs text-muted-foreground">Consider source credibility in decisions</div>
                </div>
                <Switch checked={false} />
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">Pending (12)</TabsTrigger>
            <TabsTrigger value="processed">Processed (54)</TabsTrigger>
            <TabsTrigger value="review">Needs Review (8)</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search pending content..." className="pl-9" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
            
            <div className="space-y-4">
              {[
                { id: 1, title: "Political speech video", confidence: 82, source: "Twitter", time: "5 min ago" },
                { id: 2, title: "Celebrity interview clip", confidence: 76, source: "YouTube", time: "12 min ago" },
                { id: 3, title: "News anchor footage", confidence: 94, source: "News Site", time: "18 min ago" }
              ].map((item) => (
                <div key={item.id} className="border rounded-md p-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Source: {item.source}</span>
                        <span>•</span>
                        <span>{item.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={item.confidence > 90 ? "destructive" : "default"}>
                        {item.confidence}% Confidence
                      </Badge>
                      <Button size="sm" variant="outline">Review</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="processed">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">Processed Content</h3>
              <p className="text-muted-foreground">View content that has been analyzed and decided upon</p>
            </div>
          </TabsContent>
          
          <TabsContent value="review">
            <div className="text-center py-8">
              <h3 className="text-lg font-medium mb-2">Content Needing Review</h3>
              <p className="text-muted-foreground">Review content that the agent couldn't confidently classify</p>
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Decision Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-muted rounded p-4 text-center">
                <div className="text-2xl font-bold">78%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </div>
              <div className="bg-muted rounded p-4 text-center">
                <div className="text-2xl font-bold">842</div>
                <div className="text-sm text-muted-foreground">Processed</div>
              </div>
              <div className="bg-muted rounded p-4 text-center">
                <div className="text-2xl font-bold">124</div>
                <div className="text-sm text-muted-foreground">Flagged</div>
              </div>
              <div className="bg-muted rounded p-4 text-center">
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm text-muted-foreground">Blocked</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default DecisionAgent;
