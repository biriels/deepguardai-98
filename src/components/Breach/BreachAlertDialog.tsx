
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Mail, Shield } from 'lucide-react';
import { BreachDetectionResult } from '@/types/breach';

interface BreachAlertDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onStartRecovery: () => void;
  breachData: BreachDetectionResult;
}

const BreachAlertDialog = ({ 
  isOpen, 
  onClose, 
  onStartRecovery, 
  breachData 
}: BreachAlertDialogProps) => {
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            ⚠️ ALERT: We Detected a Breach
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <div className="text-base font-medium text-gray-900">
              Your email ({breachData.email}) appeared in a known data breach.
              <span className="text-red-600 font-semibold block mt-1">
                Immediate action is required.
              </span>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Risk Level:</span>
                <Badge className={getRiskColor(breachData.riskLevel)}>
                  {breachData.riskLevel.toUpperCase()}
                </Badge>
              </div>
              <div className="text-sm">
                <strong>{breachData.totalBreaches}</strong> breach(es) found
              </div>
              {breachData.mostRecentBreach && (
                <div className="text-sm">
                  Most recent: <strong>{breachData.mostRecentBreach.name}</strong> 
                  ({new Date(breachData.mostRecentBreach.breachDate).getFullYear()})
                </div>
              )}
            </div>

            <div className="text-sm text-gray-600">
              We'll guide you through securing your account step-by-step.
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
          <AlertDialogCancel onClick={onClose}>
            I'll Handle This Later
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onStartRecovery}
            className="bg-red-600 hover:bg-red-700"
          >
            <Shield className="h-4 w-4 mr-2" />
            Start Recovery Now
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BreachAlertDialog;
