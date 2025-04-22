import React from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold">{course.course_code} - {course.title}</h2>
      <p className="text-sm">{course.description}</p>
      <p className="text-sm font-medium">Credits: {course.credits}</p>
      <Link
        to={`/courses/${course._id}`}
        className="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
    </div>
  );
}