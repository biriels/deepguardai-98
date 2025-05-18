
export type MonitorPlatform = "Twitter" | "Instagram" | "TikTok" | "LinkedIn" | "YouTube";

export type WebsiteMonitor = {
  id: string;
  name: string;
  status: "active" | "paused";
  lastCheck: string;
  detectionRate: number;
  url: string;
  alerts: number;
};

export type SocialMonitor = {
  id: string;
  name: string;
  status: "active" | "paused";
  lastCheck: string;
  detectionRate: number;
  platform: MonitorPlatform;
  alerts: number;
};

export type ApiMonitor = {
  id: string;
  name: string;
  status: "active" | "paused";
  lastCheck: string;
  detectionRate: number;
  endpoint: string;
  alerts: number;
};

export type NetworkStatus = {
  connected: boolean;
  latency: number;
  apiResponse: number;
  availability: number;
};

export type ActivityEvent = {
  id: string;
  event: string;
  details: string;
  time: string;
  icon: JSX.Element;
};

export type MonitorFormData = {
  name: string;
  platform: MonitorPlatform;
  url: string;
  endpoint: string;
};
