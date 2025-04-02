
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Key, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';

interface ApiKeysModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApiKeysModal({ open, onOpenChange }: ApiKeysModalProps) {
  const { toast } = useToast();
  const [productionKey, setProductionKey] = useState("••••••••••••••••••••••");
  const [developmentKey, setDevelopmentKey] = useState("••••••••••••••••••••••");
  const [showProductionKey, setShowProductionKey] = useState(false);
  const [showDevelopmentKey, setShowDevelopmentKey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const realProductionKey = "pk_prod_7ae89b5c9a3e42d1b15f";
  const realDevelopmentKey = "pk_dev_3fd61a0b7c5d8e2f9g4h";

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key === "production" ? 
      (showProductionKey ? realProductionKey : "pk_prod_7ae89b5c9a3e42d1b15f") : 
      (showDevelopmentKey ? realDevelopmentKey : "pk_dev_3fd61a0b7c5d8e2f9g4h")
    );
    
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard."
    });
  };

  const handleGenerateNewKey = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "New API Key Generated",
        description: "Your new API key has been generated successfully."
      });
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>API Keys</DialogTitle>
          <DialogDescription>
            Manage your API keys for interacting with the platform.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="production-key">Production API Key</Label>
                <Key className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="production-key"
                  value={showProductionKey ? realProductionKey : productionKey}
                  readOnly
                  className="font-mono"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowProductionKey(!showProductionKey)}
                >
                  {showProductionKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleCopyKey("production")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Use this key in production environments only.</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="development-key">Development API Key</Label>
                <Key className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="development-key"
                  value={showDevelopmentKey ? realDevelopmentKey : developmentKey}
                  readOnly
                  className="font-mono"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowDevelopmentKey(!showDevelopmentKey)}
                >
                  {showDevelopmentKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleCopyKey("development")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Use this key for testing and development.</p>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">API Key Settings</h3>
            <p className="text-sm text-muted-foreground">Generate a new API key if you believe your current keys have been compromised.</p>
            <div className="flex justify-end">
              <Button 
                onClick={handleGenerateNewKey} 
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                {isGenerating && <RefreshCw className="h-4 w-4 animate-spin" />}
                {isGenerating ? 'Generating...' : 'Generate New API Key'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
