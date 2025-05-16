
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useUser } from '@/contexts/UserContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileSettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { toast } = useToast();
  const { email } = useUser();
  const { darkMode, toggleDarkMode } = useTheme();
  const [name, setName] = useState("Sam User");
  const [bio, setBio] = useState("");
  
  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved."
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              defaultValue={email}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bio" className="text-right align-top mt-2">
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Write a short bio..."
              className="col-span-3"
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="theme" className="text-right">
              Theme
            </Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch 
                id="theme" 
                checked={darkMode}
                onCheckedChange={toggleDarkMode}
              />
              <Moon className="h-4 w-4" />
              <span className="text-sm text-muted-foreground ml-2">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
