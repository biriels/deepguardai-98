
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Bell, BarChart3, Brain, Eye, MicVocal, UserCheck, Scan, Calculator, Plus, ChevronRight, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerTrigger } from "@/components/ui/drawer";

// Define agent template type
interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  complexity: string;
  category: string;
  role: string;
}

// Define parameters interface for type safety
interface AgentParameters {
  threshold: number;
  mode: string;
  platforms: string[];
  capabilities: string[];
  response: string;
  learningMode?: string;
}

// Define agent configuration interface
interface AgentConfig {
  name: string;
  description: string;
  parameters: AgentParameters;
}

// Specialized deepfake detection agent templates
const agentTemplates: AgentTemplate[] = [
  {
    id: "vision-sentinel",
    name: "VisionSentinel",
    description: "Real-time video deepfake detection for social media and platforms",
    icon: Eye,
    complexity: "High",
    category: "Detection",
    role: "Sentinel + Executor"
  },
  {
    id: "face-verifier",
    name: "FaceVerifier",
    description: "Detect synthetic faces and AI-generated avatars used in fake profiles",
    icon: UserCheck,
    complexity: "Medium",
    category: "Analysis",
    role: "Analyst"
  },
  {
    id: "voice-guard",
    name: "VoiceGuard",
    description: "Detect cloned voices and synthetic audio in submitted content",
    icon: MicVocal,
    complexity: "High",
    category: "Detection",
    role: "Sentinel"
  },
  {
    id: "clone-hunter",
    name: "CloneHunter",
    description: "Track and identify reused deepfakes across multiple platforms",
    icon: Scan,
    complexity: "Very High",
    category: "Investigation",
    role: "Planner + Investigator"
  },
  {
    id: "risk-ranker",
    name: "RiskRanker",
    description: "Evaluate content and assign a deepfake risk score for moderation",
    icon: Calculator,
    complexity: "Medium",
    category: "Advisory",
    role: "Advisor"
  },
  {
    id: "live-check",
    name: "LiveCheck",
    description: "Real user verification via liveness detection challenges",
    icon: Shield,
    complexity: "Medium",
    category: "Verification",
    role: "Guardian"
  }
];

interface AgentBuilderProps {
  onAgentCreated?: (agentName: string) => void;
}

const AgentBuilder: React.FC<AgentBuilderProps> = ({ onAgentCreated }) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "configure">("select");
  const [agentConfig, setAgentConfig] = useState<AgentConfig>({
    name: "",
    description: "",
    parameters: {
      threshold: 75,
      mode: "Real-time Scanning",
      platforms: ["YouTube", "Instagram", "TikTok"],
      capabilities: ["Face Manipulation", "Lip Sync"],
      response: "Flag for Review"
    }
  });
  const [showPreview, setShowPreview] = useState(false);
  const [isTestingMode, setIsTestingMode] = useState(false);
  const [advancedModeOpen, setAdvancedModeOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<"basic" | "detection" | "response" | "learning">("basic");
  const [testResults, setTestResults] = useState<null | {success: boolean, score: number, message: string}>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleCreateFromTemplate = () => {
    if (!selectedTemplate) return;
    
    const template = agentTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;
    
    setAgentConfig({
      name: template.name,
      description: template.description,
      parameters: {
        threshold: 75,
        mode: "Real-time Scanning",
        platforms: ["YouTube", "Instagram", "TikTok", "Twitter", "LinkedIn"],
        capabilities: [
          "Face Manipulation", "Lip Sync", "Voice Cloning", 
          "Full Body Synthesis", "Background Manipulation", "Advanced Model Recognition"
        ],
        response: "Flag for Review"
      }
    });
    
    setStep("configure");
    
    toast({
      title: "Agent Template Selected",
      description: `Building new ${template.name}. Customize in the configuration panel.`,
    });
  };

  const handleCustomAgent = () => {
    setAgentConfig({
      name: "Custom Agent",
      description: "A fully customized deepfake detection agent",
      parameters: {
        threshold: 50,
        mode: "Batch Processing",
        platforms: ["YouTube"],
        capabilities: ["Face Manipulation"],
        response: "Flag for Review"
      }
    });
    setStep("configure");
  };

  const handleFinishConfiguration = () => {
    // In a real application, this would create an actual agent instance
    toast({
      title: "Agent Successfully Created",
      description: `${agentConfig.name} is now ready for deployment.`,
    });
    
    // Notify parent component if needed
    if (onAgentCreated) {
      onAgentCreated(agentConfig.name);
    }
    
    // Reset state
    setStep("select");
    setSelectedTemplate(null);
    setAgentConfig({
      name: "",
      description: "",
      parameters: {
        threshold: 75,
        mode: "Real-time Scanning",
        platforms: [],
        capabilities: [],
        response: "Flag for Review"
      }
    });
    setShowPreview(false);
    setIsTestingMode(false);
    setTestResults(null);
  };

  const updateParameter = (key: keyof AgentParameters, value: any) => {
    setAgentConfig(prev => ({
      ...prev,
      parameters: {
        ...prev.parameters,
        [key]: value
      }
    }));
  };

  const handleTestAgent = () => {
    setIsTestingMode(true);
    // Simulate testing process
    setTimeout(() => {
      const randomScore = Math.floor(Math.random() * 30) + 70; // Score between 70-100
      setTestResults({
        success: randomScore > 80,
        score: randomScore,
        message: randomScore > 80 
          ? "Agent successfully detected deepfake content in test samples" 
          : "Agent needs improvements to better detect certain types of deepfakes"
      });
      setIsTestingMode(false);
    }, 2000);
  };

  const toggleAdvancedMode = () => {
    setAdvancedModeOpen(!advancedModeOpen);
  };

  const handleUpdateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgentConfig(prev => ({
      ...prev,
      name: e.target.value
    }));
  };

  const handleUpdateDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgentConfig(prev => ({
      ...prev,
      description: e.target.value
    }));
  };

  const renderPreview = () => {
    if (!showPreview) return null;
    
    const template = agentTemplates.find(t => t.id === selectedTemplate);
    if (!template && selectedTemplate !== null) return null;
    
    const Icon = template ? template.icon : Brain;
    
    return (
      <Card className="border-dashed border-2 border-primary/40 bg-background/80">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Icon className="h-8 w-8 text-primary" />
            <Badge variant="outline">{agentConfig.parameters.threshold}% Threshold</Badge>
          </div>
          <CardTitle>{agentConfig.name}</CardTitle>
          <CardDescription>{agentConfig.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mode:</span>
              <span className="font-medium">{agentConfig.parameters.mode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Platforms:</span>
              <span className="font-medium">{agentConfig.parameters.platforms.length} configured</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Detection capabilities:</span>
              <span className="font-medium">{agentConfig.parameters.capabilities.length} enabled</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Response action:</span>
              <span className="font-medium">{agentConfig.parameters.response}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {step === "select" ? (
        <>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Build Your DeepGuard Agent</h2>
            <p className="text-muted-foreground">
              Select a specialized deepfake detection agent template or build a custom agent
            </p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {agentTemplates.map(template => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <template.icon className="h-8 w-8 text-primary" />
                    <Badge variant="outline" className="bg-primary/10">
                      {template.complexity}
                    </Badge>
                  </div>
                  <CardTitle className="mt-2">{template.name}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-secondary/10">
                        {template.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Role: {template.role}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}

            <Card 
              className="cursor-pointer transition-all hover:shadow-md border-dashed flex flex-col justify-center items-center py-8"
              onClick={handleCustomAgent}
            >
              <Brain className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg mb-2">Custom Agent</h3>
              <p className="text-sm text-muted-foreground text-center px-4">
                Build a completely custom deepfake detection agent with your own specifications
              </p>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button 
              onClick={handleCreateFromTemplate} 
              disabled={!selectedTemplate}
            >
              Continue with Template
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Configure {agentConfig.name}</h2>
            <p className="text-muted-foreground">
              Adjust parameters and settings for your deepfake detection agent
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Configuration</CardTitle>
                  <CardDescription>Fine-tune how this agent will detect deepfakes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="agent-name">Agent Name</Label>
                      <Input 
                        id="agent-name" 
                        value={agentConfig.name}
                        onChange={handleUpdateName}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="agent-description">Description</Label>
                      <Input 
                        id="agent-description" 
                        value={agentConfig.description}
                        onChange={handleUpdateDescription}
                      />
                    </div>
                  </div>
                  
                  <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)}>
                    <TabsList className="grid grid-cols-4 mb-4">
                      <TabsTrigger value="basic">Basic Settings</TabsTrigger>
                      <TabsTrigger value="detection">Detection</TabsTrigger>
                      <TabsTrigger value="response">Response</TabsTrigger>
                      <TabsTrigger value="learning">Learning</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Detection Threshold</Label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={agentConfig.parameters.threshold}
                            onChange={(e) => updateParameter('threshold', parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">{agentConfig.parameters.threshold}%</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Set confidence threshold for deepfake detection alerts
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="processing-mode">Processing Mode</Label>
                        <select 
                          id="processing-mode"
                          className="w-full p-2 border rounded-md"
                          value={agentConfig.parameters.mode}
                          onChange={(e) => updateParameter('mode', e.target.value)}
                        >
                          <option>Real-time Scanning</option>
                          <option>Batch Processing</option>
                          <option>Hybrid Mode</option>
                        </select>
                        <p className="text-xs text-muted-foreground">
                          How the agent will process media for detection
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="detection" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Target Platforms</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {["YouTube", "Instagram", "TikTok", "Twitter", "LinkedIn", "Custom"].map(platform => (
                            <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="rounded border-gray-300"
                                checked={agentConfig.parameters.platforms.includes(platform)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    updateParameter('platforms', [...agentConfig.parameters.platforms, platform]);
                                  } else {
                                    updateParameter('platforms', agentConfig.parameters.platforms.filter(p => p !== platform));
                                  }
                                }}
                              />
                              <span>{platform}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Detection Capabilities</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "Face Manipulation", "Lip Sync", "Voice Cloning", 
                            "Full Body Synthesis", "Background Manipulation", "Advanced Model Recognition"
                          ].map(capability => (
                            <label key={capability} className="flex items-center space-x-2 cursor-pointer">
                              <input 
                                type="checkbox"
                                className="rounded border-gray-300"
                                checked={agentConfig.parameters.capabilities.includes(capability)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    updateParameter('capabilities', [...agentConfig.parameters.capabilities, capability]);
                                  } else {
                                    updateParameter('capabilities', agentConfig.parameters.capabilities.filter(c => c !== capability));
                                  }
                                }}
                              />
                              <span>{capability}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="response" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="auto-response">Auto-Response Actions</Label>
                        <select 
                          id="auto-response"
                          className="w-full p-2 border rounded-md"
                          value={agentConfig.parameters.response}
                          onChange={(e) => updateParameter('response', e.target.value)}
                        >
                          <option>Flag for Review</option>
                          <option>Immediate Blocking</option>
                          <option>Warning Label</option>
                          <option>Custom Response Flow</option>
                        </select>
                      </div>
                      
                      <div className="pt-2">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={toggleAdvancedMode}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Advanced Response Configuration
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="learning" className="space-y-4">
                      <div className="space-y-2">
                        <Label>Learning Mode</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {["Active Learning", "Feedback-based Adaptation", "Manual Updates", "No Learning"].map(mode => (
                            <label key={mode} className="flex items-center space-x-2 cursor-pointer">
                              <input 
                                type="radio" 
                                name="learning-mode"
                                className="rounded border-gray-300"
                                checked={agentConfig.parameters.learningMode === mode}
                                onChange={() => updateParameter('learningMode', mode)}
                              />
                              <span>{mode}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          How the agent will improve over time
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-2 justify-between border-t pt-6">
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep("select")}>
                      Back to Templates
                    </Button>
                    <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
                      {showPreview ? "Hide Preview" : "Show Preview"}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleTestAgent} disabled={isTestingMode}>
                      {isTestingMode ? "Testing..." : "Test Agent"}
                    </Button>
                    <Button onClick={handleFinishConfiguration}>
                      Create Agent
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              
              {testResults && (
                <Card className={`border-2 ${testResults.success ? 'border-green-500' : 'border-amber-500'}`}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {testResults.success ? (
                        <><Shield className="mr-2 h-5 w-5 text-green-500" /> Test Successful</>
                      ) : (
                        <><Activity className="mr-2 h-5 w-5 text-amber-500" /> Test Completed</>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Detection accuracy score: <strong>{testResults.score}%</strong>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{testResults.message}</p>
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div>
              {/* Agent preview card */}
              {renderPreview()}
              
              {showPreview && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base">Performance Estimate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Detection Accuracy</span>
                          <span>{75 + Math.min(15, (agentConfig.parameters.threshold - 50) / 3)}%</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: `${75 + Math.min(15, (agentConfig.parameters.threshold - 50) / 3)}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Processing Speed</span>
                          <span>{agentConfig.parameters.mode === "Real-time Scanning" ? "High" : 
                                 agentConfig.parameters.mode === "Batch Processing" ? "Very High" : "Medium"}</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: agentConfig.parameters.mode === "Real-time Scanning" ? "75%" : 
                                          agentConfig.parameters.mode === "Batch Processing" ? "90%" : "60%" }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>False Positive Rate</span>
                          <span>{agentConfig.parameters.threshold > 80 ? "Low" : 
                                 agentConfig.parameters.threshold > 60 ? "Medium" : "High"}</span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: agentConfig.parameters.threshold > 80 ? "25%" : 
                                          agentConfig.parameters.threshold > 60 ? "50%" : "75%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Advanced configuration drawer */}
      <Drawer open={advancedModeOpen} onOpenChange={setAdvancedModeOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Advanced Response Configuration</DrawerTitle>
            <DrawerDescription>
              Configure detailed response actions for different types of detected deepfakes
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Face Manipulation Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <select className="w-full p-2 border rounded-md">
                    <option>Immediate Blocking</option>
                    <option>Warning Label</option>
                    <option>Flag for Review</option>
                  </select>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Voice Cloning Response</CardTitle>
                </CardHeader>
                <CardContent>
                  <select className="w-full p-2 border rounded-md">
                    <option>Flag for Review</option>
                    <option>Immediate Blocking</option>
                    <option>Warning Label</option>
                  </select>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Email Alerts</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Dashboard Notifications</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span>API Webhooks</span>
                    </label>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Custom Metadata</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input placeholder="Key=Value, separate with commas" />
                </CardContent>
              </Card>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => setAdvancedModeOpen(false)}>
              Save Advanced Configuration
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AgentBuilder;
