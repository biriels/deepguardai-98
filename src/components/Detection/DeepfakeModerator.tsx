
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, CheckCircle, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Define the ContentItem type with a union type for 'type'
type ContentItem = {
  id: string;
  type: "video" | "audio" | "image";
  title: string;
  source: string;
  timestamp: string;
  confidence: number;
  status: string;
  reviewedBy?: string;
};

const DeepfakeModerator = () => {
  // Define the content items with the proper types
  const pendingItems: ContentItem[] = [
    {
      id: "content-1",
      type: "video",
      title: "Political speech excerpt",
      source: "Twitter",
      timestamp: "10 minutes ago",
      confidence: 87,
      status: "pending"
    },
    {
      id: "content-2",
      type: "audio",
      title: "Celebrity interview clip",
      source: "Instagram",
      timestamp: "25 minutes ago",
      confidence: 92,
      status: "pending"
    },
    {
      id: "content-3",
      type: "image",
      title: "Public figure photograph",
      source: "News website",
      timestamp: "1 hour ago",
      confidence: 76,
      status: "pending"
    }
  ];

  const reviewedItems: ContentItem[] = [
    {
      id: "content-4",
      type: "video",
      title: "Campaign video",
      source: "YouTube",
      timestamp: "2 hours ago",
      confidence: 95,
      status: "rejected",
      reviewedBy: "moderator1"
    },
    {
      id: "content-5",
      type: "image",
      title: "Celebrity photo",
      source: "Reddit",
      timestamp: "3 hours ago",
      confidence: 65,
      status: "approved",
      reviewedBy: "moderator2"
    },
    {
      id: "content-6",
      type: "audio",
      title: "Interview segment",
      source: "Podcast",
      timestamp: "5 hours ago",
      confidence: 88,
      status: "rejected",
      reviewedBy: "moderator1"
    }
  ];

  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Content Moderation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="pending">Pending Review ({pendingItems.length})</TabsTrigger>
            <TabsTrigger value="reviewed">Reviewed Content ({reviewedItems.length})</TabsTrigger>
          </TabsList>
          
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex gap-2 whitespace-nowrap">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
          
          <TabsContent value="pending" className="space-y-4">
            {pendingItems.map((item) => (
              <ContentListItem key={item.id} item={item} showActions />
            ))}
          </TabsContent>
          
          <TabsContent value="reviewed" className="space-y-4">
            {reviewedItems.map((item) => (
              <ContentListItem key={item.id} item={item} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface ContentListItemProps {
  item: ContentItem;
  showActions?: boolean;
}

const ContentListItem = ({ item, showActions }: ContentListItemProps) => {
  return (
    <div className="bg-background p-4 rounded-lg border flex flex-col sm:flex-row gap-4">
      <div className="w-16 h-16 sm:w-24 sm:h-24 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-xs uppercase">
        {item.type}
      </div>
      
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <div className="text-sm text-muted-foreground">
              Source: {item.source} • {item.timestamp}
            </div>
          </div>
          <div className="ml-4 flex items-center">
            {item.status === "approved" ? (
              <span className="flex items-center text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-full">
                <CheckCircle className="h-3 w-3 mr-1" />
                Approved
              </span>
            ) : item.status === "rejected" ? (
              <span className="flex items-center text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Rejected
              </span>
            ) : (
              <span className="flex items-center text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 px-2 py-1 rounded-full">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Pending
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-2 flex items-center">
          <span className="text-xs font-medium mr-1">
            Confidence score:
          </span>
          <span className={`text-xs font-semibold ${
            item.confidence > 80 ? "text-red-500" : 
            item.confidence > 70 ? "text-amber-500" : "text-emerald-500"
          }`}>
            {item.confidence}%
          </span>
          <span className="text-xs text-muted-foreground ml-4">
            {item.reviewedBy ? `Reviewed by: ${item.reviewedBy}` : ""}
          </span>
        </div>
        
        {showActions && (
          <div className="mt-4 flex items-center gap-4">
            <Button size="sm" variant="outline" className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
              <CheckCircle className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <div className="ml-auto flex items-center gap-2">
              <Checkbox id={`flag-${item.id}`} />
              <label htmlFor={`flag-${item.id}`} className="text-sm">Flag for review</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeepfakeModerator;
