
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Moon, Sun, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/contexts/UserContext";
import { ProfileSettingsModal } from "@/components/Profile/SettingsModal";
import { BillingModal } from "@/components/Profile/BillingModal";
import { ApiKeysModal } from "@/components/Profile/ApiKeysModal";
import NotificationDropdown from "@/components/Notifications/NotificationDropdown";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const { userPlan, togglePlan, signOut, email, user, profile } = useUser();
  
  // Get display name from user profile or fallback to email username
  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    if (user?.user_metadata?.name) return user.user_metadata.name;
    // Extract username from email as fallback
    if (email) return email.split('@')[0];
    return "User";
  };

  // Get initials for avatar
  const getInitials = () => {
    const name = getDisplayName();
    return name.split(' ').map(word => word.charAt(0).toUpperCase()).slice(0, 2).join('');
  };

  // Modal states
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [billingModalOpen, setBillingModalOpen] = useState(false);
  const [apiKeysModalOpen, setApiKeysModalOpen] = useState(false);
  
  // Updated handlers to fix freezing issue - removed preventDefault and stopPropagation
  const handleProfileClick = () => {
    setProfileModalOpen(true);
  };

  const handleBillingClick = () => {
    setBillingModalOpen(true);
  };

  const handleApiKeysClick = () => {
    setApiKeysModalOpen(true);
  };

  const handleTogglePlan = () => {
    togglePlan();
  };

  const handleSignOut = () => {
    signOut();
  };

  const displayName = getDisplayName();
  const initials = getInitials();

  return (
    <>
      <header className="h-16 border-b border-border bg-background flex items-center px-4 sticky top-0 z-10">
        <div className="flex items-center w-full max-w-7xl mx-auto gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8 bg-background"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
            
            <NotificationDropdown />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full overflow-hidden flex items-center gap-2"
                  variant={isMobile ? "outline" : "ghost"}
                  size={isMobile ? "icon" : "default"}
                >
                  <span className="sr-only">User profile</span>
                  <div className="bg-violet-200 text-violet-800 font-semibold flex items-center justify-center w-8 h-8 rounded-full">
                    {initials}
                  </div>
                  {!isMobile && (
                    <>
                      <div className="flex flex-col items-start text-left">
                        <span className="text-sm font-medium leading-none">{displayName}</span>
                        <div className="flex items-center gap-1">
                          <Badge 
                            variant={userPlan === "premium" ? "default" : "outline"} 
                            className={`text-xs mt-1 ${userPlan === "premium" ? "bg-violet-500" : ""}`}
                          >
                            {userPlan === "premium" ? "Premium" : "Standard"}
                          </Badge>
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
                    </>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
                <DropdownMenuLabel className="flex flex-col">
                  <span>{displayName}</span>
                  <span className="text-xs font-normal text-muted-foreground">{email}</span>
                  <Badge 
                    variant={userPlan === "premium" ? "default" : "outline"} 
                    className={`text-xs mt-2 ${userPlan === "premium" ? "bg-violet-500" : ""}`}
                  >
                    {userPlan === "premium" ? "Premium Plan" : "Standard Plan"}
                  </Badge>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfileClick}>
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleBillingClick}>
                  Billing & Subscription
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleApiKeysClick}>
                  API Keys
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleTogglePlan}>
                  Toggle Plan Type
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleSignOut} 
                  className="text-red-500"
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Modals */}
      <ProfileSettingsModal 
        open={profileModalOpen} 
        onOpenChange={setProfileModalOpen} 
      />
      <BillingModal 
        open={billingModalOpen} 
        onOpenChange={setBillingModalOpen} 
      />
      <ApiKeysModal 
        open={apiKeysModalOpen} 
        onOpenChange={setApiKeysModalOpen} 
      />
    </>
  );
};

export default Navbar;
