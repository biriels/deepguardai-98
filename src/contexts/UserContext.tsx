
import React, { createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuthContext } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

type UserPlan = 'standard' | 'starter' | 'professional';

interface UserContextType {
  userPlan: UserPlan;
  togglePlan: () => void;
  signOut: () => void;
  email: string;
  isAuthenticated: boolean;
  user: any;
  profile: any;
  refreshUserPlan: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { user, profile, userRole, signOut: authSignOut } = useAuthContext();
  
  // Determine user plan based on role and user plans table
  const getUserPlan = (): UserPlan => {
    if (userRole?.role === 'premium') return 'professional';
    if (userRole?.role === 'starter') return 'starter';
    return 'standard';
  };

  const userPlan = getUserPlan();

  const refreshUserPlan = async () => {
    if (!user) return;
    
    try {
      console.log('Refreshing user plan for user:', user.id);
      
      // Check user_plans table for active subscription
      const { data: userPlanData, error: planError } = await supabase
        .from('user_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      if (planError && planError.code !== 'PGRST116') {
        console.error('Error fetching user plan:', planError);
        return;
      }

      let newRole = 'standard';
      if (userPlanData) {
        if (userPlanData.plan_type === 'professional') {
          newRole = 'premium';
        } else if (userPlanData.plan_type === 'starter') {
          newRole = 'starter';
        }
      }

      // Update user role based on active subscription
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert({
          user_id: user.id,
          role: newRole
        }, {
          onConflict: 'user_id'
        });

      if (roleError) {
        console.error('Error updating user role:', roleError);
      } else {
        console.log('User plan refreshed successfully:', newRole);
        // Force a page reload to reflect the new plan
        window.location.reload();
      }
    } catch (error) {
      console.error('Error refreshing user plan:', error);
    }
  };
  
  const togglePlan = () => {
    const newPlan = userPlan === 'professional' ? 'standard' : 'professional';
    toast({
      title: "Plan Update",
      description: `Plan changes require payment. Current plan: ${userPlan}`,
    });
  };

  const signOut = async () => {
    try {
      await authSignOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out."
      });
    } catch (error) {
      toast({
        title: "Sign Out Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <UserContext.Provider value={{ 
      userPlan, 
      togglePlan, 
      signOut,
      email: user?.email || profile?.email || "guest@example.com",
      isAuthenticated: !!user,
      user,
      profile,
      refreshUserPlan
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
