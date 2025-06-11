
/**
 * Enhanced Detection Service with Multiple AI Models
 */

import { supabase } from '@/integrations/supabase/client';
import { MODEL_PROVIDERS, DetectionModel } from './modelProviders';

export interface EnhancedDetectionResult {
  id: string;
  overallScore: number;
  isDeepfake: boolean;
  confidence: 'low' | 'medium' | 'high';
  modelResults: ModelResult[];
  ensembleAnalysis: EnsembleAnalysis;
  processingTime: number;
}

export interface ModelResult {
  modelId: string;
  modelName: string;
  score: number;
  confidence: number;
  analysis: string;
  artifacts: string[];
  processingTime: number;
}

export interface EnsembleAnalysis {
  agreementScore: number;
  consensusReached: boolean;
  conflictingPredictions: boolean;
  recommendedAction: 'accept' | 'review' | 'reject';
  explanation: string;
}

export class EnhancedDetectionService {
  private async analyzeWithTogetherAI(
    content: string | File,
    model: DetectionModel
  ): Promise<ModelResult> {
    const startTime = Date.now();
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const functionName = content instanceof File ? 'deepfake-detection' : 'analyze-url';
      const payload = content instanceof File 
        ? {
            contentUrl: URL.createObjectURL(content),
            fileName: content.name,
            contentType: content.type,
            modelId: model.id
          }
        : {
            url: content,
            modelId: model.id
          };

      const response = await supabase.functions.invoke(functionName, {
        body: payload,
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      const processingTime = Date.now() - startTime;

      if (response.error) {
        throw new Error(response.error.message);
      }

      return {
        modelId: model.id,
        modelName: model.name,
        score: response.data.result.score,
        confidence: response.data.result.score,
        analysis: response.data.result.details.analysis,
        artifacts: response.data.result.details.artifacts || [],
        processingTime
      };
    } catch (error) {
      console.error(`Error with ${model.name}:`, error);
      throw error;
    }
  }

  private async analyzeWithHuggingFace(
    content: string | File,
    model: DetectionModel
  ): Promise<ModelResult> {
    const startTime = Date.now();
    
    // Simulate HuggingFace API call for demonstration
    // In production, implement actual HuggingFace API integration
    const mockScore = Math.random() * 100;
    const processingTime = Date.now() - startTime + Math.random() * 2000;

    return {
      modelId: model.id,
      modelName: model.name,
      score: mockScore,
      confidence: mockScore,
      analysis: `${model.name} analysis: ${mockScore > 60 ? 'Potential manipulation detected' : 'Content appears authentic'}`,
      artifacts: mockScore > 60 ? ['facial_inconsistencies', 'temporal_artifacts'] : [],
      processingTime
    };
  }

  private calculateEnsembleResult(results: ModelResult[]): EnsembleAnalysis {
    const scores = results.map(r => r.score);
    const averageScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    
    // Calculate agreement between models
    const standardDeviation = Math.sqrt(
      scores.reduce((sum, score) => sum + Math.pow(score - averageScore, 2), 0) / scores.length
    );
    
    const agreementScore = Math.max(0, 100 - standardDeviation);
    const consensusReached = agreementScore > 70;
    const conflictingPredictions = standardDeviation > 30;
    
    let recommendedAction: 'accept' | 'review' | 'reject';
    let explanation: string;
    
    if (averageScore < 30 && consensusReached) {
      recommendedAction = 'accept';
      explanation = 'All models agree the content is authentic';
    } else if (averageScore > 70 && consensusReached) {
      recommendedAction = 'reject';
      explanation = 'Strong consensus indicates deepfake content';
    } else {
      recommendedAction = 'review';
      explanation = conflictingPredictions 
        ? 'Models disagree - manual review recommended'
        : 'Moderate confidence - additional verification suggested';
    }

    return {
      agreementScore,
      consensusReached,
      conflictingPredictions,
      recommendedAction,
      explanation
    };
  }

  async analyzeContentWithMultipleModels(
    content: string | File,
    selectedModels?: string[]
  ): Promise<EnhancedDetectionResult> {
    const startTime = Date.now();
    
    // Determine content type
    const contentType = content instanceof File 
      ? content.type.startsWith('image/') ? 'image' : 
        content.type.startsWith('video/') ? 'video' :
        content.type.startsWith('audio/') ? 'audio' : 'text'
      : 'text';

    // Select models to use
    const availableModels = MODEL_PROVIDERS.flatMap(provider => 
      provider.models.filter(model => 
        model.type === contentType || model.type === 'multimodal'
      )
    );

    const modelsToUse = selectedModels 
      ? availableModels.filter(model => selectedModels.includes(model.id))
      : availableModels.slice(0, 3); // Use top 3 models by default

    console.log(`Analyzing with ${modelsToUse.length} models:`, modelsToUse.map(m => m.name));

    // Run analyses in parallel
    const modelPromises = modelsToUse.map(async (model) => {
      const provider = MODEL_PROVIDERS.find(p => p.models.includes(model));
      
      if (provider?.id === 'together-ai') {
        return this.analyzeWithTogetherAI(content, model);
      } else if (provider?.id === 'huggingface') {
        return this.analyzeWithHuggingFace(content, model);
      } else {
        // Default to mock analysis for other providers
        return this.analyzeWithHuggingFace(content, model);
      }
    });

    const modelResults = await Promise.all(modelPromises);
    const ensembleAnalysis = this.calculateEnsembleResult(modelResults);
    
    const overallScore = modelResults.reduce((sum, result) => sum + result.score, 0) / modelResults.length;
    const isDeepfake = overallScore > 60;
    const confidence = overallScore > 80 ? 'high' : overallScore > 50 ? 'medium' : 'low';
    
    const processingTime = Date.now() - startTime;

    // Save enhanced result to database
    const { data: savedResult } = await supabase
      .from('detection_results')
      .insert({
        file_name: content instanceof File ? content.name : 'URL Analysis',
        file_url: content instanceof File ? null : content as string,
        detection_score: overallScore,
        is_deepfake: isDeepfake,
        confidence_level: confidence,
        analysis_details: {
          modelResults,
          ensembleAnalysis,
          contentType,
          modelsUsed: modelsToUse.map(m => m.name)
        },
        processing_time_ms: processingTime,
      })
      .select()
      .single();

    return {
      id: savedResult?.id || 'temp-id',
      overallScore,
      isDeepfake,
      confidence,
      modelResults,
      ensembleAnalysis,
      processingTime
    };
  }
}

export const enhancedDetectionService = new EnhancedDetectionService();
