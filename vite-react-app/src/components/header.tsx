import { Link } from "react-router-dom";
import "./header.css"; // Import the CSS file

export default function Header({ role }: { role: string | null }) {
  console.log("Role passed to Header:", role);

  return (
    <nav className="header-navbar">
      <div className="header-brand" >
        {role ? `Welcome, ${role.charAt(0).toUpperCase() + role.slice(1)}` : "Welcome"}
      </div>
      <div className="header-links">
        <ul className="header-nav">
          {role === "student" && (
            <li className="header-nav-item">
              <Link className="header-nav-link" to="/student">
                Student Dashboard
              </Link>
            </li>
          )}
          {role === "staff" && (
            <li className="header-nav-item">
              <Link className="header-nav-link" to="/staff">
                Staff Dashboard
              </Link>
            </li>
          )}
          {!role && (
            <>
              <li className="header-nav-item">
                <Link className="header-nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="header-nav-item">
                <Link className="header-nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="last-header-nav-item">
                <Link className="header-nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}