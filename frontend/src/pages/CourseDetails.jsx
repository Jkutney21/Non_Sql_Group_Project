import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function CourseDetails() {
  const { id } = useParams(); // get course ID from URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    api.get(`/api/courses/${id}`)
      .then((res) => {
        setCourse(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch course:", err);
      });
  }, [id]);

  if (!course) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
      <p className="text-lg mb-2">Course Code: {course.course_code}</p>
      <p className="text-md mb-2">Credits: {course.credits}</p>
      <p className="text-sm">{course.description}</p>
    </div>
  );
}