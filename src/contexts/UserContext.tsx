
import React, { createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuthContext } from './AuthContext';

type UserPlan = 'standard' | 'premium';

interface UserContextType {
  userPlan: UserPlan;
  togglePlan: () => void;
  signOut: () => void;
  email: string;
  isAuthenticated: boolean;
  user: any;
  profile: any;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { toast } = useToast();
  const { user, profile, userRole, signOut: authSignOut } = useAuthContext();
  
  // Determine user plan based on role
  const userPlan: UserPlan = userRole?.role === 'premium' ? 'premium' : 'standard';
  
  const togglePlan = () => {
    const newPlan = userPlan === 'premium' ? 'standard' : 'premium';
    toast({
      title: "Plan Update",
      description: `Plan changes require admin approval. Current plan: ${userPlan}`,
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
      profile
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
