import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Shield, Upload, Link as LinkIcon, Brain, Zap, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DeepfakeModerator from "@/components/Detection/DeepfakeModerator";
import FeedbackButtons from "@/components/Detection/FeedbackButtons";
import { ModelSelector } from "@/components/Detection/ModelSelector";
import { DetailedResults } from "@/components/Detection/DetailedResults";
import { 
  enhancedDetectionService, 
  EnhancedDetectionResult 
} from "@/utils/ai/enhancedDetection";

interface DetectionResult {
  id: string;
  result: {
    score: number;
    isDeepfake: boolean;
    confidence: string;
    details: {
      analysis: string;
      detectionType: string;
      modelUsed: string;
      artifacts: string[];
      [key: string]: any;
    };
  };
  processingTime: number;
}

const Detection = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<EnhancedDetectionResult | null>(null);
  const [selectedModels, setSelectedModels] = useState<string[]>([
    'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo'
  ]);
  const [contentType, setContentType] = useState('text');
  const [showModelSelector, setShowModelSelector] = useState(false);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setAnalyzing(true);
    setProgress(0);
    setResult(null);
    setContentType('text');
    
    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const enhancedResult = await enhancedDetectionService.analyzeContentWithMultipleModels(
        url, 
        selectedModels.length > 0 ? selectedModels : undefined
      );

      clearInterval(progressInterval);
      setProgress(100);

      setResult(enhancedResult);
      toast({
        title: "Enhanced Analysis Complete",
        description: `Content analyzed with ${enhancedResult.modelResults.length} AI models`
      });

    } catch (error) {
      console.error('Enhanced URL analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze URL",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const file = e.target.files[0];
    setAnalyzing(true);
    setProgress(0);
    setResult(null);
    
    // Determine content type
    const fileContentType = file.type.startsWith('image/') ? 'image' : 
      file.type.startsWith('video/') ? 'video' :
      file.type.startsWith('audio/') ? 'audio' : 'text';
    
    setContentType(fileContentType);
    
    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + Math.random() * 12;
        });
      }, 600);

      const enhancedResult = await enhancedDetectionService.analyzeContentWithMultipleModels(
        file, 
        selectedModels.length > 0 ? selectedModels : undefined
      );

      clearInterval(progressInterval);
      setProgress(100);

      setResult(enhancedResult);
      toast({
        title: "Enhanced Detection Complete",
        description: `File analyzed with ${enhancedResult.modelResults.length} AI models in ${enhancedResult.processingTime}ms`
      });

    } catch (error) {
      console.error('Enhanced file detection error:', error);
      toast({
        title: "Detection Failed",
        description: error instanceof Error ? error.message : "Failed to analyze file",
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleFeedback = (type: "like" | "dislike") => {
    console.log(`Feedback received: ${type} for result ID: ${result?.id}`);
    toast({
      title: "Feedback Recorded",
      description: "Thank you for helping improve our AI models!"
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="h-6 h-6 sm:h-8 sm:w-8 text-primary" />
              Enhanced AI Deepfake Detection
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Multi-model ensemble analysis with detailed forensic insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowModelSelector(!showModelSelector)}
            >
              <Settings className="h-4 w-4 mr-2" />
              Configure Models
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Multi-AI Powered</span>
            </div>
          </div>
        </div>

        {showModelSelector && (
          <ModelSelector
            contentType={contentType}
            selectedModels={selectedModels}
            onModelsSelected={setSelectedModels}
          />
        )}

        <Tabs defaultValue="detection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="detection">Enhanced AI Detection</TabsTrigger>
            <TabsTrigger value="moderation">Community Moderation</TabsTrigger>
          </TabsList>
          <TabsContent value="detection">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Shield className="h-5 w-5" />
                  Multi-Model AI Analysis
                  {selectedModels.length > 0 && (
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      ({selectedModels.length} models selected)
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="url">URL Analysis</TabsTrigger>
                    <TabsTrigger value="upload">File Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="space-y-4">
                    <form onSubmit={handleUrlSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="url"
                          placeholder="Enter URL for enhanced multi-model analysis..."
                          className="pl-9"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          disabled={analyzing}
                        />
                      </div>
                      <Button type="submit" disabled={analyzing || !url} className="w-full sm:w-auto">
                        {analyzing ? "Analyzing..." : "Enhanced Analysis"}
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center">
                      <Upload className="h-8 h-8 sm:h-10 sm:w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Enhanced Multi-Model Analysis</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        Upload files for comprehensive deepfake detection with detailed forensic analysis
                      </p>
                      <Input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept="image/*,video/*,audio/*"
                        onChange={handleFileUpload}
                        disabled={analyzing}
                      />
                      <Button asChild disabled={analyzing}>
                        <label htmlFor="file-upload" className="cursor-pointer">
                          {analyzing ? "Processing..." : "Select File"}
                        </label>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {analyzing && (
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Running enhanced AI analysis with {selectedModels.length || 'multiple'} models...
                      </span>
                      <span className="text-sm font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Processing with ensemble of specialized deepfake detection models
                    </p>
                  </div>
                )}

                {result && (
                  <div className="mt-6">
                    <DetailedResults result={result} />
                    <div className="mt-4">
                      <FeedbackButtons resultId={result.id} onFeedback={handleFeedback} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="moderation">
            <DeepfakeModerator />
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Enhanced Detection History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  source: "Twitter post",
                  timestamp: "2 hours ago",
                  status: "fake",
                  confidence: 94,
                  models: 3
                },
                {
                  source: "Instagram image",
                  timestamp: "Yesterday",
                  status: "clean",
                  confidence: 98,
                  models: 4
                },
                {
                  source: "TikTok video",
                  timestamp: "2 days ago",
                  status: "warning",
                  confidence: 75,
                  models: 2
                }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border-b last:border-0">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === "clean" ? "bg-emerald-500" :
                    item.status === "warning" ? "bg-amber-500" : "bg-red-500"
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium">{item.source}</p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${
                      item.status === "clean" ? "text-emerald-500" :
                      item.status === "warning" ? "text-amber-500" : "text-red-500"
                    }`}>
                      {item.status === "clean" ? "Authentic" : 
                       item.status === "warning" ? "Suspicious" : "Deepfake"}
                    </p>
                    <p className="text-xs">{item.confidence}% • {item.models} models</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Detection;
