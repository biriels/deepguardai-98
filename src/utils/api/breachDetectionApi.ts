
import { supabase } from '@/integrations/supabase/client';
import { BreachData, BreachDetectionResult, BreachAlert, PhoneBreachData, PhoneBreachDetectionResult, PhoneBreachAlert } from '@/types/breach';

export class BreachDetectionApi {
  // Mock breach detection - in real implementation, this would integrate with HaveIBeenPwned API
  static async checkEmailBreach(email: string): Promise<BreachDetectionResult> {
    console.log(`Checking breach status for: ${email}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock breach data
    const mockBreaches: BreachData[] = [
      {
        id: 'adobe-2013',
        name: 'Adobe',
        domain: 'adobe.com',
        breachDate: '2013-10-04',
        addedDate: '2013-12-04',
        modifiedDate: '2022-05-15',
        pwnCount: 152445165,
        description: 'Adobe Creative Cloud breach exposing usernames, email addresses, and encrypted passwords',
        logoPath: '/logos/adobe.png',
        dataClasses: ['Email addresses', 'Password hints', 'Passwords', 'Usernames'],
        isVerified: true,
        isFabricated: false,
        isSensitive: false,
        isRetired: false,
        isSpamList: false,
        isMalware: false,
        isSubscriptionFree: true
      },
      {
        id: 'linkedin-2012',
        name: 'LinkedIn',
        domain: 'linkedin.com',
        breachDate: '2012-05-05',
        addedDate: '2016-05-21',
        modifiedDate: '2016-05-21',
        pwnCount: 164611595,
        description: 'LinkedIn breach exposing email addresses and passwords',
        logoPath: '/logos/linkedin.png',
        dataClasses: ['Email addresses', 'Passwords'],
        isVerified: true,
        isFabricated: false,
        isSensitive: false,
        isRetired: false,
        isSpamList: false,
        isMalware: false,
        isSubscriptionFree: true
      }
    ];

    const isBreached = Math.random() > 0.3; // 70% chance of breach for demo
    const breaches = isBreached ? mockBreaches.slice(0, Math.floor(Math.random() * 2) + 1) : [];
    
    return {
      email,
      isBreached,
      breaches,
      detectionDate: new Date().toISOString(),
      riskLevel: this.calculateRiskLevel(breaches),
      totalBreaches: breaches.length,
      mostRecentBreach: breaches.length > 0 ? breaches[0] : undefined
    };
  }

  static async checkPhoneBreach(phoneNumber: string): Promise<PhoneBreachDetectionResult> {
    console.log(`Checking phone breach status for: ${phoneNumber}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Query the phone_breaches table for this phone number
      const { data: phoneBreaches, error } = await supabase
        .from('phone_breaches')
        .select('*')
        .eq('phone_number', phoneNumber);

      if (error) {
        console.error('Error querying phone breaches:', error);
        // Fall back to mock data if database query fails
        return this.getMockPhoneBreachResult(phoneNumber);
      }

      const breaches: PhoneBreachData[] = phoneBreaches?.map(breach => ({
        id: breach.id,
        phoneNumber: breach.phone_number,
        breachName: breach.breach_name,
        breachDate: breach.breach_date,
        description: breach.description || '',
        dataExposed: breach.data_exposed || [],
        severity: breach.severity as 'low' | 'medium' | 'high' | 'critical',
        source: breach.source || '',
        isVerified: breach.is_verified || false,
        createdAt: breach.created_at,
        updatedAt: breach.updated_at
      })) || [];

      const isBreached = breaches.length > 0;
      const riskLevel = this.calculatePhoneRiskLevel(breaches);

      return {
        phoneNumber,
        isBreached,
        breaches,
        detectionDate: new Date().toISOString(),
        riskLevel,
        totalBreaches: breaches.length,
        mostRecentBreach: breaches.length > 0 ? breaches[0] : undefined
      };
    } catch (error) {
      console.error('Error in phone breach check:', error);
      return this.getMockPhoneBreachResult(phoneNumber);
    }
  }

  private static getMockPhoneBreachResult(phoneNumber: string): PhoneBreachDetectionResult {
    // Mock phone breach data for demonstration
    const mockPhoneBreaches: PhoneBreachData[] = [
      {
        id: 'telecom-2023',
        phoneNumber,
        breachName: 'TelecomBreach2023',
        breachDate: '2023-08-15',
        description: 'Major telecom provider data breach exposing customer phone numbers and personal information',
        dataExposed: ['Phone numbers', 'Names', 'Addresses', 'Account details'],
        severity: 'high',
        source: 'TelecomCorp',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'social-2023',
        phoneNumber,
        breachName: 'SocialMediaLeak',
        breachDate: '2023-11-22',
        description: 'Social media platform leaked user phone numbers used for 2FA verification',
        dataExposed: ['Phone numbers', 'User IDs', '2FA codes'],
        severity: 'critical',
        source: 'SocialApp',
        isVerified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const isBreached = Math.random() > 0.4; // 60% chance of breach for demo
    const breaches = isBreached ? mockPhoneBreaches.slice(0, Math.floor(Math.random() * 2) + 1) : [];
    
    return {
      phoneNumber,
      isBreached,
      breaches,
      detectionDate: new Date().toISOString(),
      riskLevel: this.calculatePhoneRiskLevel(breaches),
      totalBreaches: breaches.length,
      mostRecentBreach: breaches.length > 0 ? breaches[0] : undefined
    };
  }

  static calculateRiskLevel(breaches: BreachData[]): 'low' | 'medium' | 'high' | 'critical' {
    if (breaches.length === 0) return 'low';
    if (breaches.length >= 3) return 'critical';
    if (breaches.some(b => b.dataClasses.includes('Passwords'))) return 'high';
    return 'medium';
  }

  static calculatePhoneRiskLevel(breaches: PhoneBreachData[]): 'low' | 'medium' | 'high' | 'critical' {
    if (breaches.length === 0) return 'low';
    if (breaches.some(b => b.severity === 'critical')) return 'critical';
    if (breaches.length >= 3 || breaches.some(b => b.severity === 'high')) return 'high';
    return 'medium';
  }

  static async saveBreachAlert(alert: Omit<BreachAlert, 'id' | 'createdAt'>): Promise<string> {
    // In real implementation, this would save to Supabase
    const alertId = `alert_${Date.now()}`;
    console.log('Saving breach alert:', alertId, alert);
    return alertId;
  }

  static async savePhoneBreachAlert(alert: Omit<PhoneBreachAlert, 'id' | 'createdAt'>): Promise<string> {
    // In real implementation, this would save to Supabase
    const alertId = `phone_alert_${Date.now()}`;
    console.log('Saving phone breach alert:', alertId, alert);
    return alertId;
  }

  static async getBreachAlerts(userId: string): Promise<BreachAlert[]> {
    // Mock data for demo
    return [];
  }

  static async getPhoneBreachAlerts(userId: string): Promise<PhoneBreachAlert[]> {
    // Mock data for demo
    return [];
  }
}
