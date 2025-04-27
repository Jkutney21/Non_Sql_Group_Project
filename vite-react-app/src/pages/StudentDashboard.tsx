import { useEffect, useState } from "react";
import "./StudentDashboard.css"; // Import the CSS file

const departments = [
  "Communication Studies", "English", "History", "Sociology", "Political Science",
  "Theatre and Dance", "Art and Design", "Music", "Religious Studies", "Women's Studies",
  "Elementary Education", "Early Childhood Education", "Secondary Education",
  "Special Education", "Educational Leadership", "Career and Technology Education",
  "Health Studies", "Nursing", "Nutrition", "Kinesiology", "Biology", "Environmental Science",
  "Computer Science", "Cybersecurity", "Design and Drafting Technology",
  "Accounting", "Finance", "Marketing", "Management", "Entrepreneurship", "Aviation",
  "Criminal Justice", "Social Work"
];

export default function StudentDashboard() {
  const [courses, setCourses] = useState<{
    courseId: string;
    courseName: string;
    teacherName: string;
    program: string;
    time: string;
    level: string;
  }[]>([]);
  const [error, setError] = useState("");
  const [selectedProgram, setSelectedProgram] = useState(
    localStorage.getItem("program") || "Computer Science"
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!selectedProgram) {
          throw new Error("Program not selected.");
        }

        const response = await fetch(
          `http://localhost:8080/api/courses/department?department=${encodeURIComponent(
            selectedProgram
          )}`,
          {
            method: "GET",
          }
        );

        if (response.status === 403) {
          throw new Error("Access forbidden. Please check your permissions.");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch courses. Please try again later.");
        }

        const data = await response.json();
        console.log("API Response:", data); // Log the response to the console
        setCourses(data); // Assuming the API returns an array of courses
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch courses.");
      }
    };

    fetchCourses();
  }, [selectedProgram]);

  const handleProgramChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newProgram = e.target.value;
    setSelectedProgram(newProgram);
    localStorage.setItem("program", newProgram); // Save the selected program to local storage
  };

  return (
    <div className="student-dashboard-container">
      <h1 className="student-dashboard-title">Student Dashboard</h1>

      <div className="student-dashboard-program-selector">
        <label htmlFor="program-select" className="student-dashboard-label">
          Select Department:
        </label>
        <select
          id="program-select"
          value={selectedProgram}
          onChange={handleProgramChange}
          className="student-dashboard-dropdown"
          
        >
          {departments.map((department, index) => (
            <option key={index} value={department}>
              {department}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="student-dashboard-error">{error}</p>}

      <div className="student-dashboard-courses">
        <h2 className="student-dashboard-subtitle">Courses for {selectedProgram}</h2>
        {courses.length > 0 ? (
          <div className="student-dashboard-course-grid">
            {courses.map((course, index) => (
              <div key={index} className="student-dashboard-card">
                <ul className="student-dashboard-card-list">
                  <li className="student-dashboard-card-item">
                    <strong>Course ID:</strong> {course.courseId}
                  </li>
                  <li className="student-dashboard-card-item">
                    <strong>Course Name:</strong> {course.courseName}
                  </li>
                  <li className="student-dashboard-card-item">
                    <strong>Teacher:</strong> {course.teacherName}
                  </li>
                  <li className="student-dashboard-card-item">
                    <strong>Time:</strong> {course.time}
                  </li>
                  <li className="student-dashboard-card-item">
                    <strong>Level:</strong> {course.level}
                  </li>
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="student-dashboard-no-courses">No courses found.</p>
        )}
      </div>
    </div>
  );
}