import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyUniversity
        </Link>
        <div className="hidden md:flex space-x-6">
          {[
            ["Student", "/student"],
            ["Staff", "/staff"],
            ["Courses", "/courses"],
            ["Programs", "/programs"],
            ["Levels", "/levels"],
            ["Professors", "/professors"],
            ["Aid", "/financial-aid"],
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="text-gray-600 hover:text-blue-600 transition"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
);
}