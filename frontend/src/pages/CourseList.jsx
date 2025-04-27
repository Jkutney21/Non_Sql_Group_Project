import React, { useEffect, useState } from "react";
import api from "../api";
import CourseCard from "../components/CourseCard";

export default function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.get("/api/courses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch courses:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">All Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
}