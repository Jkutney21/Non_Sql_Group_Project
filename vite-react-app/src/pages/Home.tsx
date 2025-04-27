import { Link } from "react-router-dom";
import "./Home.css"; // Import the CSS file

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Our Platform!</h1>
      <p className="home-description">
        Explore our features and manage your courses with ease.
      </p>
      <div className="home-buttons">
        <Link to="/login" className="home-button login-button">
          Login
        </Link>
        <Link to="/register" className="home-button register-button">
          Sign Up
        </Link>
      </div>
    </div>
  );
}