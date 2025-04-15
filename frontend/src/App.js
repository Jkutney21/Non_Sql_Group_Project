import React, { useState, useEffect } from "react"; // Import useState and useEffect from react
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import StudentDashboard from "./pages/StudentDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import ErrorPage from "./pages/Errorpage"; // Import the ErrorPage component
import JSXerror from "./pages/JSXerror";
import Register from "./pages/Register";
import axios from "axios";

const validateToken = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/auth/validate", {
      headers: {
        Authorization: `Bearer ${token}`, // Send the token in the Authorization header
      },
    });
    console.log("Token validation successful:", response.data);
    return true;
  } catch (err) {
    console.error("Token validation failed:", err);
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); // State to track token validation
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        console.log("No token found. Redirecting to error page.");
        setIsValid(false);
        return;
      }
      const valid = await validateToken(token);
      if (!valid) {
        console.log("Invalid token. Clearing token from localStorage and redirecting.");
        localStorage.removeItem("token"); // Clear the token
      }
      setIsValid(valid);
    };

    checkToken();
  }, [token]);

  if (isValid === null) {
    // While validation is in progress, show a loading indicator
    return <div>Loading...</div>;
  }

  if (!isValid) {
    // Redirect to the error page if the token is invalid
    return <Navigate to="/JSXerror" />;
  }

  return children;
};

function App() {
  return (
    <Router>
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
          path="/register"
          element={
              <Register />
          }
        />
        <Route path="/JSXerror" element={<JSXerror/>} /> 
        <Route path="/error" element={<ErrorPage />} /> {/* Error page route */}
        <Route path="*" element={<ErrorPage />} /> {/* Catch-all route */}
      </Routes>
    </Router>
  );
}

export default App;