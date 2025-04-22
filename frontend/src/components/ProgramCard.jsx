import React from "react";
import { Link } from "react-router-dom";

export default function ProgramCard({ program }) {
  return (
    <div className="bg-white shadow p-4 rounded">
      <h2 className="text-xl font-semibold mb-1">{program.Name}</h2>
      <p className="text-sm text-gray-700">Department: {program.Department}</p>
      <Link to={`/programs/${program._id}`} className="text-blue-600 hover:underline">
        View Details
      </Link>
    </div>
  );
}