
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  
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
          <Button
            className="rounded-full w-8 h-8 p-0 overflow-hidden"
            variant="outline"
          >
            <span className="sr-only">User profile</span>
            <div className="bg-violet-200 text-violet-800 font-semibold flex items-center justify-center w-full h-full">
              SU
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
