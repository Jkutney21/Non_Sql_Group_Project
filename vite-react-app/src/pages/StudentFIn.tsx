import { useEffect, useState } from "react";
import "./StudentFin.css"; // Import the CSS file

interface FinancialAid {
  id: string;
  userId: string;
  type: string;
  amount: number;
}

export default function StudentFin() {
  const [financialAid, setFinancialAid] = useState<FinancialAid[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFinancialAid = async () => {
      const userId = localStorage.getItem("id"); // Get the userId from local storage
      if (!userId) {
        setError("User ID not found in local storage.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/api/aid/user/${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch financial aid information.");
        }

        const data = await response.json();
        console.log("Financial Aid Data:", data); // Log the response for debugging
        setFinancialAid(data);
      } catch (err) {
        console.error("Error fetching financial aid:", err);
        setError(err instanceof Error ? err.message : "An error occurred.");
      }
    };

    fetchFinancialAid();
  }, []);

  return (
    <div className="student-fin-container">
      <h1 className="student-fin-title">Financial Aid Information</h1>
      {error && <p className="student-fin-error">{error}</p>}
      {financialAid.length > 0 ? (
        <div className="student-fin-list">
          {financialAid.map((aid) => (
            <div key={aid.id} className="student-fin-card">
              <ul className="student-fin-card-list">
                <li className="student-fin-card-item">
                  <strong>Type:</strong> {aid.type}
                </li>
                <li className="student-fin-card-item">
                  <strong>Amount:</strong> ${aid.amount.toFixed(2)}
                </li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        !error && <p className="student-fin-no-data">No financial aid information found.</p>
      )}
    </div>
  );
}