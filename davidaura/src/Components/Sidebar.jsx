import React from "react";

const Sidebar = () => {
  return (
    <div className="mobile-view">
      <div className="menu-icon">
        <div className="menu-container">
          <div className="hamburger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>

        <div className="sidebar">
          <div className="profile-info">
            <img src="/assets/blond-man-with-eyeglasses-icon.png" alt="User" />
            <div className="user-data">
              <h3>Omkar Kaurav</h3>
              <p>123-456-7890</p>
              <p>john.doe@example.com</p>
              <button>Edit Profile</button>
            </div>
            <ul>
              <li>
                <a href="/myorder">My Orders</a>
              </li>
              <li>
                <a href="/wishlist">Wishlist</a>
              </li>
              <li>
                <a href="/cart">Cart</a>
              </li>
              <li>
                <a href="#">Address</a>
              </li>
              <li>
                <a href="#">Mail Us</a>
              </li>
              <li>
                <a href="#">Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
