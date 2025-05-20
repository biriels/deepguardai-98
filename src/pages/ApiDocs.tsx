
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCode, Book, Shield, Settings, User, RefreshCcw, Check, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ApiDocs = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <FileCode className="h-6 w-6" />
          <h1 className="text-2xl font-bold">API Documentation</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Learn how to integrate and use our DeepGuard API in your applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Authentication</h3>
                <p className="text-muted-foreground">
                  All API endpoints require authentication using an API key. Include your API key in the request headers:
                </p>
                <pre className="mt-2 p-4 bg-muted rounded-lg overflow-x-auto">
                  <code>
                    {`Authorization: Bearer YOUR_API_KEY`}
                  </code>
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Base URL</h3>
                <p className="text-muted-foreground">
                  All API requests should be made to the following base URL:
                </p>
                <pre className="mt-2 p-4 bg-muted rounded-lg overflow-x-auto">
                  <code>
                    {`https://api.deepguard.io/v1`}
                  </code>
                </pre>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Rate Limits</h3>
                <p className="text-muted-foreground">
                  API requests are subject to rate limiting based on your subscription tier:
                </p>
                <div className="mt-2 grid grid-cols-3 gap-4 text-sm">
                  <div className="font-medium">Free Tier</div>
                  <div className="col-span-2">100 requests/hour</div>
                  <div className="font-medium">Pro Tier</div>
                  <div className="col-span-2">1,000 requests/hour</div>
                  <div className="font-medium">Enterprise Tier</div>
                  <div className="col-span-2">Custom limits</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
            <TabsTrigger value="agent-builder">Agent Builder API</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="endpoints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>Endpoints for managing API authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">POST</Badge>
                    <h4 className="font-medium">/auth/token</h4>
                  </div>
                  <p className="text-muted-foreground">Generate a new API token</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.deepguard.io/v1/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "your_password"}'`}
                    </code>
                  </pre>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500">DELETE</Badge>
                    <h4 className="font-medium">/auth/token</h4>
                  </div>
                  <p className="text-muted-foreground">Revoke an API token</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X DELETE https://api.deepguard.io/v1/auth/token \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detection</CardTitle>
                <CardDescription>Deepfake detection endpoints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">POST</Badge>
                    <h4 className="font-medium">/detection/analyze</h4>
                  </div>
                  <p className="text-muted-foreground">Analyze image or video for deepfakes</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.deepguard.io/v1/detection/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "media=@/path/to/file.mp4" \\
  -F "detection_type=full_scan"`}
                    </code>
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h4 className="font-medium">/detection/result/{'{scan_id}'}</h4>
                  </div>
                  <p className="text-muted-foreground">Get results of a previous scan</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl https://api.deepguard.io/v1/detection/result/scan_123456 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>User management endpoints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h4 className="font-medium">/users</h4>
                  </div>
                  <p className="text-muted-foreground">Retrieve a list of users</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl https://api.deepguard.io/v1/users \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                    </code>
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">POST</Badge>
                    <h4 className="font-medium">/users</h4>
                  </div>
                  <p className="text-muted-foreground">Create a new user</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.deepguard.io/v1/users \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"name": "John Doe", "email": "john@example.com", "role": "viewer"}'`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>JavaScript</CardTitle>
                <CardDescription>Example using fetch API</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                  <code>
                    {`// Authentication
const apiKey = 'YOUR_API_KEY';

// Function to analyze media for deepfakes
async function analyzeMedia(mediaFile) {
  const formData = new FormData();
  formData.append('media', mediaFile);
  formData.append('detection_type', 'full_scan');

  const response = await fetch('https://api.deepguard.io/v1/detection/analyze', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${apiKey}\`,
    },
    body: formData
  });

  return await response.json();
}`}
                  </code>
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Python</CardTitle>
                <CardDescription>Example using requests library</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                  <code>
                    {`import requests

api_key = 'YOUR_API_KEY'
headers = {'Authorization': f'Bearer {api_key}'}

# Analyze media for deepfakes
def analyze_media(file_path):
    url = 'https://api.deepguard.io/v1/detection/analyze'
    files = {'media': open(file_path, 'rb')}
    data = {'detection_type': 'full_scan'}
    
    response = requests.post(
        url,
        headers=headers,
        files=files,
        data=data
    )
    
    return response.json()

# Example usage
result = analyze_media('path/to/video.mp4')
print(result)`}
                  </code>
                </pre>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>React Integration</CardTitle>
                <CardDescription>Example React component for deepfake detection</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                  <code>
                    {`import React, { useState } from 'react';

function DeepfakeDetector() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiKey = 'YOUR_API_KEY';

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('media', file);
    formData.append('detection_type', 'full_scan');

    try {
      const response = await fetch('https://api.deepguard.io/v1/detection/analyze', {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${apiKey}\`,
        },
        body: formData
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error analyzing media:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Deepfake Detection</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={!file || loading}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      
      {result && (
        <div>
          <h3>Results:</h3>
          <p>Deepfake Probability: {result.deepfake_probability}%</p>
          <p>Confidence Score: {result.confidence}</p>
          <p>Detection Method: {result.detection_method}</p>
        </div>
      )}
    </div>
  );
}`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="agent-builder" className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold">Agent Builder API Reference</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              Build and manage custom DeepGuard agents for deepfake detection.
            </p>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Agent Configuration
                </CardTitle>
                <CardDescription>Create and manage detection agents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h4 className="font-medium">/agents</h4>
                  </div>
                  <p className="text-muted-foreground">List all available agents</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl https://api.deepguard.io/v1/agents \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                    </code>
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">POST</Badge>
                    <h4 className="font-medium">/agents</h4>
                  </div>
                  <p className="text-muted-foreground">Create a new agent with custom configuration</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.deepguard.io/v1/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Custom VisionSentinel",
    "description": "Specialized agent for detecting facial deepfakes",
    "parameters": {
      "threshold": 75,
      "mode": "Real-time Scanning",
      "platforms": ["YouTube", "TikTok"],
      "capabilities": ["Face Manipulation", "Lip Sync"],
      "response": "Flag for Review",
      "learningMode": "Active Learning"
    }
  }'`}
                    </code>
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-500">PUT</Badge>
                    <h4 className="font-medium">/agents/{'{agent_id}'}</h4>
                  </div>
                  <p className="text-muted-foreground">Update an existing agent</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X PUT https://api.deepguard.io/v1/agents/agent_123 \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "parameters": {
      "threshold": 85,
      "capabilities": ["Face Manipulation", "Voice Cloning", "Full Body Synthesis"]
    }
  }'`}
                    </code>
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-500">DELETE</Badge>
                    <h4 className="font-medium">/agents/{'{agent_id}'}</h4>
                  </div>
                  <p className="text-muted-foreground">Delete an agent</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X DELETE https://api.deepguard.io/v1/agents/agent_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5" />
                  Agent Operations
                </CardTitle>
                <CardDescription>Deploy and execute detection agents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">POST</Badge>
                    <h4 className="font-medium">/agents/{'{agent_id}'}/deploy</h4>
                  </div>
                  <p className="text-muted-foreground">Deploy an agent to production</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.deepguard.io/v1/agents/agent_123/deploy \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
                    </code>
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">POST</Badge>
                    <h4 className="font-medium">/agents/{'{agent_id}'}/analyze</h4>
                  </div>
                  <p className="text-muted-foreground">Analyze media using a specific agent</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.deepguard.io/v1/agents/agent_123/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "media=@/path/to/file.mp4"`}
                    </code>
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">POST</Badge>
                    <h4 className="font-medium">/agents/{'{agent_id}'}/test</h4>
                  </div>
                  <p className="text-muted-foreground">Test agent with benchmark datasets</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.deepguard.io/v1/agents/agent_123/test \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "dataset": "deepfake-benchmark-2024",
    "test_size": 100
  }'`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Agent Performance
                </CardTitle>
                <CardDescription>Monitor and analyze agent performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h4 className="font-medium">/agents/{'{agent_id}'}/metrics</h4>
                  </div>
                  <p className="text-muted-foreground">Get performance metrics for an agent</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl https://api.deepguard.io/v1/agents/agent_123/metrics \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d "period=30d"`}
                    </code>
                  </pre>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-green-500">GET</Badge>
                    <h4 className="font-medium">/agents/{'{agent_id}'}/detections</h4>
                  </div>
                  <p className="text-muted-foreground">List recent detections made by the agent</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl https://api.deepguard.io/v1/agents/agent_123/detections \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d "limit=50"`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="webhooks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
                <CardDescription>Receive real-time notification of detection events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Configure webhooks to receive real-time notifications when deepfakes are detected or when agent statuses change.
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500">POST</Badge>
                    <h4 className="font-medium">/webhooks</h4>
                  </div>
                  <p className="text-muted-foreground">Create a new webhook endpoint</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.deepguard.io/v1/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-website.com/api/deepguard-webhook",
    "events": ["detection.confirmed", "agent.status"],
    "active": true
  }'`}
                    </code>
                  </pre>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Example Webhook Payload</h4>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`// detection.confirmed event
{
  "event": "detection.confirmed",
  "created_at": "2023-06-15T14:32:17Z",
  "data": {
    "scan_id": "scan_123456",
    "media_type": "video",
    "deepfake_probability": 92.7,
    "detection_method": "face_manipulation",
    "agent_id": "agent_123",
    "source_platform": "YouTube",
    "content_url": "https://youtube.com/watch?v=abc123"
  }
}`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Available Webhook Events</CardTitle>
                <CardDescription>Events that can trigger webhook notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <h4 className="font-medium">detection.pending</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Triggered when a new detection scan starts
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <h4 className="font-medium">detection.confirmed</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Triggered when a scan confirms a deepfake
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <h4 className="font-medium">detection.authentic</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Triggered when a scan confirms authentic media
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <h4 className="font-medium">agent.status</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Triggered when agent status changes
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <h4 className="font-medium">agent.learning</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Triggered when an agent improves from learning
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <h4 className="font-medium">account.limit</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Triggered when account approaches API limits
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ApiDocs;
