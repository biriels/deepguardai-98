
import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  ArrowRightLeft,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/" },
    { name: "Transactions", icon: <ArrowRightLeft size={20} />, path: "/transactions" },
    { name: "Analytics", icon: <BarChart3 size={20} />, path: "/analytics" },
    { name: "Customers", icon: <Users size={20} />, path: "/customers" },
    { name: "Payment Methods", icon: <CreditCard size={20} />, path: "/payment-methods" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
  ];

  return (
    <div
      className={`bg-sidebar h-screen flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        {!collapsed && (
          <div className="text-white font-bold text-xl">Paymon</div>
        )}
        <button
          onClick={toggleSidebar}
          className={`text-white p-1 rounded-full hover:bg-sidebar-accent ${
            collapsed ? "ml-auto mr-auto" : ""
          }`}
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pt-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-md transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-white"
                    : "text-white/90 hover:bg-sidebar-accent/50 hover:text-white"
                } ${collapsed ? "justify-center" : ""}`
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="p-4">
        <NavLink
          to="/help"
          className="flex items-center px-3 py-2.5 text-white/80 hover:bg-sidebar-accent/50 hover:text-white rounded-md transition-colors"
        >
          <HelpCircle size={20} />
          {!collapsed && <span className="ml-3">Help & Support</span>}
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
