import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import classes from "./footer.module.css";

const Footer: React.FC = () => {
  const handleRedirect = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className={`py-5 text-white ${classes.footer}`}>
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-md-4 text-center">
            <h4 className={classes.footerLogo}>Q&A Hub</h4>
            <p>Empowering developers through knowledge sharing.</p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <FaFacebookF
                role="button"
                onClick={() => handleRedirect("https://facebook.com")}
                className={`${classes.icon}`}
              />
              <FaInstagram
                role="button"
                onClick={() => handleRedirect("https://instagram.com")}
                className={`${classes.icon}`}
              />
              <FaLinkedin
                role="button"
                onClick={() => handleRedirect("https://linkedin.com")}
                className={`${classes.icon}`}
              />
            </div>
          </div>

          {/* Useful Links Section */}
          <div className="col-md-4 text-center">
            <h5 className="mb-3">Useful Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/how-it-works" className="text-decoration-none text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-decoration-none text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-decoration-none text-white">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="col-md-4 text-center text-md-end">
            <h5 className="mb-3">Contact Us</h5>
            <p>Email: support@qnahub.com</p>
            <p>Phone: +1-800-123-4567</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
