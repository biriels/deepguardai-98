
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

type UserPlan = 'standard' | 'premium';

interface UserContextType {
  userPlan: UserPlan;
  togglePlan: () => void;
  signOut: () => void;
  email: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userPlan, setUserPlan] = useState<UserPlan>('premium');
  const { toast } = useToast();
  
  const togglePlan = () => {
    const newPlan = userPlan === 'premium' ? 'standard' : 'premium';
    setUserPlan(newPlan);
    toast({
      title: "Plan Updated",
      description: `You are now on the ${newPlan.charAt(0).toUpperCase() + newPlan.slice(1)} plan.`
    });
  };

  const signOut = () => {
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out."
    });
    // In a real app, this would clear auth tokens, redirect to login, etc.
    console.log("User signed out");
  };

  return (
    <UserContext.Provider value={{ 
      userPlan, 
      togglePlan, 
      signOut,
      email: "sam@example.com" 
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
