import React, { useContext, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import classes from "./login.module.css";
import Footer from "../../component/Footer/Footer";
import Header from "../../component/Header/Header";
import { useAuth } from "../../context/AuthContext"; // Importing useAuth hook
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login: React.FC = () => {
  const { setUser } = useAuth(); // Using useAuth context hook to set user
  const [sucess, setSucess] = useState("");
  const [errodata, setErrorData] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility

  const navigate = useNavigate();
  const emailNameDom = useRef<HTMLInputElement | null>(null);
  const passwordNameDom = useRef<HTMLInputElement | null>(null);

  const validatePassword = () => {
    const passwordValue = passwordNameDom?.current?.value;
    setPasswordError(!passwordValue || passwordValue.length <= 8);
    setEmailError(false);
    setErrorData("");
  };

  const clearEmailError = () => {
    setEmailError(false);
    setErrorData("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailnameValue = emailNameDom.current?.value;
    const passwordnameValue = passwordNameDom.current?.value;

    if (!emailnameValue || !passwordnameValue) {
      setErrorData("Please provide all required information");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailnameValue,
          password: passwordnameValue,
        }),
      });

      if (!response.ok) {
        throw new Error("Login request failed");
      }

      const data = await response.json();
      console.log(data.token); 
      setSucess(data.msg);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setErrorData(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred."
      );
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className={`${classes.pageWrapper} d-flex align-items-center`}>
        <div className="container">
          <div className={`card mx-auto ${classes.loginCard}`}>
            <div className="card-body">
              <h3 className={`text-center mb-4 ${classes.loginTitle}`}>
                Welcome Back!
              </h3>
              <form onSubmit={handleSubmit}>
                {errodata && (
                  <div className={`alert alert-danger ${classes.alertMessage}`}>
                    {errodata}
                  </div>
                )}
                {sucess && (
                  <div
                    className={`alert alert-success ${classes.alertMessage}`}
                  >
                    {sucess}
                  </div>
                )}
                <div className={`mb-3 ${classes.inputGroup}`}>
                  <label htmlFor="email" className={classes.label}>
                    Email Address
                  </label>
                  <input
                    ref={emailNameDom}
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className={`form-control ${emailError && "is-invalid"} ${
                      classes.input
                    }`}
                    onChange={clearEmailError}
                  />
                </div>
                <div className={`mb-3 position-relative ${classes.inputGroup}`}>
                  <label htmlFor="password" className={classes.label}>
                    Password
                  </label>
                  <input
                    ref={passwordNameDom}
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    className={`form-control ${passwordError && "is-invalid"} ${
                      classes.input
                    }`}
                    onChange={validatePassword}
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className={classes.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
                <button
                  type="submit"
                  className={`btn ${classes.loginButton} w-100`}
                >
                  {loading ? (
                    <ClipLoader size={20} color="#fff" />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              <p className={`mt-4 text-center ${classes.linkText}`}>
                Don’t have an account?{" "}
                <Link to="/register" className={classes.link}>
                  Sign up here.
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

export default Login;
