
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle, Mail, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { BreachDetectionApi } from '@/utils/api/breachDetectionApi';
import { BreachDetectionResult } from '@/types/breach';

const BreachDetectionCard = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<BreachDetectionResult | null>(null);

  const handleCheck = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to check",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);
    try {
      const breachResult = await BreachDetectionApi.checkEmailBreach(email);
      setResult(breachResult);
      
      if (breachResult.isBreached) {
        toast({
          title: "⚠️ Breach Detected",
          description: `Your email was found in ${breachResult.totalBreaches} data breach(es)`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "✅ Good News",
          description: "No breaches found for this email address",
        });
      }
    } catch (error) {
      toast({
        title: "Check Failed",
        description: "Unable to check breach status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Data Breach Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter email address to check..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isChecking}
          />
          <Button 
            onClick={handleCheck}
            disabled={isChecking || !email}
            className="min-w-24"
          >
            {isChecking ? 'Checking...' : 'Check'}
          </Button>
        </div>

        {result && (
          <div className="space-y-4">
            <Alert className={result.isBreached ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              <div className="flex items-center gap-2">
                {result.isBreached ? (
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                )}
                <AlertDescription className={result.isBreached ? 'text-red-800' : 'text-green-800'}>
                  {result.isBreached 
                    ? `⚠️ ALERT: Your email was found in ${result.totalBreaches} data breach(es)`
                    : '✅ Good news! No breaches found for this email address'
                  }
                </AlertDescription>
              </div>
            </Alert>

            {result.isBreached && (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Risk Level:</span>
                    <Badge className={getRiskColor(result.riskLevel)}>
                      {result.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Checked {new Date(result.detectionDate).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Breaches Found:</h4>
                  {result.breaches.map((breach) => (
                    <div key={breach.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{breach.name}</div>
                        <Badge variant="outline">
                          {new Date(breach.breachDate).getFullYear()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {breach.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {breach.dataClasses.map((dataClass) => (
                          <Badge key={dataClass} variant="secondary" className="text-xs">
                            {dataClass}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Affected accounts: {breach.pwnCount.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Start Recovery Process
                  </Button>
                  <Button variant="outline">
                    Download Report
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BreachDetectionCard;
