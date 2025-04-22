import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">
          <Link to="/">Navbar</Link>
        </h1>
        <div className="space-x-4">
          <Link to="/student" className="hover:underline">Student Dashboard</Link>
          <Link to="/staff" className="hover:underline">Staff Dashboard</Link>
          <Link to="/courses" className="hover:underline">Courses</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/programs" className="hover:underline">Programs</Link>
          <Link to="/levels" className="hover:underline">Levels</Link>
          <Link to="/professors" className="hover:underline">Professors</Link>
          <Link to="/financial-aid" className="hover:underline">Financial Aid</Link>
        </div>
      </div>
    </nav>
  );
}