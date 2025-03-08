import React from "react";
import userIcon from "../assets/images/blond-man-with-eyeglasses-icon-isolated.png";
import MyOrderIcon from "../assets/order-svgrepo-com.svg";
import WishlistIcon from "../assets/wishlist-svgrepo-com.svg";
import CartIcon from "../assets/cart-svgrepo-com.svg";
import AddressIcon from "../assets/address-location-map-svgrepo-com.svg";
import MailUsIcon from "../assets/mail-svgrepo-com.svg";
import LogOutIcon from "../assets/logout-svgrepo-com.svg";
import { useState, useEffect } from "react";

import "../style/navbar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Sidebar
  const toggleSidebar = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // Prevent background scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isOpen]);

  return (
    <div className="mobile-view">
      {/* Menu Icon */}
      <div className="menu-icon" onClick={toggleSidebar}>
        <div className="menu-container">
          <div className={`hamburger ${isOpen ? "active" : ""}`}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="profile-info">
          <img src={userIcon} alt="User" />
          <div className="user-data">
            <h3>Omkar Kaurav</h3>
            <p>123-456-7890</p>
            <p>john.doe@example.com</p>
            <button>Edit Profile</button>
          </div>
          <ul>
            <li>
              <img src={MyOrderIcon} alt="" />
              <a href="myorder.html">My Orders</a>
            </li>
            <li>
              <img src={WishlistIcon} alt="" />
              <a href="wishlist.html">Wishlist</a>
            </li>
            <li>
              <img src={CartIcon} alt="" />
              <a href="cart.html">Cart</a>
            </li>
            <li>
              <img src={AddressIcon} alt="" />
              <a href="#">Address</a>
            </li>
            <li>
              <img src={MailUsIcon} alt="" />
              <a href="#">Mail Us</a>
            </li>
            <li class="logout" id="logout-2">
              <a href="#" id="logout-btn-2">
                Log Out
              </a>{" "}
              <img src={LogOutIcon} alt="" />
            </li>
          </ul>
          <div id="loginSignupButtons-2">
            <button id="loginButton">
              <a href="login.html" id="login-signup">
                Login / Sign Up
              </a>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </div>
  );
};

export default Sidebar;
