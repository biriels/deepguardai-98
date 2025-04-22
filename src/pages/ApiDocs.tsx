
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileCode, Book } from "lucide-react";

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
              Learn how to integrate and use our API in your applications.
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
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="endpoints" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="endpoints" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Authentication</CardTitle>
                <CardDescription>Endpoints for managing API authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">POST /api/auth/token</h4>
                  <p className="text-muted-foreground">Generate a new API token</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl -X POST https://api.example.com/auth/token \\
  -H "Content-Type: application/json" \\
  -d '{"email": "user@example.com", "password": "your_password"}'`}
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
                  <h4 className="font-medium">GET /api/users</h4>
                  <p className="text-muted-foreground">Retrieve a list of users</p>
                  <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                    <code>
                      {`curl https://api.example.com/users \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
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
                    {`const response = await fetch('https://api.example.com/users', {
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  }
});
const data = await response.json();`}
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

response = requests.get(
    'https://api.example.com/users',
    headers={'Authorization': f'Bearer {api_key}'}
)
data = response.json()`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ApiDocs;
