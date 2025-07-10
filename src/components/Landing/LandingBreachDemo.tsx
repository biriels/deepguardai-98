import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, AlertTriangle, CheckCircle, Mail, Clock, Brain, Zap, Lock, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { BreachDetectionApi } from '@/utils/api/breachDetectionApi';
import { BreachDetectionResult } from '@/types/breach';
import { Link } from 'react-router-dom';

const LandingBreachDemo = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<BreachDetectionResult | null>(null);
  const [hasUsedDemo, setHasUsedDemo] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    // Check if user has already used the demo
    const demoUsed = localStorage.getItem('demoUsed');
    if (demoUsed === 'true') {
      setHasUsedDemo(true);
    }
  }, []);

  const handleCheck = async () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter an email address to check",
        variant: "destructive"
      });
      return;
    }

    if (hasUsedDemo) {
      setShowLoginPrompt(true);
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
      
      // Mark demo as used
      localStorage.setItem('demoUsed', 'true');
      setHasUsedDemo(true);
      
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

      // Show login prompt after a delay
      setTimeout(() => {
        setShowLoginPrompt(true);
      }, 3000);
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

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  return (
    <>
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="pb-3 sm:pb-4">
          <CardTitle className="flex items-center justify-between gap-2 text-base sm:text-lg">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Try Our AI Breach Detection
              <Badge variant="outline" className="ml-2 text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Free Demo
              </Badge>
            </div>
            {hasUsedDemo && (
              <Badge variant="secondary" className="text-xs">
                <Lock className="h-3 w-3 mr-1" />
                Login for more
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder={hasUsedDemo ? "Sign up to check more emails..." : "Enter email address for AI analysis..."}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isChecking || hasUsedDemo}
              className="flex-1"
            />
            <Button 
              onClick={handleCheck}
              disabled={isChecking || !email}
              className="w-full sm:w-auto sm:min-w-24"
            >
              {hasUsedDemo ? 'Login to Continue' : isChecking ? 'Analyzing...' : 'AI Check'}
            </Button>
          </div>

          {hasUsedDemo && !result && (
            <Alert className="border-amber-200 bg-amber-50">
              <Star className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                🎉 Demo complete! Create a free account to check unlimited emails and access advanced features.
              </AlertDescription>
            </Alert>
          )}

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
                      Sample Breach Found:
                    </h4>
                    {result.breaches.slice(0, 1).map((breach) => (
                      <div key={breach.id} className="border rounded-lg p-3 space-y-2 bg-white">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className="font-medium text-sm sm:text-base break-words">{breach.name}</div>
                          <Badge variant="outline" className="text-xs w-fit">
                            {new Date(breach.breachDate).getFullYear()}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {breach.description.substring(0, 100)}...
                        </p>
                        <div className="text-xs text-muted-foreground">
                          Affected accounts: {breach.pwnCount.toLocaleString()}
                        </div>
                      </div>
                    ))}
                    {result.totalBreaches > 1 && (
                      <Alert className="border-blue-200 bg-blue-50">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800 text-sm">
                          🔒 {result.totalBreaches - 1} more breach(es) found. Sign up to see the complete analysis and get protection recommendations.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </>
              )}

              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="font-medium">Want the full analysis?</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Create a free account to access detailed breach reports, AI-powered recovery recommendations, and continuous monitoring.
                </p>
                <Link to="/auth">
                  <Button className="w-full">
                    Get Full Report - Free
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" />
              Unlock Full Protection
            </DialogTitle>
            <DialogDescription className="space-y-3">
              <p>Great! You've tried our AI breach detection.</p>
              <p>Create a free account to:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Check unlimited email addresses</li>
                <li>Get detailed breach reports</li>
                <li>Access AI recovery recommendations</li>
                <li>Set up continuous monitoring</li>
                <li>Download security reports</li>
              </ul>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Link to="/auth" className="w-full">
              <Button className="w-full">
                Create Free Account
              </Button>
            </Link>
            <Button variant="outline" onClick={() => setShowLoginPrompt(false)}>
              Maybe Later
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LandingBreachDemo;