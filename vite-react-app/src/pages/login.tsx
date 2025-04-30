import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import "./login.css"; // Import the CSS file

export default function LoginPage() {
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://74.235.248.40:8080/api/auth/login", {
        email: email,
        password: password,
      });

      console.log("Response received from server:", response.data);

      const token = response.data.token;
      const serverRole = response.data.role.toLowerCase(); // Use role directly from the response
      const userId = response.data.id; // Extract the user ID
      const userProgram = response.data.program; // Extract the program

      if (!token || !serverRole || !userId || !userProgram) {
        throw new Error("Invalid response structure from server.");
      }

      // Save token, role, id, program, and email in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("role", serverRole);
      localStorage.setItem("id", userId);
      localStorage.setItem("program", userProgram);
      localStorage.setItem("email", email); // Save the email

      console.log("Token saved:", localStorage.getItem("token"));
      console.log("Role saved:", localStorage.getItem("role"));
      console.log("ID saved:", localStorage.getItem("id"));
      console.log("Program saved:", localStorage.getItem("program"));
      console.log("Email saved:", localStorage.getItem("email"));

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