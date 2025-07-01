
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Key, 
  Shield, 
  Mail, 
  Search, 
  Users, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { RecoveryStep } from '@/types/breach';

interface BreachRecoveryWizardProps {
  email: string;
  onClose?: () => void;
}

const BreachRecoveryWizard = ({ email, onClose }: BreachRecoveryWizardProps) => {
  const [recoverySteps, setRecoverySteps] = useState<RecoveryStep[]>([
    {
      id: 'change-password',
      title: 'Change your password now',
      description: 'Update your password immediately to secure your account',
      icon: 'Key',
      status: 'pending',
      priority: 'critical',
      estimatedTime: '2-3 minutes',
      actionType: 'external',
      actionData: {
        provider: 'Gmail',
        url: 'https://myaccount.google.com/security'
      }
    },
    {
      id: 'enable-2fa',
      title: 'Enable 2FA (Two-Factor Authentication)',
      description: 'Add an extra layer of security to your account',
      icon: 'Shield',
      status: 'pending',
      priority: 'high',
      estimatedTime: '3-5 minutes',
      actionType: 'guided'
    },
    {
      id: 'check-forwarding',
      title: 'Check forwarding rules + recent activity',
      description: 'Review email forwarding and recent login activity',
      icon: 'Mail',
      status: 'pending',
      priority: 'medium',
      estimatedTime: '2-3 minutes',
      actionType: 'guided'
    },
    {
      id: 'scan-accounts',
      title: 'Scan connected accounts',
      description: 'Check accounts that may be linked to this email',
      icon: 'Search',
      status: 'pending',
      priority: 'medium',
      estimatedTime: '1-2 minutes',
      actionType: 'internal'
    },
    {
      id: 'search-credentials',
      title: 'Search for leaked credentials',
      description: 'Find where your credentials may have been exposed',
      icon: 'AlertCircle',
      status: 'pending',
      priority: 'high',
      estimatedTime: '1 minute',
      actionType: 'internal'
    },
    {
      id: 'notify-contacts',
      title: 'Notify your contacts (optional)',
      description: 'Send a security notice to your contacts',
      icon: 'Users',
      status: 'pending',
      priority: 'low',
      estimatedTime: '5 minutes',
      actionType: 'internal'
    }
  ]);

  const getIconComponent = (iconName: string) => {
    const icons = {
      Key, Shield, Mail, Search, AlertCircle, Users
    };
    const IconComponent = icons[iconName as keyof typeof icons] || AlertCircle;
    return <IconComponent className="h-5 w-5" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const updateStepStatus = (stepId: string, newStatus: RecoveryStep['status']) => {
    setRecoverySteps(steps =>
      steps.map(step =>
        step.id === stepId ? { ...step, status: newStatus } : step
      )
    );
  };

  const completedSteps = recoverySteps.filter(step => step.status === 'completed').length;
  const progressPercentage = (completedSteps / recoverySteps.length) * 100;

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl">
          Your Email Was Compromised — Let's Fix It
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Recovery Progress</span>
            <span>{completedSteps} of {recoverySteps.length} completed</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        <div className="text-sm text-muted-foreground">
          Email: <span className="font-medium">{email}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {recoverySteps.map((step, index) => (
            <div key={step.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(step.status)}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getIconComponent(step.icon)}
                      <h3 className="font-medium">{step.title}</h3>
                      <Badge className={getPriorityColor(step.priority)}>
                        {step.priority}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ~{step.estimatedTime}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                  <div className="flex gap-2">
                    {step.actionType === 'external' && (
                      <Button 
                        size="sm"
                        onClick={() => {
                          if (step.actionData?.url) {
                            window.open(step.actionData.url, '_blank');
                            updateStepStatus(step.id, 'in-progress');
                          }
                        }}
                      >
                        Go to {step.actionData?.provider || 'Provider'}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                    {step.actionType === 'guided' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateStepStatus(step.id, 'in-progress')}
                      >
                        Guide Me
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    )}
                    {step.actionType === 'internal' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateStepStatus(step.id, 'completed')}
                      >
                        Start Scan
                      </Button>
                    )}
                    {step.status !== 'completed' && (
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => updateStepStatus(step.id, 'completed')}
                      >
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex justify-between items-center pt-4">
          <div className="text-sm text-muted-foreground">
            Need help? Contact our security team for personalized assistance.
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button disabled={completedSteps < recoverySteps.length}>
              Complete Recovery
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BreachRecoveryWizard;
