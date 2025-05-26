
import { supabase } from '@/integrations/supabase/client';

export interface MonitoringAlert {
  id: string;
  user_id: string;
  alert_type: 'detection' | 'threshold' | 'system' | 'security';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  metadata: any;
  is_read: boolean;
  created_at: string;
}

export const alertsApi = {
  // Get all alerts for current user
  getAlerts: async () => {
    const { data, error } = await supabase
      .from('monitoring_alerts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get unread alerts count
  getUnreadCount: async () => {
    const { count, error } = await supabase
      .from('monitoring_alerts')
      .select('*', { count: 'exact' })
      .eq('is_read', false);

    if (error) throw error;
    return count || 0;
  },

  // Mark alert as read
  markAsRead: async (id: string) => {
    const { data, error } = await supabase
      .from('monitoring_alerts')
      .update({ is_read: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Mark all alerts as read
  markAllAsRead: async () => {
    const { error } = await supabase
      .from('monitoring_alerts')
      .update({ is_read: true })
      .eq('is_read', false);

    if (error) throw error;
  },

  // Create a new alert (for system use)
  createAlert: async (alert: Omit<MonitoringAlert, 'id' | 'user_id' | 'created_at'>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('monitoring_alerts')
      .insert([{ ...alert, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
