import React from "react";

const ProfileDropdown = () => {
  const isLoggedIn = false; // Replace with actual auth logic

  return (
    <div className="profile-section">
      {isLoggedIn ? (
        <div className="profile-icon">
          <button>
            <img src="/assets/user-avatar-svgrepo-com.svg" alt="Profile" />
          </button>
        </div>
      ) : (
        <div id="loginSignupButtons">
          <a href="/login" className="login-signup">
            Login / Sign Up
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
