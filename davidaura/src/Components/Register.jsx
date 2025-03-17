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
  // Removed password and confirm password fields.
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
  });
  const [registerErrors, setRegisterErrors] = useState({
    name: "",
    email: "",
    phone: "",
    otp: "",
  });
  const [registerTouched, setRegisterTouched] = useState({
    name: false,
    email: false,
    phone: false,
    otp: false,
  });

  // ------------------------------------------------------------------
  // Login State, Errors, and Touched Fields
  // ------------------------------------------------------------------
  // Updated login state: replaced email and password with phone and otp.
  const [loginValues, setLoginValues] = useState({
    phone: "",
    otp: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    phone: "",
    otp: "",
  });
  const [loginTouched, setLoginTouched] = useState({
    phone: false,
    otp: false,
  });

  // State to store the generated OTP after clicking "Send OTP"
  const [loginGeneratedOtp, setLoginGeneratedOtp] = useState("");
  const [registerGeneratedOtp, setRegisterGeneratedOtp] = useState("");

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
      } else if (!/^\d{6}$/.test(value)) {
        error = "OTP must be 6 digits.";
      }
      return error;
    }
  };

  // Validate a single login field.
  // Updated login validation to check for phone and otp.
  const validateLoginField = (field, value) => {
    let error = "";
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
      } else if (!/^\d{6}$/.test(value)) {
        error = "OTP must be 6 digits.";
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
    }
  };

  // onBlur handler: mark field as touched and validate.
  const handleRegisterBlur = (e) => {
    const { id, value } = e.target;
    setRegisterTouched((prev) => ({ ...prev, [id]: true }));
    const error = validateRegisterField(id, value);
    setRegisterErrors((prev) => ({ ...prev, [id]: error }));
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
    return Object.values(errors).every((error) => error === "");
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
      // Optionally, you can verify the registration OTP here against registerGeneratedOtp if needed.
      console.log("Registration successful", registerValues);
      alert("Registration successful!");
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (validateLogin()) {
      // Verify OTP for login.
      if (!loginGeneratedOtp) {
        alert("Please send OTP first.");
        return;
      }
      if (loginValues.otp !== loginGeneratedOtp) {
        setLoginErrors((prev) => ({ ...prev, otp: "OTP doesn't match." }));
        alert("OTP doesn't match.");
        return;
      }
      console.log("Login successful", loginValues);
      alert("Login successful!");
    } else {
      alert("Please fix the errors in the form.");
    }
  };

  // ------------------------------------------------------------------
  // OTP Button Handlers
  // ------------------------------------------------------------------
  // Handler for sending OTP in the login form.
  const handleSendLoginOtp = () => {
    const phoneError = validateLoginField("phone", loginValues.phone);
    if (phoneError) {
      setLoginErrors((prev) => ({ ...prev, phone: phoneError }));
      alert("Please enter a valid phone number to send OTP.");
      return;
    }
    // Generate a random 6-digit OTP as a string.
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setLoginGeneratedOtp(generatedOtp);
    // For testing purposes, auto-fill the OTP input field:
    setLoginValues((prev) => ({ ...prev, otp: generatedOtp }));
    console.log("Login OTP sent:", generatedOtp);
    alert(`OTP sent to your phone! (For testing, OTP is: ${generatedOtp})`);
  };
  

  // Handler for sending OTP in the registration form.
  const handleSendRegisterOtp = () => {
    const phoneError = validateRegisterField("phone", registerValues.phone);
    if (phoneError) {
      setRegisterErrors((prev) => ({ ...prev, phone: phoneError }));
      alert("Please enter a valid phone number to send OTP.");
      return;
    }
    // Generate a random 6-digit OTP as a string.
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setRegisterGeneratedOtp(generatedOtp);
    // For testing, auto-fill the OTP input field:
    setRegisterValues((prev) => ({ ...prev, otp: generatedOtp }));
    console.log("Registration OTP sent:", generatedOtp);
    alert(`OTP sent to your phone! (For testing, OTP is: ${generatedOtp})`);
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
            {/* Phone Input */}
            <div className="input_box">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter phone number"
                value={registerValues.phone}
                onChange={handleRegisterChange}
                onBlur={handleRegisterBlur}
                required
              />
              {registerTouched.phone && registerErrors.phone && (
                <span className="error">{registerErrors.phone}</span>
              )}
            </div>
            {/* OTP Input with "Send OTP" Button */}
            <div className="input_box">
              <label htmlFor="otp">OTP</label>
              <div className="phone-number">
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  value={registerValues.otp}
                  onChange={handleRegisterChange}
                  onBlur={handleRegisterBlur}
                  required
                />
                <button type="button" id="otpBtn" onClick={handleSendRegisterOtp}>
                  Send OTP
                </button>
              </div>
              {registerTouched.otp && registerErrors.otp && (
                <span className="error">{registerErrors.otp}</span>
              )}
            </div>
            {/* Register Submit Button */}
            <button
              type="button"
              id="registerBtn"
              onClick={handleRegisterSubmit}
            >
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
              <a
                href="#"
                onClick={() => showForm("login-form")}
                className="show-login"
              >
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
            {/* Phone Input */}
            <div className="input_box">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                placeholder="Enter phone number"
                value={loginValues.phone}
                onChange={handleLoginChange}
                onBlur={handleLoginBlur}
                required
              />
              {loginTouched.phone && loginErrors.phone && (
                <span className="error">{loginErrors.phone}</span>
              )}
            </div>
            {/* OTP Input with "Send OTP" Button */}
            <div className="input_box">
              <label htmlFor="otp">OTP</label>
              <div className="phone-number">
                <input
                  type="text"
                  id="otp"
                  placeholder="Enter OTP"
                  value={loginValues.otp}
                  onChange={handleLoginChange}
                  onBlur={handleLoginBlur}
                  required
                />
                <button type="button" id="otpBtn" onClick={handleSendLoginOtp}>
                  Send OTP
                </button>
              </div>
              {loginTouched.otp && loginErrors.otp && (
                <span className="error">{loginErrors.otp}</span>
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
              <a
                href="#"
                onClick={() => showForm("register-form")}
                className="show-register"
              >
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
