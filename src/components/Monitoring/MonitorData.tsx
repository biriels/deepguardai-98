
import { MonitorPlay, PauseCircle, RefreshCw } from "lucide-react";
import { ActivityEvent, ApiMonitor, NetworkStatus, SocialMonitor, WebsiteMonitor } from "./MonitorTypes";

export const initialSocialMonitors: SocialMonitor[] = [
  { 
    id: "s1",
    name: "Twitter #AI Trend Monitor", 
    status: "active", 
    lastCheck: "1 min ago", 
    detectionRate: 82, 
    platform: "Twitter",
    alerts: 24
  },
  { 
    id: "s2",
    name: "Instagram Profile Guard", 
    status: "active", 
    lastCheck: "Just now", 
    detectionRate: 95, 
    platform: "Instagram",
    alerts: 8
  },
  { 
    id: "s3",
    name: "TikTok Trending Videos", 
    status: "paused", 
    lastCheck: "1 hour ago", 
    detectionRate: 78, 
    platform: "TikTok",
    alerts: 17
  },
  { 
    id: "s4",
    name: "LinkedIn Company Posts", 
    status: "active", 
    lastCheck: "5 mins ago", 
    detectionRate: 91, 
    platform: "LinkedIn",
    alerts: 2
  }
];

export const initialWebsiteMonitors: WebsiteMonitor[] = [
  { 
    id: "w1",
    name: "News Site Homepage", 
    status: "active", 
    lastCheck: "3 mins ago", 
    detectionRate: 89, 
    url: "newssource.com",
    alerts: 12
  },
  { 
    id: "w2",
    name: "E-commerce Listings", 
    status: "active", 
    lastCheck: "Just now", 
    detectionRate: 93, 
    url: "bigretailer.com/products",
    alerts: 3
  }
];

export const initialApiMonitors: ApiMonitor[] = [
  { 
    id: "a1",
    name: "Custom API Endpoint", 
    status: "active", 
    lastCheck: "7 mins ago", 
    detectionRate: 91, 
    endpoint: "api.example.com/media",
    alerts: 5
  }
];

export const initialNetworkStatus: NetworkStatus = {
  connected: true,
  latency: 24,
  apiResponse: 128,
  availability: 99.8
};

export const initialActivity: ActivityEvent[] = [
  {
    id: "act1",
    event: "New platform connected",
    details: "YouTube channel monitoring added",
    time: "12 minutes ago",
    icon: <MonitorPlay className="h-4 w-4 text-violet-500" />
  },
  {
    id: "act2",
    event: "Detection threshold updated",
    details: "Twitter monitor sensitivity increased to 85%",
    time: "1 hour ago",
    icon: <RefreshCw className="h-4 w-4 text-amber-500" />
  },
  {
    id: "act3",
    event: "Monitor paused",
    details: "TikTok Trending Videos monitor temporarily disabled",
    time: "2 hours ago",
    icon: <PauseCircle className="h-4 w-4 text-red-500" />
  },
];
