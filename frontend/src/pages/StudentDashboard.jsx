import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the JWT token from localStorage
        const response = await fetch("/api/auth/courses", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 403) {
          throw new Error("Access forbidden. Please check your permissions.");
        }

        const data = await response.json();
        console.log("API Response:", data); // Log the response to the console
        setCourses(data); 
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err.message || "Failed to fetch courses.");
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p>Welcome, student! Here you'll see your enrolled courses and programs.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Enrolled Courses</h2>
          {courses.length > 0 ? (
            <ul className="list-disc pl-5">
              {courses.map((course, index) => (
                <li key={index}>{course.name}</li> 
              ))}
            </ul>
          ) : (
            <p>No courses found.</p>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Your Program</h2>
          <p>Masters of Data Science and AI</p>
        </div>
      </div>
    </div>
  );
}