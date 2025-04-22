import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProfessorList() {
  const [professors, setProfessors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/professors")
      .then((res) => setProfessors(res.data))
      .catch((err) => console.error("Failed to fetch professors:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Professors</h1>
      <div className="space-y-4">
        {professors.map((prof) => (
          <div key={prof._id} className="bg-white shadow p-4 rounded">
            <h2 className="text-xl font-semibold">{prof.title} {prof.first_name}</h2>
            <p className="text-sm mb-2">Department: {prof.department}</p>
            <p className="text-sm font-medium">Courses Taught:</p>
            <ul className="list-disc pl-6 text-sm text-gray-700">
              {prof.courses_taught?.map((course, index) => (
                <li key={index}>{course.course_code} - {course.title}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}