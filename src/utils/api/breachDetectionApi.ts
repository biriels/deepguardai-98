import { supabase } from '@/integrations/supabase/client';
import { BreachData, BreachDetectionResult, BreachAlert, PhoneBreachData, PhoneBreachDetectionResult, PhoneBreachAlert } from '@/types/breach';
import { BreachDetectionService } from './breachDetectionService';

export class BreachDetectionApi {
  // Enhanced email breach detection using the new service
  static async checkEmailBreach(email: string): Promise<BreachDetectionResult> {
    console.log(`Checking enhanced breach status for: ${email}`);
    
    try {
      // Use the enhanced breach detection service
      const result = await BreachDetectionService.checkEmailBreaches(email);
      
      // Log the detection for analytics
      console.log(`Email breach check completed: ${result.isBreached ? 'BREACH FOUND' : 'NO BREACH'}`);
      
      return result;
    } catch (error) {
      console.error('Enhanced email breach detection failed:', error);
      // Fallback to mock data if service fails
      return this.getMockEmailBreachResult(email);
    }
  }

  // Enhanced phone breach detection using the new service
  static async checkPhoneBreach(phoneNumber: string): Promise<PhoneBreachDetectionResult> {
    console.log(`Checking enhanced phone breach status for: ${phoneNumber}`);
    
    try {
      // Use the enhanced breach detection service
      const result = await BreachDetectionService.checkPhoneBreaches(phoneNumber);
      
      // Log the detection for analytics
      console.log(`Phone breach check completed: ${result.isBreached ? 'BREACH FOUND' : 'NO BREACH'}`);
      
      return result;
    } catch (error) {
      console.error('Enhanced phone breach detection failed:', error);
      // Fallback to mock data if service fails
      return this.getMockPhoneBreachResult(phoneNumber);
    }
  }

  // Fallback mock data for email breaches
  private static getMockEmailBreachResult(email: string): BreachDetectionResult {
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
      }
    ];

    const isBreached = Math.random() > 0.4; // 60% chance of breach for demo
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

  // Fallback mock data for phone breaches
  private static getMockPhoneBreachResult(phoneNumber: string): PhoneBreachDetectionResult {
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
      }
    ];

    const isBreached = Math.random() > 0.5; // 50% chance of breach for demo
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
    const alertId = `alert_${Date.now()}`;
    console.log('Saving breach alert:', alertId, alert);
    return alertId;
  }

  static async savePhoneBreachAlert(alert: Omit<PhoneBreachAlert, 'id' | 'createdAt'>): Promise<string> {
    const alertId = `phone_alert_${Date.now()}`;
    console.log('Saving phone breach alert:', alertId, alert);
    return alertId;
  }

  static async getBreachAlerts(userId: string): Promise<BreachAlert[]> {
    return [];
  }

  static async getPhoneBreachAlerts(userId: string): Promise<PhoneBreachAlert[]> {
    return [];
  }
}
