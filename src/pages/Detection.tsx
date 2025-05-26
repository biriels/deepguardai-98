
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Shield, Upload, Link as LinkIcon, AlertTriangle, CheckCircle, Brain, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import DeepfakeModerator from "@/components/Detection/DeepfakeModerator";
import FeedbackButtons from "@/components/Detection/FeedbackButtons";

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
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setAnalyzing(true);
    setProgress(0);
    setResult(null);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke('analyze-url', {
        body: { url },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (response.error) {
        throw new Error(response.error.message || 'Analysis failed');
      }

      setResult(response.data);
      toast({
        title: "Analysis Complete",
        description: `Content analyzed with ${response.data.result.confidence} confidence`
      });

    } catch (error) {
      console.error('URL analysis error:', error);
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
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 85) {
            clearInterval(progressInterval);
            return 85;
          }
          return prev + Math.random() * 12;
        });
      }, 600);

      // Create a temporary URL for the file
      const fileUrl = URL.createObjectURL(file);
      
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await supabase.functions.invoke('deepfake-detection', {
        body: { 
          contentUrl: fileUrl,
          fileName: file.name,
          contentType: file.type
        },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (response.error) {
        throw new Error(response.error.message || 'Detection failed');
      }

      setResult(response.data);
      toast({
        title: "Detection Complete",
        description: `File analyzed in ${response.data.processingTime}ms with ${response.data.result.confidence} confidence`
      });

      // Clean up the temporary URL
      URL.revokeObjectURL(fileUrl);

    } catch (error) {
      console.error('File detection error:', error);
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
      description: "Thank you for your feedback!"
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Brain className="h-8 w-8 text-primary" />
              AI-Powered Deepfake Detection
            </h1>
            <p className="text-muted-foreground mt-2">
              Advanced AI models from Together AI analyze content for authenticity and manipulation
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>Powered by Llama Models</span>
          </div>
        </div>

        <Tabs defaultValue="detection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="detection">AI Detection</TabsTrigger>
            <TabsTrigger value="moderation">Community Moderation</TabsTrigger>
          </TabsList>
          <TabsContent value="detection">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Analyze Content with AI
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="url" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="url">URL Analysis</TabsTrigger>
                    <TabsTrigger value="upload">File Upload</TabsTrigger>
                  </TabsList>
                  <TabsContent value="url" className="space-y-4">
                    <form onSubmit={handleUrlSubmit} className="flex space-x-2">
                      <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="url"
                          placeholder="Enter URL to analyze with AI models..."
                          className="pl-9"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          disabled={analyzing}
                        />
                      </div>
                      <Button type="submit" disabled={analyzing || !url}>
                        {analyzing ? "Analyzing..." : "Analyze with AI"}
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Upload for AI Analysis</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        Upload images, videos, or audio files for deepfake detection using advanced AI models
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
                      <span className="text-sm font-medium">AI Analysis in Progress...</span>
                      <span className="text-sm font-medium">{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Running advanced neural networks for deepfake detection
                    </p>
                  </div>
                )}

                {result && (
                  <div className="mt-6">
                    <Alert className={
                      !result.result.isDeepfake 
                        ? "border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800/30" 
                        : result.result.confidence === "medium"
                        ? "border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800/30"
                        : "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800/30"
                    }>
                      {!result.result.isDeepfake ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <AlertTitle className={
                        !result.result.isDeepfake 
                          ? "text-emerald-800 dark:text-emerald-300"
                          : result.result.confidence === "medium"
                          ? "text-amber-800 dark:text-amber-300"
                          : "text-red-800 dark:text-red-300"
                      }>
                        {!result.result.isDeepfake 
                          ? "Content appears authentic" 
                          : result.result.confidence === "medium"
                          ? "Potential manipulation detected"
                          : "Deepfake/AI content detected"}
                      </AlertTitle>
                      <AlertDescription className={
                        !result.result.isDeepfake 
                          ? "text-emerald-700 dark:text-emerald-400"
                          : result.result.confidence === "medium"
                          ? "text-amber-700 dark:text-amber-400"
                          : "text-red-700 dark:text-red-400"
                      }>
                        AI Confidence: <span className="font-semibold">{result.result.score}%</span> • 
                        Level: <span className="font-semibold capitalize">{result.result.confidence}</span> • 
                        Model: {result.result.details.modelUsed.split('/')[1]}
                      </AlertDescription>
                    </Alert>

                    <div className="mt-4 bg-card border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-3 flex items-center gap-2">
                        <Brain className="h-4 w-4" />
                        AI Analysis Details
                      </h3>
                      <div className="space-y-4">
                        <div className="text-sm">
                          <p className="font-medium mb-2">Detection Analysis:</p>
                          <p className="text-muted-foreground leading-relaxed">
                            {result.result.details.analysis}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-xs text-muted-foreground mb-1">Detection Type</p>
                            <p className="font-medium capitalize">{result.result.details.detectionType.replace('_', ' ')}</p>
                          </div>
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-xs text-muted-foreground mb-1">Processing Time</p>
                            <p className="font-medium">{result.processingTime}ms</p>
                          </div>
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-xs text-muted-foreground mb-1">Artifacts Found</p>
                            <p className="font-medium">{result.result.details.artifacts.length}</p>
                          </div>
                        </div>

                        {result.result.details.artifacts.length > 0 && (
                          <div>
                            <p className="text-xs text-muted-foreground mb-2">Detected Artifacts:</p>
                            <div className="flex flex-wrap gap-1">
                              {result.result.details.artifacts.map((artifact, i) => (
                                <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                  {artifact}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <FeedbackButtons resultId={result.id} onFeedback={handleFeedback} />
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
            <CardTitle>Detection History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  source: "Twitter post",
                  timestamp: "2 hours ago",
                  status: "fake",
                  confidence: 94
                },
                {
                  source: "Instagram image",
                  timestamp: "Yesterday",
                  status: "clean",
                  confidence: 98
                },
                {
                  source: "TikTok video",
                  timestamp: "2 days ago",
                  status: "warning",
                  confidence: 75
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
                    <p className="text-xs">{item.confidence}% confidence</p>
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
