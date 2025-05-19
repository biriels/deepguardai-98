
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import Layout from "@/components/Layout/Layout";

const Auth = () => {
  const [step, setStep] = useState<"email" | "verification">("email");
  const [email, setEmail] = useState("");
  const [value, setValue] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would call an API to send verification code
    toast({
      title: "Verification Code Sent",
      description: `A 6-digit verification code has been sent to ${email}`,
    });

    // For demo purposes, we'll just move to the next step
    setStep("verification");
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (value.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter all 6 digits of your verification code",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would validate the code with an API
    // For demo purposes, we'll just accept any 6-digit code
    toast({
      title: "Verification Successful",
      description: "You have been successfully authenticated",
    });

    // Redirect to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {step === "email" ? (
          <Card className="border-white/10 backdrop-blur-sm bg-white/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Sign in to DeepGuard AI</CardTitle>
              <CardDescription>Enter your email to get started</CardDescription>
            </CardHeader>
            <form onSubmit={handleEmailSubmit}>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                  Continue with Email
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card className="border-white/10 backdrop-blur-sm bg-white/5">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Verify your email</CardTitle>
              <CardDescription>We sent a code to {email}</CardDescription>
            </CardHeader>
            <form onSubmit={handleVerificationSubmit}>
              <CardContent className="space-y-4">
                <div className="flex justify-center py-4">
                  <InputOTP maxLength={6} value={value} onChange={setValue}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  <button 
                    type="button"
                    onClick={() => {
                      toast({
                        title: "Code Resent",
                        description: "A new verification code has been sent to your email"
                      });
                    }}
                    className="underline hover:text-primary"
                  >
                    Didn't receive a code? Click to resend
                  </button>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                  Verify and Continue
                </Button>
              </CardFooter>
            </form>
            <div className="p-4 text-center">
              <Button 
                variant="ghost" 
                onClick={() => setStep("email")}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Use a different email
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
