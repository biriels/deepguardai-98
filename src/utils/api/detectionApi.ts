
import { supabase } from '@/integrations/supabase/client';

export interface DetectionResult {
  id: string;
  user_id: string;
  file_name: string;
  file_url: string | null;
  detection_score: number;
  is_deepfake: boolean;
  confidence_level: 'low' | 'medium' | 'high' | null;
  analysis_details: any;
  processing_time_ms: number | null;
  created_at: string;
  updated_at: string;
}

export const detectionApi = {
  // Create a new detection result
  createDetection: async (detection: Omit<DetectionResult, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    const { data, error } = await supabase
      .from('detection_results')
      .insert([detection])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get all detection results for current user
  getDetections: async () => {
    const { data, error } = await supabase
      .from('detection_results')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get a specific detection result
  getDetection: async (id: string) => {
    const { data, error } = await supabase
      .from('detection_results')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Update a detection result
  updateDetection: async (id: string, updates: Partial<DetectionResult>) => {
    const { data, error } = await supabase
      .from('detection_results')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a detection result
  deleteDetection: async (id: string) => {
    const { error } = await supabase
      .from('detection_results')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
