import React, { useEffect, useState } from "react";
import api from "../api";
import ProgramCard from "../components/ProgramCard";

export default function ProgramList() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    api
      .get("/api/programs")
      .then((res) => setPrograms(res.data))
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">All Programs</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((p) => (
          <ProgramCard key={p._id} program={p} />
        ))}
      </div>
    </section>
  );
}