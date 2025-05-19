
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Bell, BarChart3, Brain, Eye, MicVocal, UserCheck, Scan, Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

// Specialized deepfake detection agent templates
const agentTemplates = [
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
  const [agentConfig, setAgentConfig] = useState({
    name: "",
    description: "",
    parameters: {}
  });

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
      parameters: {}
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
      parameters: {}
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
      parameters: {}
    });
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
                    <div className="flex items-center gap-2 mb-1">
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

          <Card>
            <CardHeader>
              <CardTitle>Agent Configuration</CardTitle>
              <CardDescription>Fine-tune how this agent will detect deepfakes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Detection Threshold</label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      defaultValue="75" 
                      className="flex-1"
                    />
                    <span className="text-sm font-medium">75%</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Set confidence threshold for deepfake detection alerts
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Processing Mode</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Real-time Scanning</option>
                    <option>Batch Processing</option>
                    <option>Hybrid Mode</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    How the agent will process media for detection
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Target Platforms</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["YouTube", "Instagram", "TikTok", "Twitter", "LinkedIn", "Custom"].map(platform => (
                    <label key={platform} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked={platform !== "Custom"} />
                      <span>{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Detection Capabilities</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Face Manipulation", "Lip Sync", "Voice Cloning", 
                    "Full Body Synthesis", "Background Manipulation", "Advanced Model Recognition"
                  ].map(capability => (
                    <label key={capability} className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                      <span>{capability}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Auto-Response Actions</label>
                <select className="w-full p-2 border rounded-md">
                  <option>Flag for Review</option>
                  <option>Immediate Blocking</option>
                  <option>Warning Label</option>
                  <option>Custom Response Flow</option>
                </select>
              </div>
              
            </CardContent>
          </Card>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep("select")}>
              Back to Templates
            </Button>
            <Button onClick={handleFinishConfiguration}>
              Create Agent
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentBuilder;
