
import React, { useState } from 'react';
import Layout from "@/components/Layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Bookmark, Globe, Code2, Download, ExternalLink } from 'lucide-react';
import ExtensionPopup from '@/components/Extension/ExtensionPopup';
import BookmarkletGenerator from '@/components/Extension/BookmarkletGenerator';

const ExtensionTools = () => {
  const [showPopupDemo, setShowPopupDemo] = useState(false);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Puzzle className="h-8 w-8 text-primary" />
              Browser Extension Tools
            </h1>
            <p className="text-muted-foreground mt-2">
              Chrome extension alternatives and API integration tools
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <Globe className="h-3 w-3" />
            Web-based Extension
          </Badge>
        </div>

        <Tabs defaultValue="demo" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="demo">Live Demo</TabsTrigger>
            <TabsTrigger value="bookmarklet">Bookmarklet</TabsTrigger>
            <TabsTrigger value="api">API Docs</TabsTrigger>
            <TabsTrigger value="download">Chrome Extension</TabsTrigger>
          </TabsList>

          <TabsContent value="demo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Puzzle className="h-5 w-5" />
                  Extension Popup Demo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Experience how the extension would work with this interactive demo:
                </p>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setShowPopupDemo(!showPopupDemo)}
                    variant={showPopupDemo ? "secondary" : "default"}
                  >
                    {showPopupDemo ? "Hide Demo" : "Show Extension Demo"}
                  </Button>
                </div>

                {showPopupDemo && (
                  <div className="flex justify-center py-6">
                    <ExtensionPopup 
                      isCompact={true} 
                      onClose={() => setShowPopupDemo(false)} 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookmarklet" className="space-y-6">
            <BookmarkletGenerator />
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  API Integration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Use these API endpoints to build your own Chrome extension:
                </p>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">URL Analysis Endpoint</h4>
                    <code className="text-xs bg-white p-2 rounded block">
                      POST {window.location.origin}/api/analyze-url<br/>
                      Content-Type: application/json<br/>
                      {`{ "url": "https://example.com" }`}
                    </code>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">File Upload Endpoint</h4>
                    <code className="text-xs bg-white p-2 rounded block">
                      POST {window.location.origin}/api/deepfake-detection<br/>
                      Content-Type: multipart/form-data<br/>
                      FormData with file field
                    </code>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium mb-2">Response Format</h4>
                    <code className="text-xs bg-white p-2 rounded block">
                      {JSON.stringify({
                        "result": {
                          "score": 85,
                          "isDeepfake": true,
                          "confidence": "high",
                          "details": {
                            "analysis": "Detected manipulation patterns...",
                            "artifacts": ["inconsistent lighting", "facial artifacts"]
                          }
                        },
                        "processingTime": 1200
                      }, null, 2)}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="download" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Chrome Extension Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Puzzle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium mb-2">Chrome Extension Coming Soon</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We're preparing a full Chrome extension package that will integrate with these APIs.
                  </p>
                  
                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      For now, use the bookmarklet or integrate with our APIs directly.
                    </p>
                    
                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://developer.chrome.com/docs/extensions/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-2" />
                          Chrome Extension Docs
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Extension Features (Planned):</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• One-click page analysis</li>
                    <li>• Right-click context menu for images/videos</li>
                    <li>• Real-time detection notifications</li>
                    <li>• Automatic suspicious content flagging</li>
                    <li>• Integration with social media platforms</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ExtensionTools;
