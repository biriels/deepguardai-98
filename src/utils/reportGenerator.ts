import { BreachDetectionResult, PhoneBreachDetectionResult, PhoneActivityLog } from '@/types/breach';

export interface SecurityReport {
  email?: string;
  phoneNumber?: string;
  scanDate: string;
  riskLevel: string;
  totalBreaches: number;
  breaches: any[];
  recommendations: string[];
  // Enhanced phone data
  personalDetails?: {
    associatedName?: string;
    associatedEmails?: string[];
    carrier?: string;
    registrationDate?: string;
    lastActivity?: string;
    verificationStatus?: string;
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

export class ReportGenerator {
  static generateEmailReport(result: BreachDetectionResult): SecurityReport {
    const recommendations = this.getEmailRecommendations(result);
    
    return {
      email: result.email,
      scanDate: result.detectionDate,
      riskLevel: result.riskLevel,
      totalBreaches: result.totalBreaches,
      breaches: result.breaches,
      recommendations
    };
  }

  static generatePhoneReport(result: PhoneBreachDetectionResult): SecurityReport {
    const recommendations = this.getPhoneRecommendations(result);
    
    return {
      phoneNumber: result.phoneNumber,
      scanDate: result.detectionDate,
      riskLevel: result.riskLevel,
      totalBreaches: result.totalBreaches,
      breaches: result.breaches,
      recommendations,
      personalDetails: result.personalDetails,
      activitySummary: result.activitySummary
    };
  }

  private static getEmailRecommendations(result: BreachDetectionResult): string[] {
    const recommendations = [
      'Monitor your email regularly for suspicious activity',
      'Enable two-factor authentication on all accounts',
      'Use unique, strong passwords for each account'
    ];

    if (result.isBreached) {
      recommendations.unshift(
        'Change passwords for all affected accounts immediately',
        'Check and update security questions and recovery options',
        'Consider using a password manager'
      );

      if (result.riskLevel === 'critical' || result.riskLevel === 'high') {
        recommendations.push(
          'Contact customer support for affected services',
          'Consider credit monitoring services',
          'Review financial statements for unauthorized activity'
        );
      }
    }

    return recommendations;
  }

  private static getPhoneRecommendations(result: PhoneBreachDetectionResult): string[] {
    const recommendations = [
      'Be cautious of unexpected calls or messages',
      'Never share personal information over unsolicited calls',
      'Enable call blocking features on your device'
    ];

    if (result.isBreached) {
      recommendations.unshift(
        'Contact your mobile carrier about the breach',
        'Enable additional security features with your carrier',
        'Consider changing your phone number if severely compromised'
      );

      if (result.riskLevel === 'critical' || result.riskLevel === 'high') {
        recommendations.push(
          'Monitor financial accounts for unauthorized access',
          'Set up fraud alerts with credit bureaus',
          'Review and update privacy settings on social media'
        );
      }
    }

    return recommendations;
  }

  static downloadReport(report: SecurityReport, filename: string): void {
    const reportContent = this.formatReportContent(report);
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private static formatReportContent(report: SecurityReport): string {
    const lines = [
      '='.repeat(80),
      'COMPREHENSIVE SECURITY BREACH DETECTION REPORT',
      '='.repeat(80),
      '',
      `Generated: ${new Date(report.scanDate).toLocaleString()}`,
      `Contact: ${report.email || report.phoneNumber}`,
      `Risk Level: ${report.riskLevel.toUpperCase()}`,
      `Total Breaches Found: ${report.totalBreaches}`,
      ''
    ];

    // Add personal details for phone reports
    if (report.phoneNumber && report.personalDetails) {
      lines.push('PERSONAL INFORMATION ANALYSIS');
      lines.push('-'.repeat(40));
      
      if (report.personalDetails.associatedName) {
        lines.push(`📱 Associated Name: ${report.personalDetails.associatedName}`);
      }
      
      if (report.personalDetails.associatedEmails?.length) {
        lines.push(`📧 Associated Emails: ${report.personalDetails.associatedEmails.join(', ')}`);
      }
      
      if (report.personalDetails.carrier) {
        lines.push(`📶 Carrier: ${report.personalDetails.carrier}`);
      }
      
      if (report.personalDetails.registrationDate) {
        lines.push(`📅 Registration Date: ${report.personalDetails.registrationDate}`);
      }
      
      if (report.personalDetails.lastActivity) {
        lines.push(`🕒 Last Activity: ${report.personalDetails.lastActivity}`);
      }
      
      if (report.personalDetails.verificationStatus) {
        const statusIcon = report.personalDetails.verificationStatus === 'verified' ? '✅' : 
                          report.personalDetails.verificationStatus === 'suspicious' ? '⚠️' : '❓';
        lines.push(`${statusIcon} Verification Status: ${report.personalDetails.verificationStatus.toUpperCase()}`);
      }
      
      if (report.personalDetails.socialProfiles?.length) {
        lines.push('');
        lines.push('🔗 LINKED SOCIAL MEDIA PROFILES:');
        report.personalDetails.socialProfiles.forEach(profile => {
          lines.push(`   • ${profile.platform}: @${profile.username} (Last seen: ${profile.lastSeen})`);
        });
      }
      
      lines.push('');
    }

    // Add activity summary for phone reports
    if (report.activitySummary) {
      lines.push('RECENT ACTIVITY ANALYSIS');
      lines.push('-'.repeat(40));
      lines.push(`📊 Total Login Attempts: ${report.activitySummary.totalLogins}`);
      lines.push(`⚠️  Suspicious Activities: ${report.activitySummary.suspiciousActivity}`);
      
      if (report.activitySummary.locationPattern.length) {
        lines.push(`🌍 Active Locations: ${report.activitySummary.locationPattern.join(', ')}`);
      }
      
      if (report.activitySummary.recentLogins.length) {
        lines.push('');
        lines.push('📱 RECENT LOGIN ACTIVITY:');
        report.activitySummary.recentLogins.slice(0, 5).forEach((login, index) => {
          const riskIcon = login.riskScore > 7 ? '🚨' : login.riskScore > 4 ? '⚠️' : '✅';
          const statusIcon = login.isSuccessful ? '✅' : '❌';
          lines.push(`   ${index + 1}. ${riskIcon} ${login.platform} - ${login.activityType}`);
          lines.push(`      ${statusIcon} ${login.isSuccessful ? 'Successful' : 'Failed'} | ${new Date(login.timestamp).toLocaleString()}`);
          if (login.location) {
            lines.push(`      📍 Location: ${login.location}`);
          }
          if (login.ipAddress) {
            lines.push(`      🌐 IP: ${login.ipAddress}`);
          }
          lines.push(`      ⚡ Risk Score: ${login.riskScore}/10`);
          lines.push('');
        });
      }
      lines.push('');
    }

    lines.push('BREACH SUMMARY');
    lines.push('-'.repeat(30));

    if (report.totalBreaches === 0) {
      lines.push('✅ No breaches detected for this contact information.');
    } else {
      lines.push(`⚠️  ${report.totalBreaches} breach(es) detected affecting your information.`);
      lines.push('');
      
      report.breaches.forEach((breach, index) => {
        lines.push(`${index + 1}. 🚨 ${breach.name || breach.breachName}`);
        lines.push(`   📅 Breach Date: ${breach.breachDate}`);
        lines.push(`   📝 Description: ${breach.description}`);
        
        // Enhanced phone breach details
        if (breach.associatedName) {
          lines.push(`   👤 Associated Name: ${breach.associatedName}`);
        }
        if (breach.associatedEmail) {
          lines.push(`   📧 Associated Email: ${breach.associatedEmail}`);
        }
        if (breach.carrier) {
          lines.push(`   📶 Carrier: ${breach.carrier}`);
        }
        if (breach.location) {
          lines.push(`   📍 Location: ${breach.location}`);
        }
        
        if (breach.dataClasses) {
          lines.push(`   💾 Data Exposed: ${breach.dataClasses.join(', ')}`);
        } else if (breach.dataExposed) {
          lines.push(`   💾 Data Exposed: ${breach.dataExposed.join(', ')}`);
        }
        
        if (breach.severity) {
          const severityIcon = breach.severity === 'critical' ? '🚨' : 
                              breach.severity === 'high' ? '⚠️' : 
                              breach.severity === 'medium' ? '🟡' : '🟢';
          lines.push(`   ${severityIcon} Severity: ${breach.severity.toUpperCase()}`);
        }
        
        if (breach.pwnCount) {
          lines.push(`   👥 Affected Users: ${breach.pwnCount.toLocaleString()}`);
        }
        lines.push('');
      });
    }

    lines.push('SECURITY RECOMMENDATIONS');
    lines.push('-'.repeat(40));
    
    report.recommendations.forEach((rec, index) => {
      lines.push(`${index + 1}. ${rec}`);
    });

    lines.push('');
    lines.push('='.repeat(80));
    lines.push('🛡️ Report generated by DeepGuard AI Security Scanner');
    lines.push('📞 For questions or support, contact our security team');
    lines.push('🌐 Advanced AI-powered threat detection and analysis');
    lines.push('='.repeat(80));

    return lines.join('\n');
  }
}