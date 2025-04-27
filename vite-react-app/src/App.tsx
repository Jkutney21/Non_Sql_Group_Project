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

import HeaderBasic from "./components/header"; // Basic header for unauthenticated users
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./App.css";


function App() {
  const validateToken = async (token: string) => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/validate", {
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
    const role = localStorage.getItem("role"); 
  
    useEffect(() => {
      const checkToken = async () => {
        console.log("Checking local storage...");
        console.log("Token from local storage:", token);
        console.log("Role from local storage:", role);
  
        if (!token) {
          console.warn("No token found in local storage.");
          setIsValid(false);
          return;
        }
  
        const valid = await validateToken(token);
        if (!valid) {
          console.warn("Token validation failed. Clearing local storage.");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }
        setIsValid(valid);
        
      };
  
      checkToken();
    }, [token, role]);
  
    if (isValid === null) {
      return <div>Loading...</div>;
    }
  
    if (!isValid) {
          
          localStorage.removeItem("token");
          localStorage.removeItem("role");
      return <Navigate to="/JSXerror" />;
    }
  
    return children;
  };
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    console.log("Role from localStorage:", storedRole);
    setRole(storedRole ? storedRole.toLowerCase() : null);
  }, []);

  return (
    <Router>
      <HeaderBasic role={role} /> {/* Pass the role to HeaderBasic */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/student"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff"
          element={
            <ProtectedRoute>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/financialAid"
          element={
            <ProtectedRoute>
              <StudentFin />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
    path="/JSXerror"
    element={
      <>
        <HeaderBasic role={null} /> {/* Render Header with role=null */}
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