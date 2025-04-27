import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {jwtDecode }from "jwt-decode"; // Corrected import for jwtDecode
import "./login.css"; // Import the CSS file

export default function LoginPage() {
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("testuser@example.com");
  const [password, setPassword] = useState("yourSecurePassword");
  const navigate = useNavigate();

  
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log("Login form submitted");
    console.log("Email:", email);
    console.log("Password:", password);

    try {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
            email: email,
            password: password,
        });

        console.log("Response received from server:", response);

        const token = response.data.token;
        const serverRole = response.data.role.toLowerCase(); // Use role directly from the response

        console.log("Token received:", token);
        console.log("Role from response:", serverRole);

        // Save token and role in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("role", serverRole);

        if (serverRole === "staff") {
            console.log("Navigating to /staff");
            navigate("/staff");
        } else if (serverRole === "student") {
            console.log("Navigating to /student");
            navigate("/student");
        } else {
            throw new Error("Unknown role received from server");
        }
    } catch (err) {
        console.error("Error during login:", err);
        setError("Invalid login credentials. Please try again.");
    }
};

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select
          className="login-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="login-footer">
        Don't have an account?{" "}
        <Link to="/register" className="login-link">
          Sign Up
        </Link>
      </p>
    </div>
  );
}