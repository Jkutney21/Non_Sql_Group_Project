export default function StudentDashboard() {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
        <p>Welcome, student! Here you'll see your enrolled courses and programs.</p>
  
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Enrolled Courses</h2>
            <ul className="list-disc pl-5">
              <li>CS101 - Introduction to Computer Science</li>
              <li>MATH201 - Calculus I</li>
            </ul>
          </div>
  
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Your Program</h2>
            <p>Masters of Data Science and AI</p>
          </div>
        </div>
      </div>
    );
  }  