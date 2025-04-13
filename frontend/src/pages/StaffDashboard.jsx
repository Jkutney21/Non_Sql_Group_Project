export default function StaffDashboard() {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Staff Dashboard</h1>
        <p>Welcome, staff! Here you’ll be able to manage courses, programs, and students.</p>
  
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Manage Courses</h2>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Add New Course</button>
          </div>
  
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Manage Students</h2>
            <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded">View All Students</button>
          </div>
        </div>
      </div>
    );
  }  