import React, { useEffect, useState } from "react";
import api from "../api";
import { jwtDecode } from "jwt-decode";

export default function FinancialAidPage() {
  const [aidInfo, setAidInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view your aid.");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch {
      setError("Session expired. Please log in again.");
      return;
    }

    const studentId = decoded.userId || decoded.id || decoded.sub;

    api
      .get(`/api/financial-aid/${studentId}`)
      .then((res) => setAidInfo(res.data))
      .catch((err) => {
        console.error("Error fetching financial aid:", err);
        setError("Could not fetch financial aid data.");
      });
  }, []);

  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!aidInfo) return <div className="p-6">Loading financial aid info…</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Financial Aid Summary</h1>
      <p className="text-md mb-2 font-medium">
        Status: {aidInfo.account_status}
      </p>
      <p className="text-md mb-4">Term: {aidInfo.term}</p>

      <h2 className="text-lg font-semibold mb-2">Aid Received:</h2>
      <ul className="list-disc pl-6 text-sm">
        {aidInfo.aid.map((entry, index) => (
          <li key={index}>
            <span className="font-medium">{entry.type}</span>:{" "}
            {entry.description}
          </li>
        ))}
      </ul>
    </div>
  );
}