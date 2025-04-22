import React, { useEffect, useState } from "react";
import axios from "axios";
import ProgramCard from "../components/ProgramCard";

export default function ProgramList() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/programs")
      .then((res) => setPrograms(res.data))
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">All Programs</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        {programs.map((program) => (
          <ProgramCard key={program._id} program={program} />
        ))}
      </div>
    </div>
  );
}