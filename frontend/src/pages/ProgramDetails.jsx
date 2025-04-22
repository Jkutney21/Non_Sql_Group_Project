import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/programs/${id}`)
      .then((res) => setProgram(res.data))
      .catch((err) => console.error("Error loading program:", err));
  }, [id]);

  if (!program) return <div className="p-6">Loading program details...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-2">{program.Name}</h1>
      <p className="text-md mb-4">Department: {program.Department}</p>
      <p className="text-md mb-4">Level: {program.level_id?.name}</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Required Courses</h2>
      <ul className="list-disc pl-6 text-sm">
        {program.required_courses?.map((course) => (
          <li key={course._id}>
            {course.course_code} - {course.title}
          </li>
        ))}
      </ul>
    </div>
  );
}