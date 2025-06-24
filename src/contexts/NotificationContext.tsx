
import React, { createContext, useContext, useReducer, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "critical" | "warning" | "info" | "success";
}

type NotificationState = {
  notifications: Notification[];
  unreadCount: number;
};

type NotificationAction = 
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "MARK_AS_READ"; payload: string }
  | { type: "MARK_ALL_AS_READ" }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_ALL" };

const initialState: NotificationState = {
  notifications: [
    {
      id: "1",
      title: "Critical Deepfake Detected",
      description: "A video impersonating a political figure has been detected with 98% confidence.",
      time: "10 minutes ago",
      read: false,
      type: "critical"
    },
    {
      id: "2",
      title: "Detection Report Ready",
      description: "Your weekly detection activity report is now available.",
      time: "1 hour ago",
      read: false,
      type: "info"
    },
    {
      id: "3",
      title: "API Key Usage Warning",
      description: "You've used 80% of your monthly API calls quota.",
      time: "3 hours ago",
      read: false,
      type: "warning"
    },
    {
      id: "4",
      title: "System Update Complete",
      description: "Detection engine updated to version 2.4.0 with improved accuracy.",
      time: "Yesterday",
      read: true,
      type: "success"
    }
  ],
  unreadCount: 3
};

const reducer = (state: NotificationState, action: NotificationAction): NotificationState => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [action.payload, ...state.notifications],
        unreadCount: state.unreadCount + 1
      };
    case "MARK_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map(notification => 
          notification.id === action.payload ? { ...notification, read: true } : notification
        ),
        unreadCount: state.unreadCount - 1 >= 0 ? state.unreadCount - 1 : 0
      };
    case "MARK_ALL_AS_READ":
      return {
        ...state,
        notifications: state.notifications.map(notification => ({ ...notification, read: true })),
        unreadCount: 0
      };
    case "REMOVE_NOTIFICATION":
      const notificationToRemove = state.notifications.find(n => n.id === action.payload);
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload),
        unreadCount: notificationToRemove && !notificationToRemove.read 
          ? state.unreadCount - 1 >= 0 ? state.unreadCount - 1 : 0
          : state.unreadCount
      };
    case "CLEAR_ALL":
      return {
        ...state,
        notifications: [],
        unreadCount: 0
      };
    default:
      return state;
  }
};

type NotificationContextType = {
  state: NotificationState;
  addNotification: (notification: Omit<Notification, "id" | "read" | "time">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { toast } = useToast();
  const [hasShownInitialToast, setHasShownInitialToast] = useState(false);

  useEffect(() => {
    // Only show toast once per session and only if there are unread notifications
    if (!hasShownInitialToast && state.unreadCount > 0) {
      setHasShownInitialToast(true);
      // Only show if there are actually unread notifications worth mentioning
      if (state.unreadCount >= 2) {
        toast({
          title: `You have ${state.unreadCount} unread notification${state.unreadCount !== 1 ? 's' : ''}`,
          description: "Check your notifications to stay updated.",
        });
      }
    }
  }, [toast, state.unreadCount, hasShownInitialToast]);

  const addNotification = (notification: Omit<Notification, "id" | "read" | "time">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      time: "Just now"
    };
    
    dispatch({ type: "ADD_NOTIFICATION", payload: newNotification });
    
    toast({
      title: notification.title,
      description: notification.description,
    });
  };

  const markAsRead = (id: string) => {
    dispatch({ type: "MARK_AS_READ", payload: id });
  };

  const markAllAsRead = () => {
    dispatch({ type: "MARK_ALL_AS_READ" });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: "REMOVE_NOTIFICATION", payload: id });
  };

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  return (
    <NotificationContext.Provider
      value={{
        state,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
