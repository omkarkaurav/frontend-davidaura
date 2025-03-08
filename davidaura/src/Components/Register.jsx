// import { useState } from "react";
import "../style/login.css";
import React, { useState } from "react";

import GoogleIcon from "../assets/images/google.png";


const LoginRegisterForm = () => {
  const [form, setForm] = useState("register-form");

  const showForm = (formId) => {
    setForm(formId);
  };

  return (
    <div className="login-register-container">
      {form === "register-form" && (
        <div className="register_form" id="register-form">
          <form action="#">
            <h3>Register</h3>
            <div className="input_box">
              <label htmlFor="reg_name">Enter Full Name</label>
              <input type="text" id="reg_name" placeholder="Enter full name" required />
            </div>
            <div className="input_box">
              <label htmlFor="reg_email">Email</label>
              <input type="email" id="reg_email" placeholder="Enter email address" required />
            </div>
            <div className="input_box">
              <label htmlFor="reg_phone">Phone</label>
              <div className="phone-number">
                <input type="text" id="reg_phone" placeholder="Enter phone number" required />
                <button type="button" id="otpBtn">Send OTP</button>
              </div>
            </div>
            <div className="input_box">
              <label htmlFor="otp">OTP</label>
              <input type="text" id="otp" placeholder="Enter OTP" required />
            </div>
            <div className="register-password">
              <div className="input_box">
                <label htmlFor="reg_password">Password</label>
                <input type="password" id="reg_password" placeholder="Enter your password" required />
              </div>
              <div className="input_box">
                <label htmlFor="reg_confirm_password">Confirm Password</label>
                <input type="password" id="reg_confirm_password" placeholder="Confirm your password" required />
                <span className="error"></span>
              </div>
            </div>
            <button type="button" id="registerBtn">Register</button>
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
            <p className="sign_up">
              Already have an account? <a href="#" onClick={() => showForm("login-form")} className="show-login">Log in</a>
            </p>
          </form>
        </div>
      )}

      {form === "login-form" && (
        <div className="login_form" id="login-form">
          <form action="#">
            <h3>Log in</h3>
            <div className="input_box">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter email address" required />
            </div>
            <div className="input_box">
              <div className="password_title">
                <label htmlFor="password">Password</label>
                <a href="#">Forgot Password?</a>
              </div>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" id="loginBtn">Log In</button>
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
            <p className="sign_up">
              Don't have an account? <a href="#" onClick={() => showForm("register-form")} className="show-register">Sign up</a>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginRegisterForm;
