import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DefaultLayout from "./layout/defaultLayout";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login";
import CalendarPage from "./pages/calendar";
import ProfilePage from "./pages/profile";

import "./global.css";
import { ThemeProvider } from "./components/themeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
