import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./register.module.css";
import Footer from "../../component/Footer/Footer";
import Header from "../../component/Header/Header";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register: React.FC = () => {
  const [success, setSuccess] = useState("");
  const [errorData, setErrorData] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const firstnameRef = useRef<HTMLInputElement | null>(null); // New field
  const lastnameRef = useRef<HTMLInputElement | null>(null); // New field

  const validatePassword = () => {
    const passwordValue = passwordRef?.current?.value;
    setPasswordError(!passwordValue || passwordValue.length < 8);
  };

  const validateForm = () => {
    const usernameValue = usernameRef.current?.value;
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    const firstnameValue = firstnameRef.current?.value;
    const lastnameValue = lastnameRef.current?.value;

    if (!usernameValue || !emailValue || !passwordValue || !firstnameValue || !lastnameValue) {
      setErrorData("Please provide all required information.");
      return false;
    }

    if (passwordValue.length < 8) {
      setErrorData("Password must be at least 8 characters long.");
      return false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailValue)) {
      setErrorData("Please provide a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameValue = usernameRef.current?.value;
    const emailValue = emailRef.current?.value;
    const passwordValue = passwordRef.current?.value;
    const firstnameValue = firstnameRef.current?.value;
    const lastnameValue = lastnameRef.current?.value;

    // Validate the form
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          firstname: firstnameValue,
          lastname: lastnameValue, // Send new fields
        }),
      });

      if (!response.ok) {
        throw new Error("Registration request failed.");
      }

      const data = await response.json();
      setSuccess(data.msg);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setErrorData(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={`${classes.pageWrapper} d-flex align-items-center`}>
        <div className="container">
          <div className={`card mx-auto ${classes.registerCard}`}>
            <div className="card-body">
              <h3 className={`text-center mb-4 ${classes.registerTitle}`}>
                Create Your Account
              </h3>
              <form onSubmit={handleSubmit}>
                {errorData && (
                  <div
                    className={`alert alert-danger ${classes.alertMessage}`}
                    onClick={() => setErrorData("")} // Clear error message on click
                  >
                    {errorData}
                  </div>
                )}
                {success && (
                  <div
                    className={`alert alert-success ${classes.alertMessage}`}
                    onClick={() => setSuccess("")} // Clear success message on click
                  >
                    {success}
                  </div>
                )}
                <div className={`mb-3 ${classes.inputGroup}`}>
                  <label htmlFor="username" className={classes.label}>
                    Username
                  </label>
                  <input
                    ref={usernameRef}
                    type="text"
                    id="username"
                    placeholder="Enter your username"
                    className={`form-control ${classes.input}`}
                    onFocus={() => setErrorData("")} // Clear error on input focus
                  />
                </div>
                <div className={`mb-3 ${classes.inputGroup}`}>
                  <label htmlFor="email" className={classes.label}>
                    Email Address
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={`form-control ${classes.input}`}
                    onFocus={() => setErrorData("")} // Clear error on input focus
                  />
                </div>
                <div className={`mb-3 ${classes.inputGroup}`}>
                  <label htmlFor="firstname" className={classes.label}>
                    First Name
                  </label>
                  <input
                    ref={firstnameRef}
                    type="text"
                    id="firstname"
                    placeholder="Enter your first name"
                    className={`form-control ${classes.input}`}
                    onFocus={() => setErrorData("")} // Clear error on input focus
                  />
                </div>
                <div className={`mb-3 ${classes.inputGroup}`}>
                  <label htmlFor="lastname" className={classes.label}>
                    Last Name
                  </label>
                  <input
                    ref={lastnameRef}
                    type="text"
                    id="lastname"
                    placeholder="Enter your last name"
                    className={`form-control ${classes.input}`}
                    onFocus={() => setErrorData("")} // Clear error on input focus
                  />
                </div>
                <div className={`mb-3 position-relative ${classes.inputGroup}`}>
                  <label htmlFor="password" className={classes.label}>
                    Password
                  </label>
                  <input
                    ref={passwordRef}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className={`form-control ${classes.input}`}
                    onChange={validatePassword}
                    onFocus={() => setErrorData("")} // Clear error on input focus
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className={classes.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                  {passwordError && (
                    <small className="text-danger">
                      Password must be at least 8 characters long.
                    </small>
                  )}
                </div>
                <button
                  type="submit"
                  className={`btn ${classes.registerButton} w-100`}
                >
                  {loading ? <ClipLoader size={20} color="#fff" /> : "Register"}
                </button>
              </form>
              <p className={`mt-4 text-center ${classes.linkText}`}>
                Already have an account?{" "}
                <Link to="/login" className={classes.link}>
                  Log in here.
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
