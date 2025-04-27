import React from "react";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

// Home page renders LoginForm and passes onLogin handler
export default function Home({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>
        {/* Pass onLogin so LoginForm can notify App of the new token */}
        <LoginForm onLogin={onLogin} />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}