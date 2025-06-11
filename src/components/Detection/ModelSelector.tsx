
/**
 * Model Selector Component for choosing AI detection models
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Shield, Clock } from 'lucide-react';
import { MODEL_PROVIDERS, DetectionModel } from '@/utils/ai/modelProviders';

interface ModelSelectorProps {
  contentType: string;
  onModelsSelected: (modelIds: string[]) => void;
  selectedModels: string[];
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  contentType,
  onModelsSelected,
  selectedModels
}) => {
  const [expandedProviders, setExpandedProviders] = useState<string[]>(['together-ai']);

  const getRelevantModels = (providerId: string): DetectionModel[] => {
    const provider = MODEL_PROVIDERS.find(p => p.id === providerId);
    if (!provider) return [];
    
    return provider.models.filter(model => 
      model.type === contentType || model.type === 'multimodal'
    );
  };

  const handleModelToggle = (modelId: string) => {
    const newSelection = selectedModels.includes(modelId)
      ? selectedModels.filter(id => id !== modelId)
      : [...selectedModels, modelId];
    onModelsSelected(newSelection);
  };

  const getSpeedIcon = (speed: string) => {
    switch (speed) {
      case 'fast': return <Zap className="h-3 w-3 text-green-500" />;
      case 'medium': return <Clock className="h-3 w-3 text-yellow-500" />;
      case 'slow': return <Shield className="h-3 w-3 text-red-500" />;
      default: return null;
    }
  };

  const selectBestModels = () => {
    const allRelevantModels = MODEL_PROVIDERS.flatMap(provider => getRelevantModels(provider.id));
    const bestModels = allRelevantModels
      .sort((a, b) => b.accuracy - a.accuracy)
      .slice(0, 3)
      .map(model => model.id);
    onModelsSelected(bestModels);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Model Selection
          <Badge variant="outline" className="ml-auto">
            {selectedModels.length} selected
          </Badge>
        </CardTitle>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={selectBestModels}
          >
            Select Best Models
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onModelsSelected([])}
          >
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {MODEL_PROVIDERS.map(provider => {
          const relevantModels = getRelevantModels(provider.id);
          if (relevantModels.length === 0) return null;

          return (
            <div key={provider.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="text-sm text-muted-foreground">{provider.description}</p>
                </div>
                <Badge variant="secondary">
                  {relevantModels.length} models
                </Badge>
              </div>
              
              <div className="space-y-2">
                {relevantModels.map(model => (
                  <div key={model.id} className="flex items-center space-x-3 p-2 rounded border">
                    <Checkbox
                      id={model.id}
                      checked={selectedModels.includes(model.id)}
                      onCheckedChange={() => handleModelToggle(model.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <label 
                          htmlFor={model.id} 
                          className="text-sm font-medium cursor-pointer"
                        >
                          {model.name}
                        </label>
                        {getSpeedIcon(model.speed)}
                        <Badge variant="outline" className="text-xs">
                          {model.accuracy}% accuracy
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {model.specialty}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
