
import React from "react";
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

const Navbar = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const isMobile = useIsMobile();
  const [userPlan, setUserPlan] = React.useState("premium"); // Can be "standard" or "premium"
  
  // Toggle dark mode
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
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
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button variant="outline" size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-violet-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="rounded-full overflow-hidden flex items-center gap-2"
                variant={isMobile ? "outline" : "ghost"}
                size={isMobile ? "icon" : "default"}
              >
                <span className="sr-only">User profile</span>
                <div className="bg-violet-200 text-violet-800 font-semibold flex items-center justify-center w-8 h-8 rounded-full">
                  SU
                </div>
                {!isMobile && (
                  <>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-sm font-medium leading-none">Sam User</span>
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
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span>Sam User</span>
                <span className="text-xs font-normal text-muted-foreground">sam@example.com</span>
                <Badge 
                  variant={userPlan === "premium" ? "default" : "outline"} 
                  className={`text-xs mt-2 ${userPlan === "premium" ? "bg-violet-500" : ""}`}
                >
                  {userPlan === "premium" ? "Premium Plan" : "Standard Plan"}
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing & Subscription</DropdownMenuItem>
              <DropdownMenuItem>API Keys</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setUserPlan(userPlan === "premium" ? "standard" : "premium")}>
                Toggle Plan Type
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
