import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function LoginForm({ onLogin }) {
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      const token = data.token;
      onLogin(token);
      localStorage.setItem("token", token);
      navigate(role === "staff" ? "/staff" : "/student");
    } catch (e) {
      setError("Invalid credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="staff">Staff</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Login
      </button>
    </form>
  );
}