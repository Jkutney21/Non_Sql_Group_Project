import  { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import Header from "../components/header"; // Import the Header component

const JSXerror = () => {
  useEffect(() => {
    // Clear local storage when this page is rendered
    localStorage.clear();
    console.log("Local storage cleared due to invalid session.");
  }, []);

  return (
    <>
      <Header role={null} /> {/* Render the Header with no role */}
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Session isn't valid</h1>
        <p>Please log in again.</p>
        <p>
          <Link to="/login" style={{ color: "#2563eb", textDecoration: "underline" }}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default JSXerror;