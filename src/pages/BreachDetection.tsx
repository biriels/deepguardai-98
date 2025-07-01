
import React, { useState } from 'react';
import Layout from "@/components/Layout/Layout";
import BreachDetectionCard from '@/components/Breach/BreachDetectionCard';
import PhoneBreachDetectionCard from '@/components/Breach/PhoneBreachDetectionCard';
import BreachRecoveryWizard from '@/components/Breach/BreachRecoveryWizard';
import BreachAlertDialog from '@/components/Breach/BreachAlertDialog';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  Clock,
  FileText,
  Search,
  Bell,
  Phone,
  Mail
} from 'lucide-react';
import { BreachDetectionResult } from '@/types/breach';

const BreachDetection = () => {
  const [showRecoveryWizard, setShowRecoveryWizard] = useState(false);
  const [showBreachAlert, setShowBreachAlert] = useState(false);
  const [currentBreach, setCurrentBreach] = useState<BreachDetectionResult | null>(null);
  const [selectedEmail, setSelectedEmail] = useState('');

  const handleBreachDetected = (breachData: BreachDetectionResult) => {
    setCurrentBreach(breachData);
    setSelectedEmail(breachData.email);
    setShowBreachAlert(true);
  };

  const handleStartRecovery = () => {
    setShowBreachAlert(false);
    setShowRecoveryWizard(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Data Breach Detection</h1>
            <p className="text-muted-foreground mt-2">
              Monitor and respond to data breaches affecting your email addresses and phone numbers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Alert Settings
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-100 p-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-xs text-muted-foreground">Active Breaches</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 p-2">
                  <Mail className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">Monitored Emails</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-purple-100 p-2">
                  <Phone className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-xs text-muted-foreground">Monitored Phones</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-100 p-2">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold">13</div>
                  <div className="text-xs text-muted-foreground">Secured Accounts</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="detection" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="detection">Breach Detection</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring Dashboard</TabsTrigger>
            <TabsTrigger value="recovery">Recovery Center</TabsTrigger>
          </TabsList>
          
          <TabsContent value="detection" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <BreachDetectionCard />
                <PhoneBreachDetectionCard />
              </div>

              <div className="space-y-6">
                {/* Recent Breaches */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Data Breaches</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { name: 'TelecomBreach2023', date: '2023-08-15', affected: '2.1M', severity: 'high', type: 'phone' },
                      { name: 'LastPass', date: '2022-12-22', affected: '30M', severity: 'critical', type: 'email' },
                      { name: 'SocialMediaLeak', date: '2023-11-22', affected: '5.4M', severity: 'critical', type: 'phone' },
                      { name: 'Twitter', date: '2022-08-05', affected: '5.4M', severity: 'high', type: 'email' }
                    ].map((breach) => (
                      <div key={breach.name} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-gray-100 p-1">
                            {breach.type === 'phone' ? (
                              <Phone className="h-3 w-3 text-purple-600" />
                            ) : (
                              <Mail className="h-3 w-3 text-blue-600" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{breach.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(breach.date).toLocaleDateString()} • {breach.affected} affected
                            </div>
                          </div>
                        </div>
                        <Badge variant={breach.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {breach.severity}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Security Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security Timeline</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        { time: '2 hours ago', event: 'Phone breach scan completed', type: 'success' },
                        { time: '5 hours ago', event: 'Email breach scan completed', type: 'success' },
                        { time: '1 day ago', event: 'Password changed for user@email.com', type: 'success' },
                        { time: '2 days ago', event: 'Phone number secured: +1***-***-1234', type: 'success' },
                        { time: '3 days ago', event: 'New breach detected: TelecomBreach2023', type: 'warning' },
                        { time: '1 week ago', event: '2FA enabled for secure@email.com', type: 'success' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className={`rounded-full p-1 mt-1 ${
                            item.type === 'success' ? 'bg-green-100' :
                            item.type === 'warning' ? 'bg-orange-100' : 'bg-gray-100'
                          }`}>
                            <div className={`w-2 h-2 rounded-full ${
                              item.type === 'success' ? 'bg-green-600' :
                              item.type === 'warning' ? 'bg-orange-600' : 'bg-gray-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{item.event}</div>
                            <div className="text-xs text-muted-foreground">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Search className="h-4 w-4 mr-2" />
                      Bulk Security Scan
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Secure Me Mode
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone Safety Score
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Email Safety Score
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Security Report
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="monitoring" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <h3 className="text-lg font-medium mb-2">Monitoring Dashboard</h3>
                  <p className="text-muted-foreground">Monitor multiple email addresses and phone numbers for data breaches</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="recovery" className="mt-6">
            {showRecoveryWizard && selectedEmail ? (
              <BreachRecoveryWizard 
                email={selectedEmail}
                onClose={() => setShowRecoveryWizard(false)}
              />
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Recovery Center</h3>
                    <p className="text-muted-foreground">Access recovery tools and guides for compromised accounts</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Breach Alert Dialog */}
        {currentBreach && (
          <BreachAlertDialog
            isOpen={showBreachAlert}
            onClose={() => setShowBreachAlert(false)}
            onStartRecovery={handleStartRecovery}
            breachData={currentBreach}
          />
        )}
      </div>
    </Layout>
  );
};

export default BreachDetection;
