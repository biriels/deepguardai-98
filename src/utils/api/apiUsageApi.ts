
import { supabase } from '@/integrations/supabase/client';

export interface ApiUsage {
  id: string;
  user_id: string;
  endpoint: string;
  method: string;
  status_code: number | null;
  response_time_ms: number | null;
  request_size_bytes: number | null;
  response_size_bytes: number | null;
  created_at: string;
}

export const apiUsageApi = {
  // Log API usage
  logUsage: async (usage: Omit<ApiUsage, 'id' | 'user_id' | 'created_at'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('api_usage')
      .insert([{ ...usage, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get API usage stats for current user
  getUsageStats: async (timeframe: 'day' | 'week' | 'month' = 'week') => {
    let dateFilter = new Date();
    
    switch (timeframe) {
      case 'day':
        dateFilter.setDate(dateFilter.getDate() - 1);
        break;
      case 'week':
        dateFilter.setDate(dateFilter.getDate() - 7);
        break;
      case 'month':
        dateFilter.setMonth(dateFilter.getMonth() - 1);
        break;
    }

    const { data, error } = await supabase
      .from('api_usage')
      .select('*')
      .gte('created_at', dateFilter.toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get usage summary
  getUsageSummary: async () => {
    const { data, error } = await supabase
      .from('api_usage')
      .select('endpoint, method, status_code')
      .order('created_at', { ascending: false })
      .limit(1000);

    if (error) throw error;
    
    // Process data to create summary
    const summary = {
      totalRequests: data.length,
      successfulRequests: data.filter(item => item.status_code && item.status_code < 400).length,
      errorRequests: data.filter(item => item.status_code && item.status_code >= 400).length,
      endpointStats: {} as Record<string, number>,
    };

    data.forEach(item => {
      summary.endpointStats[item.endpoint] = (summary.endpointStats[item.endpoint] || 0) + 1;
    });

    return summary;
  },
};
