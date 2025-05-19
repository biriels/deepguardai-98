
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Bell, BarChart3, Brain, Settings, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample agent templates for users to select from
const agentTemplates = [
  {
    id: "template-1",
    name: "Content Verification Agent",
    description: "Detects manipulated media by analyzing metadata and visual inconsistencies",
    icon: Shield,
    complexity: "Medium",
    category: "Detection"
  },
  {
    id: "template-2",
    name: "Social Media Monitor",
    description: "Tracks and reports potential deepfakes across social platforms",
    icon: Activity,
    complexity: "High",
    category: "Monitoring"
  },
  {
    id: "template-3",
    name: "Alert Agent",
    description: "Sends notifications when suspicious content is detected",
    icon: Bell,
    complexity: "Low",
    category: "Notification"
  }
];

interface AgentBuilderProps {
  onAgentCreated?: (agentName: string) => void;
}

const AgentBuilder: React.FC<AgentBuilderProps> = ({ onAgentCreated }) => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleCreateFromTemplate = () => {
    if (!selectedTemplate) return;
    
    const template = agentTemplates.find(t => t.id === selectedTemplate);
    if (!template) return;
    
    // In a real application, this would create an actual agent instance
    toast({
      title: "Agent Template Selected",
      description: `Building new ${template.name}. Please customize in the next step.`,
    });
    
    // Notify parent component if needed
    if (onAgentCreated) {
      onAgentCreated(template.name);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Build Your Custom Agent</h2>
        <p className="text-muted-foreground">
          Select a template to get started or build a completely custom agent from scratch
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        {agentTemplates.map(template => (
          <Card 
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-md ${selectedTemplate === template.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => handleSelectTemplate(template.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <template.icon className="h-8 w-8 text-primary" />
                <Badge>{template.complexity}</Badge>
              </div>
              <CardTitle className="mt-2">{template.name}</CardTitle>
              <CardDescription>{template.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardContent>
          </Card>
        ))}

        <Card className="cursor-pointer transition-all hover:shadow-md border-dashed flex flex-col justify-center items-center py-8">
          <Plus className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="font-medium text-lg mb-2">Custom Agent</h3>
          <p className="text-sm text-muted-foreground text-center px-4">
            Build a completely custom agent with your own specifications
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
    </div>
  );
};

// Add missing Badge import
import { Badge } from "@/components/ui/badge";

export default AgentBuilder;
