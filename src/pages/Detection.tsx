
import React, { useState } from "react";
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Shield, Upload, Link as LinkIcon, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DeepfakeModerator from "@/components/Detection/DeepfakeModerator";

const Detection = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<null | {
    status: "clean" | "warning" | "fake";
    confidence: number;
    details: string;
  }>(null);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setAnalyzing(true);
    setProgress(0);
    setResult(null);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          // Mock result
          setResult({
            status: Math.random() > 0.5 ? "fake" : Math.random() > 0.5 ? "warning" : "clean",
            confidence: Math.floor(Math.random() * 30) + 70,
            details: "AI-generated content detected in media elements."
          });
          toast({
            title: "Analysis Complete",
            description: "Content has been analyzed for authenticity."
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setAnalyzing(true);
    setProgress(0);
    setResult(null);
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          // Mock result
          setResult({
            status: Math.random() > 0.6 ? "fake" : Math.random() > 0.5 ? "warning" : "clean",
            confidence: Math.floor(Math.random() * 30) + 70,
            details: "Deepfake detection confirmed with high confidence."
          });
          toast({
            title: "Analysis Complete",
            description: "Content has been analyzed for authenticity."
          });
          return 100;
        }
        return prev + 4;
      });
    }, 150);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deepfake Detection</h1>
          <p className="text-muted-foreground mt-2">
            Analyze content from URLs or upload files to detect potential deepfakes
          </p>
        </div>

        <Tabs defaultValue="detection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="detection">Manual Detection</TabsTrigger>
            <TabsTrigger value="moderation">Community Moderation</TabsTrigger>
          </TabsList>
          <TabsContent value="detection">
            <Card>
              <CardHeader>
                <CardTitle>Analyze Content</CardTitle>
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
                          placeholder="Enter URL to analyze (social media post, article, etc.)"
                          className="pl-9"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          disabled={analyzing}
                        />
                      </div>
                      <Button type="submit" disabled={analyzing || !url}>
                        Analyze
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="upload" className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Upload file for analysis</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-4">
                        Drag and drop or click to upload images or videos to analyze
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
                          Select File
                        </label>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>

                {analyzing && (
                  <div className="mt-6 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Analyzing content...</span>
                      <span className="text-sm font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Running multi-layer deepfake detection analysis
                    </p>
                  </div>
                )}

                {result && (
                  <div className="mt-6">
                    <Alert className={
                      result.status === "clean" 
                        ? "border-emerald-200 bg-emerald-50 dark:bg-emerald-900/20 dark:border-emerald-800/30" 
                        : result.status === "warning"
                        ? "border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800/30"
                        : "border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800/30"
                    }>
                      {result.status === "clean" ? (
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      ) : result.status === "warning" ? (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                      )}
                      <AlertTitle className={
                        result.status === "clean" 
                          ? "text-emerald-800 dark:text-emerald-300"
                          : result.status === "warning"
                          ? "text-amber-800 dark:text-amber-300"
                          : "text-red-800 dark:text-red-300"
                      }>
                        {result.status === "clean" 
                          ? "Content appears authentic" 
                          : result.status === "warning"
                          ? "Content requires review"
                          : "Potential deepfake detected"}
                      </AlertTitle>
                      <AlertDescription className={
                        result.status === "clean" 
                          ? "text-emerald-700 dark:text-emerald-400"
                          : result.status === "warning"
                          ? "text-amber-700 dark:text-amber-400"
                          : "text-red-700 dark:text-red-400"
                      }>
                        {result.details} Confidence level: <span className="font-semibold">{result.confidence}%</span>
                      </AlertDescription>
                    </Alert>

                    <div className="mt-4 bg-card border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-2">Detailed Analysis</h3>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-xs text-muted-foreground mb-1">Face Manipulation</p>
                            <p className="font-medium">{Math.floor(Math.random() * 20) + 80}% Confidence</p>
                          </div>
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-xs text-muted-foreground mb-1">Voice Synthesis</p>
                            <p className="font-medium">{Math.floor(Math.random() * 30) + 70}% Confidence</p>
                          </div>
                          <div className="bg-background p-3 rounded-md">
                            <p className="text-xs text-muted-foreground mb-1">Content Authenticity</p>
                            <p className="font-medium">{Math.floor(Math.random() * 40) + 60}% Confidence</p>
                          </div>
                        </div>
                      </div>
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
