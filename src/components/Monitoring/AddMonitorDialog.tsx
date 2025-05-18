
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MonitorFormData, MonitorPlatform } from "./MonitorTypes";

interface AddMonitorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  formData: MonitorFormData;
  onChange: (key: keyof MonitorFormData, value: string) => void;
  onSubmit: () => void;
}

const AddMonitorDialog = ({
  isOpen,
  onClose,
  activeTab,
  formData,
  onChange,
  onSubmit,
}: AddMonitorDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Monitor</DialogTitle>
          <DialogDescription>
            Configure a new monitor to track content across platforms.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Monitor name"
              className="col-span-3"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
          </div>
          
          {activeTab === "social" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="platform" className="text-right">
                Platform
              </Label>
              <Select 
                value={formData.platform} 
                onValueChange={(value) => 
                  onChange("platform", value as MonitorPlatform)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Twitter">Twitter</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="TikTok">TikTok</SelectItem>
                  <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                  <SelectItem value="YouTube">YouTube</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {activeTab === "websites" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Website URL
              </Label>
              <Input
                id="url"
                placeholder="example.com/page"
                className="col-span-3"
                value={formData.url}
                onChange={(e) => onChange("url", e.target.value)}
              />
            </div>
          )}
          
          {activeTab === "custom" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="endpoint" className="text-right">
                API Endpoint
              </Label>
              <Input
                id="endpoint"
                placeholder="api.example.com/endpoint"
                className="col-span-3"
                value={formData.endpoint}
                onChange={(e) => onChange("endpoint", e.target.value)}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            Add Monitor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMonitorDialog;
