
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, Globe, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { enhancedDetectionService } from "@/utils/ai/enhancedDetection";

interface ExtensionPopupProps {
  isCompact?: boolean;
  onClose?: () => void;
}

const ExtensionPopup = ({ isCompact = false, onClose }: ExtensionPopupProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const analyzeCurrentPage = async () => {
    const currentUrl = window.location.href;
    await analyzeUrl(currentUrl);
  };

  const analyzeUrl = async (targetUrl: string) => {
    if (!targetUrl) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const enhancedResult = await enhancedDetectionService.analyzeContentWithMultipleModels(targetUrl);
      setResult(enhancedResult);
      
      toast({
        title: "Analysis Complete",
        description: `Content analyzed with confidence: ${enhancedResult.overallConfidence}%`
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze content",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await analyzeUrl(url);
  };

  const getStatusColor = (confidence: number) => {
    if (confidence >= 70) return 'text-red-500';
    if (confidence >= 40) return 'text-amber-500';
    return 'text-green-500';
  };

  const getStatusIcon = (confidence: number) => {
    if (confidence >= 70) return <AlertTriangle className="h-4 w-4" />;
    if (confidence >= 40) return <Clock className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  return (
    <Card className={`${isCompact ? 'w-80' : 'w-full max-w-md'} shadow-lg`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            DeepGuard Detector
          </div>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose} className="h-6 w-6 p-0">
              ×
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <Button 
            onClick={analyzeCurrentPage}
            disabled={isAnalyzing}
            className="w-full h-8 text-xs"
            size="sm"
          >
            <Globe className="h-3 w-3 mr-2" />
            {isAnalyzing ? "Analyzing..." : "Analyze Current Page"}
          </Button>
          
          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <Input
              type="url"
              placeholder="Enter URL to analyze..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isAnalyzing}
              className="h-8 text-xs"
            />
            <Button 
              type="submit" 
              disabled={isAnalyzing || !url}
              size="sm"
              className="h-8 px-3 text-xs"
            >
              Scan
            </Button>
          </form>
        </div>

        {result && (
          <div className="space-y-2 pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Detection Result:</span>
              <Badge 
                variant={result.overallConfidence >= 70 ? "destructive" : 
                        result.overallConfidence >= 40 ? "secondary" : "default"}
                className="text-xs"
              >
                {result.overallConfidence >= 70 ? "Likely Fake" : 
                 result.overallConfidence >= 40 ? "Suspicious" : "Likely Authentic"}
              </Badge>
            </div>
            
            <div className={`flex items-center gap-2 ${getStatusColor(result.overallConfidence)}`}>
              {getStatusIcon(result.overallConfidence)}
              <span className="text-xs">
                Confidence: {result.overallConfidence}%
              </span>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Analyzed by {result.modelResults.length} AI models
            </div>
            
            {result.overallConfidence >= 40 && (
              <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                ⚠️ This content may contain manipulated or synthetic elements
              </div>
            )}
          </div>
        )}

        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground text-center">
            Powered by AI deepfake detection
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExtensionPopup;
