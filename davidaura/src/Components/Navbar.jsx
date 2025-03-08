import React from "react";
import UserIcon from "../assets/images/blond-man-with-eyeglasses-icon-isolated.png";
import MyOrderIcon from "../assets/order-svgrepo-com.svg";
import AddressIcon from "../assets/address-location-map-svgrepo-com.svg";
import MailUsIcon from "../assets/mail-svgrepo-com.svg";
import LogOutIcon from "../assets/logout-svgrepo-com.svg";
import CartIcon from "../assets/cart-svgrepo-com.svg";
import WishlistIcon from "../assets/wishlist-svgrepo-com.svg";
import { useState, useEffect } from "react";
// import "../style/navbar.css";


const Navbar = () => {
  const isLoggedIn = false; // Replace with actual auth logic

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
    <header>
    <nav id="navbar">
      <div class="part-1">
       
        <a class="logo" href="index.html"><h1>DEVIDAURA</h1></a>
      </div>
      <div class="part-2">
        <ul class="nav-links">
          <li><a href="index.html">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Shop</a></li>
        </ul>

        
          <div class="search-container">
            <div class="search-box">
              <input type="text" id="search-input" placeholder="Search for perfumes..."/>
              <ul id="search-results" class="results-list"></ul>
            </div>
          </div>

      </div>
      <div class="part-3">
        <div class="icons">
          <div class="wishlist-icon">
            <a href="wishlist.html">
              <button id="wishlist-icon" >
                <img src={WishlistIcon} alt="wishlist"/>
                <span id="wishlist-count">0</span>
              </button>
            </a>
          </div>
          <div class="cart-icon">
            <a href="cart.html">
              <button id="cart-icon" >
                <img src={CartIcon} alt="Cart"/>
                <span id="cart-count">0</span>
              </button>
            </a>
          </div>
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
          
          {/* Profile Content Dropdown  */}
          <div class="profile-container">
            <div class="profile-content hidden" id="profileContent">
              <div class="profile-info">
                  <img src="blond-man-with-eyeglasses-icon-isolated.png" alt="User Image" class="profile-img" id="profile-img"/>
                  <div class="user-data">
                    <h3 id="profile-name">John Doe</h3>
                    <p id="profile-phone">123-456-7890</p>
                    <p id="profile-email">john.doe@example.com</p>
                    <button id="edit-profile">Edit Profile</button>
                  </div>
              </div>
              <ul>
                  <li><a href="myorder.html">My Orders</a></li>
                  <li><a href="wishlist.html">Wishlist</a></li>
                  <li><a href="#">Account Settings</a></li>
                  <li id="logout"><a href="#" id="logout-btn">Log Out</a></li>
              </ul>
            </div>
          </div>
          <div class="part-1">
            <div class=" mobile-view">
              <div class="menu-icon" onClick={toggleSidebar}>
                <div class="menu-container">
                  <div className={`hamburger ${isOpen ? "active" : ""}`} id="hamburger">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                  </div>
                </div>
                <div className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar" >
                  <div class="profile-info">
                    <img src={UserIcon} alt="User Image" class="mob-profile-img" id="mob-profile-img"/>
                    <div class="user-data">
                      <h3 id="mob-profile-name">Omkar Kaurav</h3>
                      <p id="mob-profile-phone">123-456-7890</p>
                      <p id="mob-profile-email">john.doe@example.com</p>
                      <button id="mob-edit-profile">Edit Profile</button>
                    </div>
                    <ul>
                      <li><img src= {MyOrderIcon} alt=""/><a href="myorder.html">My Orders</a></li>
                      <li><img src={WishlistIcon} alt=""/><a href="wishlist.html">Wishlist</a></li>
                      <li><img src={CartIcon} alt=""/><a href="cart.html">Cart</a></li>
                      <li><img src={AddressIcon} alt=""/><a href="#">Address</a></li>
                      <li><img src={MailUsIcon} alt=""/><a href="#">Mail Us</a></li>
                      <li class="logout" id="logout-2"><a href="#" id="logout-btn-2">Log Out</a> <img src={LogOutIcon} alt=""/></li>
                  </ul>
                  <div id="loginSignupButtons-2">
                    <button id="loginButton"><a href="login.html" id="login-signup">Login / Sign Up</a></button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>    
      </div>
    </nav>
  </header>
  );
};

export default Navbar;
