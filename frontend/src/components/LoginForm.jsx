import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginForm() {
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("testuser@example.com");          
  const [password, setPassword] = useState("yourSecurePassword"); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email: email, // Use "email" instead of "username"
        password: password,
      });
    
  
      // Store the token in localStorage
      console.log("Storing token in localStorage...");
      localStorage.setItem("token", response.data.token);
  
      // Navigate based on role
      console.log("Navigating to dashboard based on role...");
      if (role === "staff") {
        console.log("Navigating to /staff");
        navigate("/staff");
      } else {
        console.log("Navigating to /student");
        navigate("/student");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid login credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow rounded mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {/* 🔐 Password Input */}
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mb-3 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <select
        className="w-full p-2 mb-3 border rounded"
        value={role}
        onChange={(e) => {
          console.log("Role changed:", e.target.value);
          setRole(e.target.value);
        }}
      >
        <option value="student">Student</option>
        <option value="staff">Staff</option>
      </select>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded"
        onClick={() => console.log("Login button clicked")}
      >
        Login
      </button>
    </form>
  );
}