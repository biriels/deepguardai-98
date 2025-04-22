
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Monitoring from "./pages/Monitoring";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";
import Detection from "./pages/Detection";
import Analytics from "./pages/Analytics";
import Team from "./pages/Team";
import ApiDocs from "./pages/ApiDocs";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import { UserProvider } from "./contexts/UserContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/detection" element={<Detection />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/team" element={<Team />} />
              <Route path="/api-docs" element={<ApiDocs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </NotificationProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
