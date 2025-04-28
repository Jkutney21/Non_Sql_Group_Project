import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import ErrorPage from "./pages/Errorpage";
import JSXerror from "./pages/JSXerror";
import Footer from "./components/footer";
import StudentFin from "./pages/StudentFIn";
import StaffFin from "./pages/StaffFin";

import HeaderBasic from "./components/header"; // Basic header for unauthenticated users
import axios from "axios";
import "./App.css";

function App() {
  const validateToken = async (token: string) => {
    try {
      const response = await axios.get("http://172.172.215.186:8080/api/auth/validate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Token validation successful:", response.data);
      return true;
    } catch (err) {
      console.error("Token validation failed:", err);
      return false;
    }
  };

  const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
      const checkToken = async () => {
        if (!token) {
          setIsValid(false);
          return;
        }

        const valid = await validateToken(token);
        if (!valid) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }
        setIsValid(valid);
      };

      checkToken();
    }, [token]);

    if (isValid === null) {
      return <div>Loading...</div>;
    }

    if (!isValid) {
      return <Navigate to="/JSXerror" />;
    }

    return <>{children}</>;
  };

  const getRole = () => {
    const storedRole = localStorage.getItem("role");
    return storedRole ? storedRole.toLowerCase() : null;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeaderBasic role={null} />
              <Home />
            </>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <HeaderBasic role={getRole()} />
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute>
              <HeaderBasic role={getRole()} />
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/financialAid"
          element={
            <ProtectedRoute>
              <HeaderBasic role={getRole()} />
              <StudentFin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/financial_Aid"
          element={
            <ProtectedRoute>
              <HeaderBasic role={getRole()} />
              <StaffFin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <HeaderBasic role={null} />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <HeaderBasic role={null} />
              <Register />
            </>
          }
        />
        <Route
          path="/JSXerror"
          element={
            <>
              <HeaderBasic role={null} />
              <JSXerror />
            </>
          }
        />
        <Route
          path="/error"
          element={
            <>
              <HeaderBasic role={null} />
              <ErrorPage />
            </>
          }
        />
        <Route
          path="*"
          element={
            <>
              <HeaderBasic role={null} />
              <ErrorPage />
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;