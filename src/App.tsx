
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Detection from "./pages/Detection";
import Monitoring from "./pages/Monitoring";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Team from "./pages/Team";
import Pricing from "./pages/Pricing";
import ApiDocs from "./pages/ApiDocs";
import NotFound from "./pages/NotFound";
import Agents from "./pages/Agents";
import ExtensionTools from "./pages/ExtensionTools";
import PaymentCallback from "./pages/PaymentCallback";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <UserProvider>
                <NotificationProvider>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/landing" element={<LandingPage />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/api-docs" element={<ApiDocs />} />
                    <Route path="/payment/callback" element={<PaymentCallback />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/detection" element={
                      <ProtectedRoute>
                        <Detection />
                      </ProtectedRoute>
                    } />
                    <Route path="/monitoring" element={
                      <ProtectedRoute>
                        <Monitoring />
                      </ProtectedRoute>
                    } />
                    <Route path="/analytics" element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    } />
                    <Route path="/reports" element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    } />
                    <Route path="/alerts" element={
                      <ProtectedRoute>
                        <Alerts />
                      </ProtectedRoute>
                    } />
                    <Route path="/agents" element={
                      <ProtectedRoute>
                        <Agents />
                      </ProtectedRoute>
                    } />
                    <Route path="/extension" element={
                      <ProtectedRoute>
                        <ExtensionTools />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/team" element={
                      <ProtectedRoute>
                        <Team />
                      </ProtectedRoute>
                    } />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </NotificationProvider>
              </UserProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
