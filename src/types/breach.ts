
export interface BreachData {
  id: string;
  name: string;
  domain: string;
  breachDate: string;
  addedDate: string;
  modifiedDate: string;
  pwnCount: number;
  description: string;
  logoPath: string;
  dataClasses: string[];
  isVerified: boolean;
  isFabricated: boolean;
  isSensitive: boolean;
  isRetired: boolean;
  isSpamList: boolean;
  isMalware: boolean;
  isSubscriptionFree: boolean;
}

export interface PhoneBreachData {
  id: string;
  phoneNumber: string;
  breachName: string;
  breachDate: string;
  description: string;
  dataExposed: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  // Enhanced phone data
  associatedName?: string;
  associatedEmail?: string;
  carrier?: string;
  location?: string;
  registrationDate?: string;
  lastActiveDate?: string;
  accountType?: string;
  socialMediaProfiles?: Array<{
    platform: string;
    username: string; 
    lastSeen: string;
  }>;
  recentLogins?: PhoneActivityLog[];
}

export interface PhoneActivityLog {
  id: string;
  activityType: 'login' | 'verification' | 'password_reset' | 'account_access';
  platform: string;
  location?: string;
  ipAddress?: string;
  timestamp: string;
  isSuccessful: boolean;
  riskScore: number;
}

export interface BreachDetectionResult {
  email: string;
  isBreached: boolean;
  breaches: BreachData[];
  detectionDate: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  totalBreaches: number;
  mostRecentBreach?: BreachData;
}

export interface PhoneBreachDetectionResult {
  phoneNumber: string;
  isBreached: boolean;
  breaches: PhoneBreachData[];
  detectionDate: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  totalBreaches: number;
  mostRecentBreach?: PhoneBreachData;
  // Enhanced phone analysis
  personalDetails?: {
    associatedName?: string;
    associatedEmails?: string[];
    carrier?: string;
    registrationDate?: string;
    lastActivity?: string;
    verificationStatus?: 'verified' | 'unverified' | 'suspicious';
    socialProfiles?: Array<{
      platform: string;
      username: string;
      lastSeen: string;
    }>;
  };
  activitySummary?: {
    totalLogins: number;
    recentLogins: PhoneActivityLog[];
    suspiciousActivity: number;
    locationPattern: string[];
  };
}

export interface RecoveryStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedTime: string;
  actionType: 'internal' | 'external' | 'guided';
  actionData?: {
    url?: string;
    provider?: string;
    template?: string;
  };
}

export interface BreachAlert {
  id: string;
  userId: string;
  email: string;
  breachData: BreachDetectionResult;
  alertSent: boolean;
  alertMethods: ('email' | 'push' | 'sms')[];
  createdAt: string;
  acknowledgedAt?: string;
  recoverySteps: RecoveryStep[];
}

export interface PhoneBreachAlert {
  id: string;
  userId: string;
  phoneNumber: string;
  breachData: PhoneBreachDetectionResult;
  alertSent: boolean;
  alertMethods: ('email' | 'push' | 'sms')[];
  createdAt: string;
  acknowledgedAt?: string;
  recoverySteps: RecoveryStep[];
}
