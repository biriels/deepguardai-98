
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Key, CreditCard, User } from 'lucide-react';
import { ProfileSettingsModal } from '@/components/Profile/SettingsModal';
import { ApiKeysModal } from '@/components/Profile/ApiKeysModal';
import { BillingModal } from '@/components/Profile/BillingModal';
import { useUser } from '@/contexts/UserContext';

const Profile = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [apiKeysOpen, setApiKeysOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);
  const { email, userPlan } = useUser();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Badge variant={userPlan === 'professional' ? 'default' : 'secondary'}>
            {userPlan === 'professional' ? 'Professional' : userPlan === 'starter' ? 'Starter' : 'Standard'} Plan
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{email}</p>
              </div>
              <Button 
                onClick={() => setSettingsOpen(true)}
                className="w-full mt-4"
                variant="outline"
              >
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage your API keys for integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Access your production and development API keys
              </p>
              <Button 
                onClick={() => setApiKeysOpen(true)}
                className="w-full"
                variant="outline"
              >
                <Key className="h-4 w-4 mr-2" />
                Manage API Keys
              </Button>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing & Subscription
              </CardTitle>
              <CardDescription>
                Manage your subscription and payment details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Current Plan: {userPlan === 'professional' ? 'Professional' : userPlan === 'starter' ? 'Starter' : 'Standard'}</p>
                  <p className="text-sm text-muted-foreground">
                    {userPlan === 'professional' ? '$99.99/month' : userPlan === 'starter' ? '$29.99/month' : '$9.99/month'}
                  </p>
                </div>
                <Button 
                  onClick={() => setBillingOpen(true)}
                  variant="outline"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Manage Billing
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <ProfileSettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      <ApiKeysModal open={apiKeysOpen} onOpenChange={setApiKeysOpen} />
      <BillingModal open={billingOpen} onOpenChange={setBillingOpen} />
    </div>
  );
};

export default Profile;
