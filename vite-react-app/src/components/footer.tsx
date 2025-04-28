
import "./footer.css"; // Import the CSS file

export default function Footer() {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-company-info">
          <a
            href="/"
            className="footer-logo-link"
            aria-label="Bootstrap"
          >
            <svg
              className="footer-logo-icon"
              width="30"
              height="24"
              aria-hidden="true"
            >
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </a>
          <span className="footer-company-text">
            © 2025 Non-Sql Project
          </span>
        </div>

        <ul className="footer-social-links">
          <li className="footer-social-item">
            <a
              className="footer-social-link"
              href="#"
              aria-label="Instagram"
            >
              <svg className="footer-social-icon" width="24" height="24" aria-hidden="true">
                <use xlinkHref="#instagram"></use>
              </svg>
            </a>
          </li>
          <li className="footer-social-item">
            <a
              className="footer-social-link"
              href="#"
              aria-label="Facebook"
            >
              <svg className="footer-social-icon" width="24" height="24" aria-hidden="true">
                <use xlinkHref="#facebook"></use>
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}