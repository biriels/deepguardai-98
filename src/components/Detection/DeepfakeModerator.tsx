
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, AlertTriangle, CheckCircle, Flag, Video, Image as ImageIcon, AudioLines } from "lucide-react";

// Sample data for demo purposes
const pendingItems = [
  {
    id: "vid-1",
    type: "video",
    title: "Campaign Interview",
    source: "Social Media Upload",
    timestamp: "10 minutes ago",
    confidence: 87,
    status: "pending",
  },
  {
    id: "aud-1",
    type: "audio",
    title: "Radio Interview Clip",
    source: "News Blog",
    timestamp: "25 minutes ago",
    confidence: 92,
    status: "pending",
  },
  {
    id: "img-1",
    type: "image",
    title: "Profile Photo",
    source: "Dating App",
    timestamp: "1 hour ago",
    confidence: 78,
    status: "pending",
  },
];

const processedItems = [
  {
    id: "vid-2",
    type: "video",
    title: "Conference Speech",
    source: "Social Media Upload",
    timestamp: "2 hours ago",
    confidence: 96,
    status: "rejected",
    reviewedBy: "AI + Manual"
  },
  {
    id: "img-2", 
    type: "image",
    title: "Landscape Photo",
    source: "Art Platform", 
    timestamp: "3 hours ago",
    confidence: 32,
    status: "approved",
    reviewedBy: "AI"
  },
  {
    id: "aud-2",
    type: "audio", 
    title: "Interview Snippet",
    source: "Podcast Platform",
    timestamp: "5 hours ago", 
    confidence: 88,
    status: "flagged",
    reviewedBy: "AI + Manual"
  },
];

type ContentStatus = "pending" | "approved" | "rejected" | "flagged";

interface ContentItem {
  id: string;
  type: "video" | "audio" | "image";
  title: string;
  source: string;
  timestamp: string;
  confidence: number;
  status: ContentStatus;
  reviewedBy?: string;
}

const DeepfakeModerator = () => {
  const { toast } = useToast();
  const [autoModeration, setAutoModeration] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(75);
  const [queue, setQueue] = useState<ContentItem[]>(pendingItems);
  const [processed, setProcessed] = useState<ContentItem[]>(processedItems);

  const handleAction = (id: string, action: "approve" | "reject" | "flag") => {
    const item = queue.find(item => item.id === id);
    if (!item) return;

    const updatedItem: ContentItem = {
      ...item,
      status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "flagged",
      reviewedBy: "Manual"
    };

    setQueue(queue.filter(item => item.id !== id));
    setProcessed([updatedItem, ...processed]);

    toast({
      title: `Content ${action === "approve" ? "Approved" : action === "reject" ? "Rejected" : "Flagged"}`,
      description: `"${item.title}" has been ${action === "approve" ? "approved" : action === "reject" ? "rejected" : "flagged"}.`
    });
  };

  const handleAutoModerationToggle = (checked: boolean) => {
    setAutoModeration(checked);
    toast({
      title: checked ? "Auto-Moderation Enabled" : "Auto-Moderation Disabled",
      description: checked 
        ? `Content above ${confidenceThreshold}% confidence will be automatically handled.`
        : "All content will require manual review."
    });
  };

  const getIconForType = (type: string) => {
    switch(type) {
      case "video": return <Video className="h-4 w-4" />;
      case "audio": return <AudioLines className="h-4 w-4" />;
      case "image": return <ImageIcon className="h-4 w-4" />;
      default: return <Upload className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: ContentStatus) => {
    switch(status) {
      case "approved":
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400">Authentic</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400">Deepfake</Badge>;
      case "flagged":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400">Flagged</Badge>;
      default:
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Community Content Moderation</CardTitle>
          <CardDescription>
            Automatically review user-submitted content for deepfakes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Automatic Deepfake Detection</AlertTitle>
              <AlertDescription>
                Configure how the system handles potentially synthetic content.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border rounded-lg bg-background">
              <div className="space-y-1">
                <h3 className="font-medium">Auto-Moderation</h3>
                <p className="text-sm text-muted-foreground">
                  Automatically handle content based on deepfake confidence score
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-moderation"
                  checked={autoModeration}
                  onCheckedChange={handleAutoModerationToggle}
                />
                <Label htmlFor="auto-moderation">
                  {autoModeration ? "Enabled" : "Disabled"}
                </Label>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-4 border rounded-lg bg-background">
                <h3 className="font-medium mb-2">Auto-Reject Threshold</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Content with deepfake confidence scores above this threshold will be automatically rejected
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[70, 85, 95].map(value => (
                    <Button 
                      key={value} 
                      variant={confidenceThreshold === value ? "default" : "outline"} 
                      size="sm"
                      onClick={() => {
                        setConfidenceThreshold(value);
                        toast({
                          title: "Threshold Updated",
                          description: `Auto-reject threshold set to ${value}%`
                        });
                      }}
                      disabled={!autoModeration}
                    >
                      {value}%
                    </Button>
                  ))}
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-background">
                <h3 className="font-medium mb-2">Content Types Monitored</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Media types that will be scanned for potential deepfakes
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-primary/10">
                    <Video className="mr-1 h-3 w-3" /> Videos
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10">
                    <ImageIcon className="mr-1 h-3 w-3" /> Images
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10">
                    <AudioLines className="mr-1 h-3 w-3" /> Audio
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <Tabs defaultValue="queue" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="queue">Moderation Queue ({queue.length})</TabsTrigger>
            <TabsTrigger value="processed">Processed Content ({processed.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="queue">
            <Card>
              <CardHeader>
                <CardTitle>Content Awaiting Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {queue.length === 0 ? (
                    <div className="text-center py-6">
                      <CheckCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">All content has been reviewed!</p>
                    </div>
                  ) : (
                    queue.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
                        <div className="flex items-center gap-3 sm:w-1/2">
                          <div className="rounded-full bg-primary/10 p-2">
                            {getIconForType(item.type)}
                          </div>
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              {item.source} • {item.timestamp}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:ml-auto">
                          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-red-50 dark:bg-red-900/20">
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                            <span className="text-xs font-medium text-red-600 dark:text-red-400">
                              {item.confidence}% Deepfake
                            </span>
                          </div>
                          <div className="flex gap-2 w-full sm:w-auto">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-emerald-200 hover:bg-emerald-50 text-emerald-700"
                              onClick={() => handleAction(item.id, "approve")}
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-amber-200 hover:bg-amber-50 text-amber-700"
                              onClick={() => handleAction(item.id, "flag")}
                            >
                              <Flag className="h-3 w-3 mr-1" />
                              Flag
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-red-200 hover:bg-red-50 text-red-700"
                              onClick={() => handleAction(item.id, "reject")}
                            >
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="processed">
            <Card>
              <CardHeader>
                <CardTitle>Processed Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {processed.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
                      <div className="flex items-center gap-3 sm:w-1/2">
                        <div className="rounded-full bg-primary/10 p-2">
                          {getIconForType(item.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{item.title}</h4>
                            {getStatusBadge(item.status)}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {item.source} • {item.timestamp}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:ml-auto">
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                          item.confidence > 70 
                            ? "bg-red-50 dark:bg-red-900/20" 
                            : "bg-emerald-50 dark:bg-emerald-900/20"
                        }`}>
                          {item.confidence > 70 ? (
                            <AlertTriangle className="h-3 w-3 text-red-500" />
                          ) : (
                            <CheckCircle className="h-3 w-3 text-emerald-500" />
                          )}
                          <span className={`text-xs font-medium ${
                            item.confidence > 70 
                              ? "text-red-600 dark:text-red-400" 
                              : "text-emerald-600 dark:text-emerald-400"
                          }`}>
                            {item.confidence}% {item.confidence > 70 ? "Deepfake" : "Authentic"}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Reviewed by: {item.reviewedBy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DeepfakeModerator;
