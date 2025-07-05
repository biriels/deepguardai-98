
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, CheckCircle, Mail, Clock, Brain, Zap } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { BreachDetectionApi } from '@/utils/api/breachDetectionApi';
import { BreachDetectionResult } from '@/types/breach';
import { ReportGenerator } from '@/utils/reportGenerator';

const BreachDetectionCard = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<BreachDetectionResult | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

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
    setProgress(0);
    setResult(null);

    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const breachResult = await BreachDetectionApi.checkEmailBreach(email);
      
      clearInterval(progressInterval);
      setProgress(100);
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
      clearInterval(progressInterval);
      toast({
        title: "Check Failed",
        description: "Unable to check breach status. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleDownloadReport = async () => {
    if (!result) return;

    setIsDownloading(true);
    try {
      const report = ReportGenerator.generateEmailReport(result);
      const filename = `security-report-${result.email.replace('@', '-at-')}-${new Date().toISOString().split('T')[0]}.txt`;
      
      ReportGenerator.downloadReport(report, filename);
      
      toast({
        title: "Report Downloaded",
        description: "Your security report has been downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Unable to download report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          AI-Powered Email Breach Detection
          <Badge variant="outline" className="ml-auto text-xs">
            <Zap className="h-3 w-3 mr-1" />
            Enhanced
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            placeholder="Enter email address for AI analysis..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isChecking}
            className="flex-1"
          />
          <Button 
            onClick={handleCheck}
            disabled={isChecking || !email}
            className="w-full sm:w-auto sm:min-w-24"
          >
            {isChecking ? 'Analyzing...' : 'AI Check'}
          </Button>
        </div>

        {isChecking && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">AI Analysis in Progress...</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              Scanning breach databases and analyzing risk patterns
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <Alert className={result.isBreached ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              <div className="flex items-start gap-2">
                {result.isBreached ? (
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                )}
                <AlertDescription className={`${result.isBreached ? 'text-red-800' : 'text-green-800'} text-sm`}>
                  {result.isBreached 
                    ? `⚠️ SECURITY ALERT: Email found in ${result.totalBreaches} confirmed data breach(es)`
                    : '✅ No breaches detected - Your email appears secure'
                  }
                </AlertDescription>
              </div>
            </Alert>

            {result.isBreached && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">AI Risk Assessment:</span>
                    <Badge className={getRiskColor(result.riskLevel)}>
                      {result.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Analyzed {new Date(result.detectionDate).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm sm:text-base flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    Confirmed Breaches:
                  </h4>
                  {result.breaches.map((breach) => (
                    <div key={breach.id} className="border rounded-lg p-3 space-y-2 bg-white">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="font-medium text-sm sm:text-base break-words">{breach.name}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs w-fit">
                            {new Date(breach.breachDate).getFullYear()}
                          </Badge>
                          {breach.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
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

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Start AI Recovery
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full sm:w-auto"
                    onClick={handleDownloadReport}
                    disabled={isDownloading}
                  >
                    {isDownloading ? 'Generating...' : 'Download Report'}
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
