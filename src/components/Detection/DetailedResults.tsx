
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Brain, 
  Users, 
  Clock,
  TrendingUp,
  Shield,
  Eye,
  Fingerprint,
  Activity,
  Search,
  Zap
} from 'lucide-react';
import { EnhancedDetectionResult } from '@/utils/ai/enhancedDetection';

interface DetailedResultsProps {
  result: EnhancedDetectionResult;
}

export const DetailedResults: React.FC<DetailedResultsProps> = ({ result }) => {
  const getRecommendationIcon = (action: string) => {
    switch (action) {
      case 'accept': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'review': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'reject': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  // Generate mock detailed analysis data
  const detailedAnalysis = {
    traces: [
      { type: 'Facial Inconsistency', confidence: 85, description: 'Detected asymmetrical facial features that suggest digital manipulation' },
      { type: 'Temporal Artifacts', confidence: 72, description: 'Frame-to-frame inconsistencies in lighting and shadows' },
      { type: 'Compression Artifacts', confidence: 68, description: 'Unusual compression patterns around facial regions' }
    ],
    gabFingerprints: [
      { frequency: '2.4 Hz', amplitude: 0.85, anomaly: 'High', description: 'Unnatural frequency pattern in facial movements' },
      { frequency: '5.1 Hz', amplitude: 0.62, anomaly: 'Medium', description: 'Synthetic micro-expressions detected' },
      { frequency: '8.7 Hz', amplitude: 0.43, anomaly: 'Low', description: 'Minor temporal inconsistencies' }
    ],
    anomalies: [
      { type: 'Pixel Interpolation', severity: 'Critical', location: 'Eyes region', description: 'Detected non-natural pixel blending patterns' },
      { type: 'Color Space Mismatch', severity: 'High', location: 'Jaw line', description: 'Inconsistent color space conversion artifacts' },
      { type: 'Edge Sharpening', severity: 'Medium', location: 'Hair boundary', description: 'Artificial edge enhancement detected' }
    ],
    technicalMetrics: {
      pixelAnalysis: 78.5,
      frequencyDomain: 82.3,
      spatialConsistency: 69.7,
      temporalCoherence: 74.1
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Result */}
      <Alert className={getConfidenceColor(result.confidence)}>
        {getRecommendationIcon(result.ensembleAnalysis.recommendedAction)}
        <AlertTitle className="text-lg font-semibold">
          {result.isDeepfake ? 'Deepfake Content Detected' : 'Content Appears Authentic'}
        </AlertTitle>
        <AlertDescription className="mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
            <div>
              <span className="text-sm text-muted-foreground">Overall Score:</span>
              <div className="font-semibold text-lg">{Math.round(result.overallScore)}%</div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Confidence:</span>
              <div className="font-semibold text-lg capitalize">{result.confidence}</div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Processing Time:</span>
              <div className="font-semibold text-lg">{result.processingTime}ms</div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="explanation" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="explanation">Explanation</TabsTrigger>
          <TabsTrigger value="traces">Traces</TabsTrigger>
          <TabsTrigger value="fingerprints">GAB Fingerprints</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
        </TabsList>

        <TabsContent value="explanation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Multi-Model Consensus Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-background rounded-lg border">
                  <div className="text-2xl font-bold text-primary">
                    {Math.round(result.ensembleAnalysis.agreementScore)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Model Agreement</div>
                </div>
                <div className="text-center p-3 bg-background rounded-lg border">
                  <div className="text-2xl font-bold">
                    {result.modelResults.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Models Used</div>
                </div>
                <div className="text-center p-3 bg-background rounded-lg border">
                  <div className="text-2xl font-bold">
                    {result.ensembleAnalysis.consensusReached ? '✓' : '⚠'}
                  </div>
                  <div className="text-sm text-muted-foreground">Consensus</div>
                </div>
                <div className="text-center p-3 bg-background rounded-lg border">
                  <div className="text-2xl font-bold">
                    {Math.round(detailedAnalysis.technicalMetrics.pixelAnalysis)}%
                  </div>
                  <div className="text-sm text-muted-foreground">Pixel Analysis</div>
                </div>
              </div>
              
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold mb-2">Analysis Explanation</h4>
                <p className="text-sm mb-3">{result.ensembleAnalysis.explanation}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Frequency Domain Analysis</span>
                    <span className="text-sm font-medium">{detailedAnalysis.technicalMetrics.frequencyDomain}%</span>
                  </div>
                  <Progress value={detailedAnalysis.technicalMetrics.frequencyDomain} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Spatial Consistency</span>
                    <span className="text-sm font-medium">{detailedAnalysis.technicalMetrics.spatialConsistency}%</span>
                  </div>
                  <Progress value={detailedAnalysis.technicalMetrics.spatialConsistency} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Temporal Coherence</span>
                    <span className="text-sm font-medium">{detailedAnalysis.technicalMetrics.temporalCoherence}%</span>
                  </div>
                  <Progress value={detailedAnalysis.technicalMetrics.temporalCoherence} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traces" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Detection Traces
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detailedAnalysis.traces.map((trace, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{trace.type}</h4>
                      <Badge variant={trace.confidence > 80 ? 'destructive' : trace.confidence > 60 ? 'default' : 'secondary'}>
                        {trace.confidence}% confidence
                      </Badge>
                    </div>
                    <Progress value={trace.confidence} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{trace.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fingerprints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fingerprint className="h-5 w-5" />
                GAB (Gabor) Fingerprint Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detailedAnalysis.gabFingerprints.map((fingerprint, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div>
                        <span className="text-sm text-muted-foreground">Frequency</span>
                        <div className="font-semibold">{fingerprint.frequency}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Amplitude</span>
                        <div className="font-semibold">{fingerprint.amplitude}</div>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Anomaly Level</span>
                        <Badge variant={fingerprint.anomaly === 'High' ? 'destructive' : fingerprint.anomaly === 'Medium' ? 'default' : 'secondary'}>
                          {fingerprint.anomaly}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{fingerprint.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Detected Anomalies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detailedAnalysis.anomalies.map((anomaly, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{anomaly.type}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant={anomaly.severity === 'Critical' ? 'destructive' : anomaly.severity === 'High' ? 'default' : 'secondary'}>
                          {anomaly.severity}
                        </Badge>
                        <Badge variant="outline">{anomaly.location}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{anomaly.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Individual Model Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Individual Model Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {result.modelResults.map((modelResult, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{modelResult.modelName}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {modelResult.processingTime}ms
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={modelResult.score > 60 ? 'destructive' : 'secondary'}
                    className="mb-1"
                  >
                    {Math.round(modelResult.score)}% risk
                  </Badge>
                </div>
              </div>
              
              <Progress 
                value={modelResult.score} 
                className="mb-3"
              />
              
              <p className="text-sm text-muted-foreground mb-2">
                {modelResult.analysis}
              </p>
              
              {modelResult.artifacts.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {modelResult.artifacts.map((artifact, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {artifact}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Technical Performance Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold">
                {Math.round(result.processingTime / 1000 * 10) / 10}s
              </div>
              <div className="text-xs text-muted-foreground">Total Time</div>
            </div>
            <div>
              <div className="text-lg font-semibold">
                {result.modelResults.length}
              </div>
              <div className="text-xs text-muted-foreground">Models</div>
            </div>
            <div>
              <div className="text-lg font-semibold">
                {result.modelResults.reduce((sum, r) => sum + r.artifacts.length, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Artifacts</div>
            </div>
            <div>
              <div className="text-lg font-semibold">
                {Math.round(result.ensembleAnalysis.agreementScore)}%
              </div>
              <div className="text-xs text-muted-foreground">Agreement</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
