import React from "react";
import { Link } from "react-router-dom";

export default function ProgramCard({ program }) {
  return (
    <Link
      to={`/programs/${program._id}`}
      className="block bg-white rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition p-6"
    >
      <h3 className="text-xl font-semibold mb-2">{program.Name}</h3>
      <p className="text-sm text-gray-600 mb-4">
        Department: <span className="font-medium">{program.Department}</span>
      </p>
      <span className="inline-block px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
        View details →
      </span>
    </Link>
  );
}