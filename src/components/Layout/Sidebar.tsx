
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Shield, 
  AlertCircle, 
  BarChart3, 
  Settings, 
  Home, 
  MonitorPlay, 
  FileText,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Detection", icon: Shield, path: "/detection" },
    { name: "Monitoring", icon: MonitorPlay, path: "/monitoring" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Analytics", icon: BarChart3, path: "/analytics" },
    { name: "Alerts", icon: AlertCircle, path: "/alerts" },
    { name: "Team", icon: Users, path: "/team" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white">DeepGuard</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2L13 7.5L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 7.5H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 2L2 7.5L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 7.5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </Button>
      </div>
      <nav className="p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
