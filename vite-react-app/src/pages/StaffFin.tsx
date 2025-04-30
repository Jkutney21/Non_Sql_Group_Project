import { useEffect, useState } from "react";
import "./StaffFin.css"; // Import the CSS file

interface FinancialAid {
  id: string;
  email: string | null; // Email can be null
  userId: string;
  type: string;
  amount: number;
}

export default function StaffFin() {
  const [financialAidRequests, setFinancialAidRequests] = useState<FinancialAid[]>([]);
  const [error, setError] = useState("");

  const fetchFinancialAidRequests = async () => {
    try {
      const response = await fetch("http://74.235.248.40:8080/api/aid/type/Pending", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch financial aid requests.");
      }

      const data = await response.json();
      console.log("Financial Aid Requests:", data); // Log the response for debugging
      setFinancialAidRequests(data);
    } catch (err) {
      console.error("Error fetching financial aid requests:", err);
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  useEffect(() => {
    fetchFinancialAidRequests();
  }, []);

  const handleUpdateType = async (id: string, newType: string) => {
    try {
      console.log(`PUT Request URL: http://74.235.248.40:8080/api/aid/${id}/type`);
      console.log("Request Body:", newType);

      const response = await fetch(`http://74.235.248.40:8080/api/aid/${id}/type`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: `"${newType}"`,
      });

      if (!response.ok) {
        throw new Error("Failed to update financial aid type.");
      }

      // Re-fetch the updated list of financial aid requests
      await fetchFinancialAidRequests();
    } catch (err) {
      console.error("Error updating financial aid type:", err);
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  return (
    <div className="staff-fin-container">
      <h1 className="staff-fin-title">
        Manage Financial Aid Requests ({financialAidRequests.length} Pending)
      </h1>
      {error && <p className="staff-fin-error">{error}</p>}
      {financialAidRequests.length > 0 ? (
        <div className="staff-fin-list">
          {financialAidRequests.map((request) => (
            <div key={request.id} className="staff-fin-card">
              <ul className="staff-fin-card-list">
                <li className="staff-fin-card-item">
                  <strong>Email:</strong> {request.email || "N/A"}
                </li>
                <li className="staff-fin-card-item">
                  <strong>Type:</strong> {request.type}
                </li>
                <li className="staff-fin-card-item">
                  <strong>Amount:</strong> ${request.amount.toFixed(2)}
                </li>
              </ul>
              <select
  className="staff-fin-type-dropdown"
  onChange={(e) => handleUpdateType(request.id, e.target.value)}
  defaultValue=""
>
  <option value="" disabled>
    Change Type
  </option>
  <option value="Scholarship">Scholarship</option>
  <option value="Grant">Grant</option>
  <option value="Loan">Loan</option>
  <option value="Work-Study">Work-Study</option>
</select>
            </div>
          ))}
        </div>
      ) : (
        <p className="staff-fin-no-data">No financial aid requests found.</p>
      )}
    </div>
  );
}