import { useEffect, useState } from "react";
import "./StudentFIn.css"; // Import the CSS file

interface FinancialAid {
  id: string;
  userId: string;
  type: string;
  amount: number;
}

export default function StudentFin() {
  const [financialAid, setFinancialAid] = useState<FinancialAid[]>([]);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState<number>(0); // State for the selected amount
  const [successMessage, setSuccessMessage] = useState("");
  const [showForm, setShowForm] = useState(false); // State to toggle form visibility

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
  }, [successMessage]); // Add successMessage as a dependency

  const handleApplyForAid = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem("id"); // Get the userId from local storage
    if (!userId) {
      setError("User ID not found in local storage.");
      return;
    }

    const aidRequest = {
      userId,
      amount,
      type: "Pending",
      date: new Date().toISOString().split("T")[0], // Format date as YYYY-MM-DD
    };

    try {
      const response = await fetch("http://localhost:8080/api/aid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aidRequest),
      });

      if (!response.ok) {
        throw new Error("Failed to submit financial aid request.");
      }

      setSuccessMessage("Financial aid request submitted successfully!");
      setAmount(0); // Reset the amount field
      setShowForm(false); // Hide the form after successful submission
    } catch (err) {
      console.error("Error submitting financial aid request:", err);
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  return (
    <div className="student-fin-container">
      <h1 className="student-fin-title">Financial Aid Information</h1>
      {error && <p className="student-fin-error">{error}</p>}
      {successMessage && <p className="student-fin-success">{successMessage}</p>}
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
      <button
        className="student-fin-apply-button"
        onClick={() => setShowForm(!showForm)} // Toggle form visibility
      >
        {showForm ? "Cancel" : "Apply for Aid"}
      </button>
      {showForm && (
        <div className="student-fin-form-box">
          <form className="student-fin-form" onSubmit={handleApplyForAid}>
            <label htmlFor="amount" className="student-fin-label">
              Select Amount:
            </label>
            <input
              type="number"
              id="amount"
              className="student-fin-input"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min="0"
              required
            />
            <button type="submit" className="student-fin-submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}