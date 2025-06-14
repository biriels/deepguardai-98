
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Detection from "@/pages/Detection";
import Pricing from "@/pages/Pricing";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotificationProvider } from "@/contexts/NotificationContext";
import PaymentCallback from "@/pages/PaymentCallback";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <NotificationProvider>
            <ThemeProvider>
              <BrowserRouter>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/detection" element={<Detection />} />
                    <Route
                      path="/dashboard"
                      element={
                        <AuthProvider>
                          <Dashboard />
                        </AuthProvider>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <AuthProvider>
                          <Profile />
                        </AuthProvider>
                      }
                    />
                    <Route path="/payment/callback" element={<PaymentCallback />} />
                  </Routes>
                  <Toaster />
                </div>
              </BrowserRouter>
            </ThemeProvider>
          </NotificationProvider>
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
