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
