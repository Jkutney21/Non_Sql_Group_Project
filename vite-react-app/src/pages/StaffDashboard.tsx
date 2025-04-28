import { useEffect, useState } from "react";
import "./StaffDashboard.css"; // Import the CSS file

interface Course {
  courseId: string;
  courseName: string;
  email: string;
  program: string;
  time: string;
  level: string;
}

export default function StaffDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      const email = localStorage.getItem("email"); // Get the email from localStorage

      if (!email) {
        setError("Email not found in local storage.");
        return;
      }

      try {
        
        const response = await fetch(`http://localhost:8080/api/courses/email/${email}`);

        if (!response.ok) {
          throw new Error("Failed to fetch courses.");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err instanceof Error ? err.message : "An error occurred.");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="staff-dashboard-container">
      <h1 className="staff-dashboard-title">Staff Dashboard</h1>
      <p className="staff-dashboard-welcome">
        Welcome, staff! Here are the courses you are managing:
      </p>

      {error && <p className="staff-dashboard-error">{error}</p>}

      {courses.length > 0 ? (
  <div
    className="staff-dashboard-courses"
    style={{
      display: "grid",
      gap: "20px",
      gridTemplateColumns:
        courses.length < 3
          ? `repeat(${courses.length}, minmax(300px, 1fr))` // Use the number of courses if less than 3
          : `repeat(auto-fit, minmax(300px, 1fr))`, // Dynamically adjust columns for 3 or more courses
    }}
  >
    {courses.map((course) => (
      <div key={course.courseId} className="staff-dashboard-course-card">
        <h2 className="staff-dashboard-course-title">{course.courseName}</h2>
        <p><strong>Course ID:</strong> {course.courseId}</p>
        <p><strong>Program:</strong> {course.program}</p>
        <p><strong>Time:</strong> {course.time}</p>
        <p><strong>Level:</strong> {course.level}</p>
      </div>
    ))}
  </div>
) : (
  !error && <p className="staff-dashboard-no-courses">No courses found.</p>
)}
    </div>
  );
}