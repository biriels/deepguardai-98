
import { supabase } from '@/integrations/supabase/client';

export interface EnhancedAnalysisResult {
  isDeepfake: boolean;
  detectionScore: number;
  confidenceLevel: string;
  modelName: string;
  analysisDetails: any;
  totalProcessingTime: number;
  contentType?: 'image' | 'video' | 'audio' | 'text';
}

export interface ModelResult {
  modelName: string;
  score: number;
  analysis: string;
  artifacts: string[];
  processingTime: number;
}

export interface EnsembleAnalysis {
  agreementScore: number;
  consensusReached: boolean;
  recommendedAction: 'accept' | 'review' | 'reject';
  explanation: string;
}

export interface EnhancedDetectionResult {
  id: string;
  isDeepfake: boolean;
  overallScore: number;
  confidence: 'high' | 'medium' | 'low';
  processingTime: number;
  modelResults: ModelResult[];
  ensembleAnalysis: EnsembleAnalysis;
}

export const storeDetectionResult = async (
  fileName: string,
  fileUrl: string,
  detectionScore: number,
  isDeepfake: boolean,
  confidenceLevel: string,
  analysisDetails: EnhancedAnalysisResult,
  userId: string
) => {
  try {
    const { data, error } = await supabase
      .from('detection_results')
      .insert({
        file_name: fileName,
        file_url: fileUrl,
        detection_score: detectionScore,
        is_deepfake: isDeepfake,
        confidence_level: confidenceLevel,
        analysis_details: analysisDetails as any,
        user_id: userId,
        processing_time_ms: analysisDetails.totalProcessingTime
      });

    if (error) {
      console.error('Error storing detection result:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to store detection result:', error);
    throw error;
  }
};

export const updateDetectionResult = async (
    id: string,
    updates: Partial<{
      file_name: string;
      file_url: string;
      detection_score: number;
      is_deepfake: boolean;
      confidence_level: string;
      analysis_details: any;
      user_id: string;
      processing_time_ms: number;
    }>
  ) => {
    try {
      const { data, error } = await supabase
        .from('detection_results')
        .update(updates)
        .eq('id', id)
        .select();
  
      if (error) {
        console.error('Error updating detection result:', error);
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Failed to update detection result:', error);
      throw error;
    }
  };

export const getDetectionResult = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('detection_results')
        .select('*')
        .eq('id', id)
        .single();
  
      if (error) {
        console.error('Error fetching detection result:', error);
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Failed to fetch detection result:', error);
      throw error;
    }
  };

export const deleteDetectionResult = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('detection_results')
        .delete()
        .eq('id', id);
  
      if (error) {
        console.error('Error deleting detection result:', error);
        throw error;
      }
  
      return data;
    } catch (error) {
      console.error('Failed to delete detection result:', error);
      throw error;
    }
  };

// Enhanced Detection Service
export const enhancedDetectionService = {
  async analyzeContentWithMultipleModels(
    content: File | string,
    selectedModels?: string[]
  ): Promise<EnhancedDetectionResult> {
    const startTime = Date.now();
    
    // Mock implementation for demonstration
    const mockModels = selectedModels || [
      'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
      'HuggingFace-CLIP',
      'Replicate-DeepFake-Detector'
    ];

    const modelResults: ModelResult[] = mockModels.map((modelName, index) => {
      const score = Math.random() * 100;
      const artifacts = score > 70 ? ['facial_inconsistency', 'temporal_artifacts'] : [];
      
      return {
        modelName,
        score,
        analysis: score > 70 ? 'High probability of manipulation detected' : 'Content appears authentic',
        artifacts,
        processingTime: Math.random() * 2000 + 500
      };
    });

    const averageScore = modelResults.reduce((sum, result) => sum + result.score, 0) / modelResults.length;
    const agreementScore = this.calculateAgreementScore(modelResults);
    const confidence = averageScore > 80 ? 'high' : averageScore > 50 ? 'medium' : 'low';
    
    const processingTime = Date.now() - startTime;

    return {
      id: `result_${Date.now()}`,
      isDeepfake: averageScore > 60,
      overallScore: averageScore,
      confidence,
      processingTime,
      modelResults,
      ensembleAnalysis: {
        agreementScore,
        consensusReached: agreementScore > 70,
        recommendedAction: averageScore > 80 ? 'reject' : averageScore > 50 ? 'review' : 'accept',
        explanation: `${modelResults.length} models analyzed the content with ${agreementScore}% agreement. ${
          averageScore > 60 ? 'Multiple models detected signs of manipulation.' : 'Content appears to be authentic.'
        }`
      }
    };
  },

  calculateAgreementScore(results: ModelResult[]): number {
    if (results.length < 2) return 100;
    
    const classifications = results.map(r => r.score > 60);
    const agreement = classifications.filter(c => c === classifications[0]).length;
    return Math.round((agreement / results.length) * 100);
  }
};
