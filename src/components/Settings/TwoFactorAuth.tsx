
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Check, Key } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";

const TwoFactorAuth = () => {
  const [showSetupDialog, setShowSetupDialog] = useState(false);
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  const handleSetup2FA = () => {
    setQrCodeGenerated(true);
    // In a real app, this would make an API call to generate a secret and QR code
  };

  const handleVerifyOTP = () => {
    // In a real app, this would verify the OTP with the backend
    if (otp.length === 6) {
      setIs2FAEnabled(true);
      setShowVerifyDialog(false);
      setShowSetupDialog(false);
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled for your account.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
    }
  };

  const handleDisable2FA = () => {
    setIs2FAEnabled(false);
    toast({
      title: "2FA Disabled",
      description: "Two-factor authentication has been disabled for your account.",
    });
  };

  const startSetup = () => {
    setShowSetupDialog(true);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Two-factor Authentication</CardTitle>
          </div>
          <CardDescription>
            Add an extra layer of security to your account by requiring a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          {is2FAEnabled ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                <span className="font-medium">Two-factor authentication is enabled</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your account is protected with an additional security layer. When signing in, you'll need to provide a verification code from your authentication app.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Two-factor authentication adds an extra layer of security to your account. When enabled, you'll need to provide a verification code in addition to your password when signing in.
            </p>
          )}
        </CardContent>
        <CardFooter>
          {is2FAEnabled ? (
            <Button 
              variant="outline" 
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={handleDisable2FA}
            >
              Disable 2FA
            </Button>
          ) : (
            <Button onClick={startSetup}>Enable 2FA</Button>
          )}
        </CardFooter>
      </Card>

      {/* Setup Dialog */}
      <Dialog open={showSetupDialog} onOpenChange={setShowSetupDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Set up Two-factor Authentication</DialogTitle>
            <DialogDescription>
              Enhance your account security by enabling two-factor authentication.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h3 className="font-medium">Step 1: Install an authenticator app</h3>
              <p className="text-sm text-muted-foreground">
                Download and install an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Step 2: Scan the QR code</h3>
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleSetup2FA}
                disabled={qrCodeGenerated}
              >
                Generate QR Code
              </Button>
              
              {qrCodeGenerated && (
                <div className="mt-4 flex flex-col items-center">
                  <div className="bg-gray-200 p-4 w-48 h-48 flex items-center justify-center mb-2">
                    <p className="text-sm text-center text-muted-foreground">
                      [QR Code Placeholder]<br/>
                      In a real app, a QR code would be displayed here
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-2">
                    Scan this QR code with your authenticator app
                  </p>
                  
                  <div className="mt-4 space-y-2 w-full">
                    <p className="text-sm font-medium">Manual entry code:</p>
                    <div className="p-2 bg-muted rounded-md font-mono text-center">
                      ABCD-EFGH-IJKL-MNOP
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {qrCodeGenerated && (
              <div className="space-y-2">
                <h3 className="font-medium">Step 3: Verify Setup</h3>
                <Button 
                  className="w-full" 
                  onClick={() => {
                    setShowVerifyDialog(true);
                    setShowSetupDialog(false);
                  }}
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Verify Dialog */}
      <Dialog open={showVerifyDialog} onOpenChange={setShowVerifyDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Two-factor Authentication</DialogTitle>
            <DialogDescription>
              Enter the 6-digit code from your authenticator app to complete setup
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-6 py-4">
            <div className="flex items-center justify-center gap-2">
              <Key className="h-6 w-6 text-primary" />
              <span className="font-medium">Verification Code</span>
            </div>
            
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            
            <Alert>
              <AlertDescription>
                If you lose access to your authenticator app, you won't be able to sign in to your account unless you have backup recovery codes.
              </AlertDescription>
            </Alert>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowVerifyDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleVerifyOTP}>
              Verify and Activate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TwoFactorAuth;
