
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BellRing, Globe, UserRound, ShieldCheck, Mail, BellPlus, Moon, Sun, Lock, Key } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useTheme } from "@/contexts/ThemeContext";

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { darkMode, toggleDarkMode } = useTheme();

  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "Your general settings have been updated successfully."
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Saved",
      description: "Your notification settings have been updated successfully."
    });
  };

  const handlePasswordUpdate = () => {
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully."
    });
  };

  const handleGenerateApiKey = () => {
    toast({
      title: "API Key Generated",
      description: "Your new API key has been created successfully."
    });
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-[1200px] mx-auto px-4 sm:px-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList className="flex flex-wrap mb-2">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              <span>General</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <BellRing className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              <span>API Keys</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Update your personal information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" defaultValue="Alex Johnson" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="alex@deepguard.io" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Write a short bio..."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preferences</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="appearance">Appearance</Label>
                      <div className="text-sm text-muted-foreground">
                        Choose between light and dark mode
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch 
                        id="appearance" 
                        checked={darkMode}
                        onCheckedChange={toggleDarkMode}
                      />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">Language</Label>
                      <div className="text-sm text-muted-foreground">
                        Select your preferred language
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="flex gap-2 items-center w-full sm:w-auto">
                        <Globe className="h-4 w-4" />
                        <span>English (US)</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveGeneral} className="w-full sm:w-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <Label htmlFor="security-alerts">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive emails for important security events
                        </p>
                      </div>
                      <Switch id="security-alerts" defaultChecked />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <Label htmlFor="detection-reports">Detection Reports</Label>
                        <p className="text-sm text-muted-foreground">
                          Daily summary of detection activities
                        </p>
                      </div>
                      <Switch id="detection-reports" defaultChecked />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <Label htmlFor="newsletters">Product Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          Learn about new features and improvements
                        </p>
                      </div>
                      <Switch id="newsletters" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <Label htmlFor="real-time-alerts">Real-time Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Show browser notifications for critical events
                        </p>
                      </div>
                      <Switch id="real-time-alerts" defaultChecked />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <Label htmlFor="team-activity">Team Activity</Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications about team member actions
                        </p>
                      </div>
                      <Switch id="team-activity" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications} className="w-full sm:w-auto">Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and account security.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto"
                    onClick={handlePasswordUpdate}
                  >
                    Update Password
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-factor Authentication</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">Two-factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline" className="w-full sm:w-auto">Enable 2FA</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sessions</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">Active Sessions</p>
                      <p className="text-sm text-muted-foreground">
                        You're currently logged in on 2 devices
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      className="text-red-500 hover:text-red-600 w-full sm:w-auto"
                    >
                      Log Out All Devices
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>
                  Manage API keys for integrating with the DeepGuard platform.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">Production API Key</p>
                      <p className="text-sm text-muted-foreground">
                        For use in production environments
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input 
                        className="w-full sm:w-60"
                        value="••••••••••••••••••••••" 
                        readOnly
                      />
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 sm:flex-none">Reveal</Button>
                        <Button variant="outline" className="flex-1 sm:flex-none">Copy</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div>
                      <p className="font-medium">Development API Key</p>
                      <p className="text-sm text-muted-foreground">
                        For use in development and testing
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Input 
                        className="w-full sm:w-60"
                        value="••••••••••••••••••••••" 
                        readOnly
                      />
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 sm:flex-none">Reveal</Button>
                        <Button variant="outline" className="flex-1 sm:flex-none">Copy</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button onClick={handleGenerateApiKey} className="w-full sm:w-auto">Generate New API Key</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
