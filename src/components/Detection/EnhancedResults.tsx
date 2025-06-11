
/**
 * Enhanced Results Display with Multiple Model Analysis
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Brain, 
  Users, 
  Clock,
  TrendingUp,
  Shield
} from 'lucide-react';
import { EnhancedDetectionResult } from '@/utils/ai/enhancedDetection';

interface EnhancedResultsProps {
  result: EnhancedDetectionResult;
}

export const EnhancedResults: React.FC<EnhancedResultsProps> = ({ result }) => {
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

  return (
    <div className="space-y-6">
      {/* Overall Result */}
      <Alert className={getConfidenceColor(result.confidence)}>
        {getRecommendationIcon(result.ensembleAnalysis.recommendedAction)}
        <AlertTitle>
          {result.isDeepfake ? 'Deepfake Content Detected' : 'Content Appears Authentic'}
        </AlertTitle>
        <AlertDescription>
          Overall Score: <span className="font-semibold">{Math.round(result.overallScore)}%</span> • 
          Confidence: <span className="font-semibold capitalize">{result.confidence}</span> • 
          Processed in {result.processingTime}ms
        </AlertDescription>
      </Alert>

      {/* Ensemble Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Multi-Model Consensus Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Recommendation:</strong> {result.ensembleAnalysis.explanation}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Individual Model Results */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
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
            Analysis Performance
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
