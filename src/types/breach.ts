
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

export interface BreachDetectionResult {
  email: string;
  isBreached: boolean;
  breaches: BreachData[];
  detectionDate: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  totalBreaches: number;
  mostRecentBreach?: BreachData;
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
