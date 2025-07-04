
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Phone, AlertTriangle, CheckCircle, Shield, Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { BreachDetectionApi } from '@/utils/api/breachDetectionApi';
import { PhoneBreachDetectionResult } from '@/types/breach';
import { ReportGenerator } from '@/utils/reportGenerator';

const PhoneBreachDetectionCard = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<PhoneBreachDetectionResult | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleCheck = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter a phone number to check",
        variant: "destructive"
      });
      return;
    }

    setIsChecking(true);
    try {
      const breachResult = await BreachDetectionApi.checkPhoneBreach(phoneNumber);
      setResult(breachResult);
      
      if (breachResult.isBreached) {
        toast({
          title: "⚠️ Phone Breach Detected",
          description: `Your phone number was found in ${breachResult.totalBreaches} data breach(es)`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "✅ Good News",
          description: "No breaches found for this phone number",
        });
      }
    } catch (error) {
      toast({
        title: "Check Failed",
        description: "Unable to check phone breach status. Please try again.",
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
      const report = ReportGenerator.generatePhoneReport(result);
      const filename = `phone-security-report-${result.phoneNumber.replace(/[^0-9]/g, '')}-${new Date().toISOString().split('T')[0]}.txt`;
      
      ReportGenerator.downloadReport(report, filename);
      
      toast({
        title: "Report Downloaded",
        description: "Your phone security report has been downloaded successfully",
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
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          Phone Number Breach Detection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="tel"
            placeholder="Enter phone number... (+1234567890)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={isChecking}
            className="flex-1"
          />
          <Button 
            onClick={handleCheck}
            disabled={isChecking || !phoneNumber}
            className="w-full sm:w-auto sm:min-w-24"
          >
            {isChecking ? 'Checking...' : 'Check'}
          </Button>
        </div>

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
                    ? `⚠️ ALERT: Your phone number was found in ${result.totalBreaches} data breach(es)`
                    : '✅ Good news! No breaches found for this phone number'
                  }
                </AlertDescription>
              </div>
            </Alert>

            {result.isBreached && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Risk Level:</span>
                    <Badge className={getRiskColor(result.riskLevel)}>
                      {result.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    Checked {new Date(result.detectionDate).toLocaleString()}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm sm:text-base">Phone Breaches Found:</h4>
                  {result.breaches.map((breach) => (
                    <div key={breach.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="font-medium text-sm sm:text-base break-words">{breach.breachName}</div>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(breach.severity)}>
                            {breach.severity.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {new Date(breach.breachDate).getFullYear()}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {breach.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {breach.dataExposed.map((dataType) => (
                          <Badge key={dataType} variant="secondary" className="text-xs">
                            {dataType}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Source: {breach.source}
                        {breach.isVerified && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            ✓ Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button className="flex-1">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure My Phone Number
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

export default PhoneBreachDetectionCard;
