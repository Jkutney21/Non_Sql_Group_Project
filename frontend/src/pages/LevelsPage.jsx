import React, { useEffect, useState } from "react";
import api from "../api";

export default function LevelsPage() {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    api.get("/api/levels")
      .then((res) => setLevels(res.data))
      .catch((err) => console.error("Failed to fetch levels:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Available Levels</h1>
      <div className="space-y-4">
        {levels.map((level) => (
          <div key={level._id} className="bg-white shadow p-4 rounded">
            <h2 className="text-lg font-semibold">{level.name}</h2>
            <p className="text-sm text-gray-700">{level.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}