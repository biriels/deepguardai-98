
import { supabase } from '@/integrations/supabase/client';

export interface DashboardMetrics {
  totalDetections: number;
  deepfakesDetected: number;
  detectionAccuracy: number;
  mediaAnalyzed: number;
  recentDetections: RecentDetection[];
}

export interface RecentDetection {
  id: string;
  fileName: string;
  isDeepfake: boolean;
  detectionScore: number;
  createdAt: string;
  contentType: 'image' | 'video' | 'audio' | 'text';
}

export const getDashboardMetrics = async (): Promise<DashboardMetrics> => {
  try {
    // Get total detections count
    const { count: totalDetections } = await supabase
      .from('detection_results')
      .select('*', { count: 'exact' });

    // Get deepfakes detected count
    const { count: deepfakesDetected } = await supabase
      .from('detection_results')
      .select('*', { count: 'exact' })
      .eq('is_deepfake', true);

    // Get recent detections with details
    const { data: recentDetectionsData } = await supabase
      .from('detection_results')
      .select('id, file_name, is_deepfake, detection_score, created_at, analysis_details')
      .order('created_at', { ascending: false })
      .limit(10);

    // Calculate accuracy based on confidence levels
    const { data: confidenceData } = await supabase
      .from('detection_results')
      .select('confidence_level, detection_score')
      .not('confidence_level', 'is', null);

    const totalConfidenceScores = confidenceData?.length || 0;
    const highConfidenceCount = confidenceData?.filter(d => d.confidence_level === 'high').length || 0;
    const mediumConfidenceCount = confidenceData?.filter(d => d.confidence_level === 'medium').length || 0;
    
    // Calculate weighted accuracy
    const detectionAccuracy = totalConfidenceScores > 0 
      ? Math.round(((highConfidenceCount * 0.95) + (mediumConfidenceCount * 0.85)) / totalConfidenceScores * 100)
      : 95;

    // Process recent detections
    const recentDetections: RecentDetection[] = recentDetectionsData?.map(detection => {
      const analysisDetails = detection.analysis_details as any;
      const contentType = analysisDetails?.contentType || 'image';
      
      return {
        id: detection.id,
        fileName: detection.file_name,
        isDeepfake: detection.is_deepfake,
        detectionScore: detection.detection_score,
        createdAt: detection.created_at,
        contentType: contentType
      };
    }) || [];

    return {
      totalDetections: totalDetections || 0,
      deepfakesDetected: deepfakesDetected || 0,
      detectionAccuracy,
      mediaAnalyzed: totalDetections || 0,
      recentDetections
    };
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error);
    // Return fallback data
    return {
      totalDetections: 0,
      deepfakesDetected: 0,
      detectionAccuracy: 95,
      mediaAnalyzed: 0,
      recentDetections: []
    };
  }
};

export const getChartData = async (timeframe: 'daily' | 'weekly' | 'yearly' = 'weekly') => {
  try {
    let dateFilter = new Date();
    let groupBy = '';
    let timeFormat = '';
    
    switch (timeframe) {
      case 'daily':
        dateFilter.setDate(dateFilter.getDate() - 7);
        groupBy = "DATE_TRUNC('day', created_at)";
        timeFormat = 'Day';
        break;
      case 'weekly':
        dateFilter.setDate(dateFilter.getDate() - 28);
        groupBy = "DATE_TRUNC('week', created_at)";
        timeFormat = 'Week';
        break;
      case 'yearly':
        dateFilter.setFullYear(dateFilter.getFullYear() - 1);
        groupBy = "DATE_TRUNC('month', created_at)";
        timeFormat = 'Month';
        break;
    }

    const { data } = await supabase
      .from('detection_results')
      .select('created_at, is_deepfake, confidence_level')
      .gte('created_at', dateFilter.toISOString());

    if (!data || data.length === 0) {
      // Return empty data structure for the chart
      return [];
    }

    // Group data by time periods
    const groupedData = data.reduce((acc: any, detection) => {
      const date = new Date(detection.created_at);
      let key = '';
      
      switch (timeframe) {
        case 'daily':
          key = date.toLocaleDateString('en-US', { weekday: 'short' });
          break;
        case 'weekly':
          key = `Week ${Math.ceil(date.getDate() / 7)}`;
          break;
        case 'yearly':
          key = date.toLocaleDateString('en-US', { month: 'short' });
          break;
      }

      if (!acc[key]) {
        acc[key] = {
          name: key,
          deepfakes: 0,
          genuine: 0,
          accuracy: 0,
          total: 0
        };
      }

      if (detection.is_deepfake) {
        acc[key].deepfakes++;
      } else {
        acc[key].genuine++;
      }
      
      acc[key].total++;
      
      // Calculate accuracy based on confidence
      if (detection.confidence_level === 'high') {
        acc[key].accuracy = Math.max(acc[key].accuracy, 95);
      } else if (detection.confidence_level === 'medium') {
        acc[key].accuracy = Math.max(acc[key].accuracy, 85);
      } else {
        acc[key].accuracy = Math.max(acc[key].accuracy, 75);
      }

      return acc;
    }, {});

    return Object.values(groupedData);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    return [];
  }
};
