// src/components/LoginRegisterForm.js

import React, { useState } from "react";
import "../style/login.css";
import GoogleIcon from "../assets/images/google.png";

/**
 * LoginRegisterForm Component
 * This component provides a form for user registration and login.
 * Users can toggle between the registration and login forms.
 */
const LoginRegisterForm = () => {
  // ------------------------------------------------------------------
  // Form Toggle State
  // ------------------------------------------------------------------
  // 'register-form' is shown by default; toggling switches between login and register.
  const [form, setForm] = useState("register-form");

  // ------------------------------------------------------------------
  // Registration State, Errors, and Touched Fields
  // ------------------------------------------------------------------
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  // For password field, errors are stored as an array (others as strings)
  const [registerErrors, setRegisterErrors] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
    password: [],
    confirmPassword: "",
  });
  const [registerTouched, setRegisterTouched] = useState({
    name: false,
    email: false,
    phone: false,
    otp: false,
    password: false,
    confirmPassword: false,
  });
  // State to control display of the password criteria info.
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);

  // ------------------------------------------------------------------
  // Login State, Errors, and Touched Fields
  // ------------------------------------------------------------------
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });
  const [loginTouched, setLoginTouched] = useState({
    email: false,
    password: false,
  });

  // ------------------------------------------------------------------
  // Function to Switch Between Forms
  // ------------------------------------------------------------------
  const showForm = (formId) => {
    setForm(formId);
  };

  // ------------------------------------------------------------------
  // Validation Functions
  // ------------------------------------------------------------------
  // Validate a single registration field based on its type.
  const validateRegisterField = (field, value) => {
    let error = "";
    if (field === "name") {
      if (!value.trim()) {
        error = "Full name is required.";
      } else if (value.trim().length < 3) {
        error = "Full name must be at least 3 characters.";
      }
      return error;
    }
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email address.";
      }
      return error;
    }
    if (field === "phone") {
      if (!value.trim()) {
        error = "Phone number is required.";
      } else if (!/^\d{10}$/.test(value)) {
        error = "Phone number must be 10 digits.";
      }
      return error;
    }
    if (field === "otp") {
      if (!value.trim()) {
        error = "OTP is required.";
      }
      return error;
    }
    if (field === "password") {
      if (!value.trim()) {
        return ["Password is required."];
      } else {
        // Check for password strength criteria.
        const missingCriteria = [];
        if (!/[A-Z]/.test(value)) missingCriteria.push("An uppercase letter");
        if (!/[a-z]/.test(value)) missingCriteria.push("A lowercase letter");
        if (!/\d/.test(value)) missingCriteria.push("A number");
        if (!/[\W_]/.test(value)) missingCriteria.push("A special character");
        if (value.length < 8) missingCriteria.push("At least 8 characters");
        return missingCriteria;
      }
    }
    if (field === "confirmPassword") {
      if (value !== registerValues.password) {
        error = "Passwords do not match.";
      }
      return error;
    }
  };

  // Validate a single login field.
  const validateLoginField = (field, value) => {
    let error = "";
    if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email address.";
      }
      return error;
    }
    if (field === "password") {
      if (!value.trim()) {
        error = "Password is required.";
      }
      return error;
    }
  };

  // ------------------------------------------------------------------
  // Registration Form Handlers
  // ------------------------------------------------------------------
  // onChange handler: update registration value and revalidate if field was touched.
  const handleRegisterChange = (e) => {
    const { id, value } = e.target;
    setRegisterValues((prev) => ({ ...prev, [id]: value }));
    if (registerTouched[id]) {
      const error = validateRegisterField(id, value);
      setRegisterErrors((prev) => ({ ...prev, [id]: error }));
      // Revalidate confirmPassword if password changes.
      if (id === "password" && registerTouched.confirmPassword) {
        const confirmError = validateRegisterField("confirmPassword", registerValues.confirmPassword);
        setRegisterErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
      }
    }
  };

  // onBlur handler: mark field as touched and validate.
  const handleRegisterBlur = (e) => {
    const { id, value } = e.target;
    setRegisterTouched((prev) => ({ ...prev, [id]: true }));
    const error = validateRegisterField(id, value);
    setRegisterErrors((prev) => ({ ...prev, [id]: error }));
    if (id === "password" && registerTouched.confirmPassword) {
      const confirmError = validateRegisterField("confirmPassword", registerValues.confirmPassword);
      setRegisterErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  // ------------------------------------------------------------------
  // Login Form Handlers
  // ------------------------------------------------------------------
  // onChange handler: update login value and revalidate if field was touched.
  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginValues((prev) => ({ ...prev, [id]: value }));
    if (loginTouched[id]) {
      const error = validateLoginField(id, value);
      setLoginErrors((prev) => ({ ...prev, [id]: error }));
    }
  };

  // onBlur handler: mark login field as touched and validate.
  const handleLoginBlur = (e) => {
    const { id, value } = e.target;
    setLoginTouched((prev) => ({ ...prev, [id]: true }));
    const error = validateLoginField(id, value);
    setLoginErrors((prev) => ({ ...prev, [id]: error }));
  };

  // ------------------------------------------------------------------
  // Form Validation Functions
  // ------------------------------------------------------------------
  // Validate all registration fields; returns true if valid.
  const validateRegister = () => {
    const errors = {};
    Object.keys(registerValues).forEach((field) => {
      errors[field] = validateRegisterField(field, registerValues[field]);
    });
    setRegisterErrors(errors);
    return Object.keys(errors).every((field) =>
      field === "password" ? errors[field].length === 0 : errors[field] === ""
    );
  };

  // Validate all login fields; returns true if valid.
  const validateLogin = () => {
    const errors = {};
    Object.keys(loginValues).forEach((field) => {
      errors[field] = validateLoginField(field, loginValues[field]);
    });
    setLoginErrors(errors);
    return Object.values(errors).every((error) => error === "");
  };

  // ------------------------------------------------------------------
  // Form Submit Handlers
  // ------------------------------------------------------------------
  const handleRegisterSubmit = () => {
    if (validateRegister()) {
      console.log("Registration successful", registerValues);
      alert("Registration successful!");
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      console.log("Login successful", loginValues);
      alert("Login successful!");
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  // ------------------------------------------------------------------
  // Render Component
  // ------------------------------------------------------------------
  return (
    <div className="login-register-container">
      {/* Registration Form */}
      {form === "register-form" && (
        <div className="register_form" id="register-form">
          <form action="#">
            <h3>Register</h3>
            {/* Full Name Input */}
            <div className="input_box">
              <label htmlFor="name">Enter Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter full name"
                value={registerValues.name}
                onChange={handleRegisterChange}
                onBlur={handleRegisterBlur}
                required
              />
              {registerTouched.name && registerErrors.name && (
                <span className="error">{registerErrors.name}</span>
              )}
            </div>
            {/* Email Input */}
            <div className="input_box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                value={registerValues.email}
                onChange={handleRegisterChange}
                onBlur={handleRegisterBlur}
                required
              />
              {registerTouched.email && registerErrors.email && (
                <span className="error">{registerErrors.email}</span>
              )}
            </div>
            {/* Phone Input with OTP Button */}
            <div className="input_box">
              <label htmlFor="phone">Phone</label>
              <div className="phone-number">
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter phone number"
                  value={registerValues.phone}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  required
                />
                <button type="button" id="otpBtn">Send OTP</button>
              </div>
              {registerTouched.phone && registerErrors.phone && (
                <span className="error">{registerErrors.phone}</span>
              )}
            </div>
            {/* OTP Input */}
            <div className="input_box">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={registerValues.otp}
                onChange={handleRegisterChange}
                onBlur={handleRegisterBlur}
                required
              />
              {registerTouched.otp && registerErrors.otp && (
                <span className="error">{registerErrors.otp}</span>
              )}
            </div>
            {/* Password Input with Password Info */}
            <div className="password_container">
              <div className="input_box">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={registerValues.password}
                  onChange={handleRegisterChange}
                  onFocus={() => setShowPasswordInfo(true)}
                  onBlur={(e) => {
                    handleRegisterBlur(e);
                    setShowPasswordInfo(false);
                  }}
                  required
                />
              </div>
              {showPasswordInfo &&
                registerTouched.password &&
                Array.isArray(registerErrors.password) &&
                registerErrors.password.length > 0 && (
                  <div className="password-info">
                    <ul>
                      {registerErrors.password.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
            {/* Confirm Password Input */}
            <div className="input_box">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={registerValues.confirmPassword}
                onChange={handleRegisterChange}
                onBlur={handleRegisterBlur}
                required
              />
              {registerTouched.confirmPassword && registerErrors.confirmPassword && (
                <span className="error">{registerErrors.confirmPassword}</span>
              )}
            </div>
            {/* Register Submit Button */}
            <button type="button" id="registerBtn" onClick={handleRegisterSubmit}>
              Register
            </button>
            {/* Separator and Google Signup Option */}
            <p className="separator">
              <span>or</span>
              <div className="login_option">
                <div className="option">
                  <a href="#">
                    <img src={GoogleIcon} alt="Google" />
                    <span>Sign Up With Google</span>
                  </a>
                </div>
              </div>
            </p>
            {/* Link to Switch to Login Form */}
            <p className="sign_up">
              Already have an account?{" "}
              <a href="#" onClick={() => showForm("login-form")} className="show-login">
                Log in
              </a>
            </p>
          </form>
        </div>
      )}

      {/* Login Form */}
      {form === "login-form" && (
        <div className="login_form" id="login-form">
          <form onSubmit={handleLoginSubmit}>
            <h3>Log in</h3>
            {/* Email Input */}
            <div className="input_box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter email address"
                value={loginValues.email}
                onChange={handleLoginChange}
                onBlur={handleLoginBlur}
                required
              />
              {loginTouched.email && loginErrors.email && (
                <span className="error">{loginErrors.email}</span>
              )}
            </div>
            {/* Password Input */}
            <div className="input_box">
              <div className="password_title">
                <label htmlFor="password">Password</label>
                <a href="#">Forgot Password?</a>
              </div>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={loginValues.password}
                onChange={handleLoginChange}
                onBlur={handleLoginBlur}
                required
              />
              {loginTouched.password && loginErrors.password && (
                <span className="error">{loginErrors.password}</span>
              )}
            </div>
            {/* Login Submit Button */}
            <button type="submit" id="loginBtn">
              Log In
            </button>
            {/* Separator and Google Login Option */}
            <p className="separator">
              <span>or</span>
              <div className="login_option">
                <div className="option">
                  <a href="#">
                    <img src={GoogleIcon} alt="Google" />
                    <span>Sign In With Google</span>
                  </a>
                </div>
              </div>
            </p>
            {/* Link to Switch to Registration Form */}
            <p className="sign_up">
              Don't have an account?{" "}
              <a href="#" onClick={() => showForm("register-form")} className="show-register">
                Sign up
              </a>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginRegisterForm;
