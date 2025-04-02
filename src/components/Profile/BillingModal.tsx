
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUser } from '@/contexts/UserContext';
import { Badge } from "@/components/ui/badge";
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BillingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BillingModal({ open, onOpenChange }: BillingModalProps) {
  const { toast } = useToast();
  const { userPlan, togglePlan } = useUser();
  
  const handleUpgrade = () => {
    if (userPlan === 'standard') {
      togglePlan();
    }
    toast({
      title: "Plan Updated",
      description: "You have successfully upgraded to the Premium plan."
    });
    onOpenChange(false);
  };
  
  const handleDowngrade = () => {
    if (userPlan === 'premium') {
      togglePlan();
    }
    toast({
      title: "Plan Updated",
      description: "Your plan has been changed to Standard."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Billing & Subscription</DialogTitle>
          <DialogDescription>
            Manage your subscription and payment details.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Current Plan</h3>
              <p className="text-sm text-muted-foreground">Your current subscription</p>
            </div>
            <Badge className={userPlan === 'premium' ? 'bg-violet-500' : ''}>
              {userPlan === 'premium' ? 'Premium' : 'Standard'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className={userPlan === 'standard' ? 'border-2 border-violet-500' : ''}>
              <CardHeader>
                <CardTitle>Standard Plan</CardTitle>
                <CardDescription>Basic features for individuals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$9.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">✓ Basic monitoring</li>
                  <li className="flex items-center">✓ Up to 5 projects</li>
                  <li className="flex items-center">✓ Standard reporting</li>
                </ul>
              </CardContent>
              <CardFooter>
                {userPlan === 'premium' ? (
                  <Button onClick={handleDowngrade} variant="outline" className="w-full">Downgrade</Button>
                ) : (
                  <Button disabled className="w-full">Current Plan</Button>
                )}
              </CardFooter>
            </Card>
            
            <Card className={userPlan === 'premium' ? 'border-2 border-violet-500' : ''}>
              <CardHeader>
                <CardTitle>Premium Plan</CardTitle>
                <CardDescription>Advanced features for professionals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$29.99<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center">✓ Advanced monitoring</li>
                  <li className="flex items-center">✓ Unlimited projects</li>
                  <li className="flex items-center">✓ Priority support</li>
                  <li className="flex items-center">✓ Custom analytics</li>
                </ul>
              </CardContent>
              <CardFooter>
                {userPlan === 'standard' ? (
                  <Button onClick={handleUpgrade} className="w-full">Upgrade</Button>
                ) : (
                  <Button disabled className="w-full">Current Plan</Button>
                )}
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5" />
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Update</Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing History</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">July 2023 Invoice</p>
                  <p className="text-sm text-muted-foreground">
                    <Calendar className="inline h-3 w-3 mr-1" />
                    July 1, 2023
                  </p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">June 2023 Invoice</p>
                  <p className="text-sm text-muted-foreground">
                    <Calendar className="inline h-3 w-3 mr-1" />
                    June 1, 2023
                  </p>
                </div>
                <Button variant="outline" size="sm">Download</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
