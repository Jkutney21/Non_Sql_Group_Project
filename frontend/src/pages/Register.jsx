import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api";

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student',
    program: '', // Required by backend
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    console.log('Registering:', formData);
    setError(''); // Clear any previous errors

    try {
      // Send required fields to backend including capitalized role and program
      await api.post("/api/auth/register", {
        email: formData.email,
        password: formData.password,
        role: formData.role.toUpperCase(),
        program: formData.program,
      });

      alert("Registration successful. You can now log in.");
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration error. Email may already exist or fields may be invalid.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
    <div className="register-container">
      <h2 className="text-center text-xl font-semibold mb-4">User Registration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Student">Student</option>
          <option value="Staff">Staff</option>
        </select>
        <input
          type="text"
          name="program"
          placeholder="Program (e.g., Computer Science)"
          value={formData.program}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Already have an account?{' '}
        <Link to="/" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
    </div>
  );
};

export default Register;