import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout from "./layout/defaultLayout";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login";
import CalendarPage from "./pages/calendar";
import ProfilePage from "./pages/profile";
import RegisterPage from "./pages/register"; // 🔥 página de cadastro

import "./global.css";
import { ThemeProvider } from "./components/themeContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 🔐 Componente para proteger rotas
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <DefaultLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>

      {/* Toastify Global */}
      <ToastContainer position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}

export default App;
