import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FinancialAidPage() {
  const [aidInfo, setAidInfo] = useState(null);

  // Replace this with actual ID from JWT or login context later
  const dummyStudentId = "YOUR_STUDENT_OBJECT_ID";

  useEffect(() => {
    axios.get(`http://localhost:8080/api/financial-aid/${dummyStudentId}`)
      .then((res) => setAidInfo(res.data))
      .catch((err) => console.error("Error fetching financial aid:", err));
  }, []);

  if (!aidInfo) return <div className="p-6">Loading financial aid info...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Financial Aid Summary</h1>
      <p className="text-md mb-2 font-medium">Status: {aidInfo.account_status}</p>
      <p className="text-md mb-4">Term: {aidInfo.term}</p>

      <h2 className="text-lg font-semibold mb-2">Aid Received:</h2>
      <ul className="list-disc pl-6 text-sm">
        {aidInfo.aid.map((entry, index) => (
          <li key={index}>
            <span className="font-medium">{entry.type}</span>: {entry.description}
          </li>
        ))}
      </ul>
    </div>
  );
}