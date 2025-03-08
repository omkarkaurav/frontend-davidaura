import React from "react";

const ProfileDropdown = () => {
  const isLoggedIn = false; // Replace with actual auth logic

  return (
    <div className="profile-section">
      {isLoggedIn ? (
        <div class="profile-icon" id="profile-btn" style="display: none;">
          <button id="profileButton">
            <img src="/assets/user-avatar-svgrepo-com.svg" alt="Profile" />
          </button>
        </div>
      ) : (
        <div id="loginSignupButtons">
          <button id="loginButton"><a href="login.html" id="login-signup">Login / Sign Up</a></button>
        </div>
      )}
    </div>

    
  );
};

export default ProfileDropdown;
