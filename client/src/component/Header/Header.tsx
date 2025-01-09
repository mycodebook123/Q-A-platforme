import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
const Header: React.FC = () => {
  const { user } = useAuth(); // Access user from context
  console.log("User state in Header:", user); // Debugging

  return (
    <header className={`py-3 ${classes.header}`}>
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link to="/" className={`${classes.logo} text-decoration-none`}>
          <span className={classes.logoHighlight}>Q&A</span> Hub
        </Link>

        {/* Navigation Links */}
        <nav className={`d-none d-md-flex gap-4 ${classes.navLinks}`}>
          <Link to="/" className={`${classes.navItem} text-decoration-none`}>
            <FaHome className="me-2" />
            Home
          </Link>
          <Link
            to="/how-it-works"
            className={`${classes.navItem} text-decoration-none`}
          >
            <FaInfoCircle className="me-2" />
            How It Works
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="d-flex gap-3">
          {user ? (
            <Link to="/logout" className={`btn ${classes.logoutButton}`}>
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" className={`btn ${classes.loginButton}`}>
                Log In
              </Link>
              <Link to="/register" className={`btn ${classes.signupButton}`}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
