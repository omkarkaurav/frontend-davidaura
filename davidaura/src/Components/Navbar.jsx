import React, { useState, useEffect } from "react";
import UserIcon from "../assets/images/blond-man-with-eyeglasses-icon-isolated.png";
import MyOrderIcon from "../assets/order-svgrepo-com.svg";
import AddressIcon from "../assets/address-location-map-svgrepo-com.svg";
import MailUsIcon from "../assets/mail-svgrepo-com.svg";
import LogOutIcon from "../assets/logout-svgrepo-com.svg";
import CartIcon from "../assets/cart-svgrepo-com.svg";
import WishlistIcon from "../assets/wishlist-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import "../style/navbar.css";


const Navbar = ({ cartCount = 0 , wishlistCount = 0 }) => {
  const navigate = useNavigate();
  const isLoggedIn = false; // Replace with actual auth logic

  const [isOpen, setIsOpen] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);

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

  useEffect(() => {
    let lastScrollTop = 0; // Keep track of the last scroll position

    const handleScroll = () => {
      let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > lastScrollTop) {
        // Scrolling down, hide navbar
        setNavbarVisible(false);
      } else {
        // Scrolling up, show navbar
        setNavbarVisible(true);
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Ensure scroll position doesn't go below 0
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup the event listener on unmount
    };
  }, []);

  return (
    <header>
      <nav
        id="navbar"
        style={{ top: navbarVisible ? "0" : "-80px", transition: "top 0.3s ease-in-out" }}
      >
        <div className="part-1">
          <a className="logo"  onClick={() => navigate("/")}>
            <h1>DEVIDAURA</h1>
          </a>
        </div>
        <div className="part-2">
          <ul className="nav-links">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/")}>Products</li>
            <li onClick={() => navigate("/")}>Shop</li>
          </ul>

          
        </div>
        <div className="part-3">
          <div className="icons">
            <div className="wishlist-icon">
              <a onClick={() => navigate("/wishlist")}>
                <button id="wishlist-icon">
                  <img className="wishlist-img" src={WishlistIcon} alt="wishlist"/>
                  <span id="wishlist-count">{wishlistCount >= 0 ? wishlistCount : 0}</span>
                </button>
              </a>
            </div>
            <div className="cart-icon">
              <a onClick={() => navigate("/cart")}>
                <button id="cart-icon">
                  <img src={CartIcon} alt="Cart" />
                  <span id="cart-count">{cartCount >= 0 ? cartCount : 0}</span>
                </button>
              </a>
            </div>
            {isLoggedIn ? (
              <div className="profile-icon" id="profile-btn" style={{ display: "none" }}>
                <button id="profileButton">
                  <img src="/assets/user-avatar-svgrepo-com.svg" alt="Profile" />
                </button>
              </div>
            ) : (
              <div id="loginSignupButtons">
                <button id="loginButton" onClick={() => navigate("/login")}>
                  Login / SignUp
                </button>
              </div>
            )}

            {/* Profile Content Dropdown  */}
            <div className="profile-container">
              <div className="profile-content hidden" id="profileContent">
                <div className="profile-info">
                  <img
                    src="blond-man-with-eyeglasses-icon-isolated.png"
                    alt="User Image"
                    className="profile-img"
                    id="profile-img"
                  />
                  <div className="user-data">
                    <h3 id="profile-name">John Doe</h3>
                    <p id="profile-email">john.doe@example.com</p>
                  </div>
                </div>
                <ul>
                  <li>
                    <a onClick={() => navigate("/myorder")}>My Orders</a>
                  </li>
                  <li id="logout">
                    <a onClick={() => navigate("/")} id="logout-btn">
                      Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="part-1">
              <div className=" mobile-view">
                <div className="menu-icon" onClick={toggleSidebar}>
                  <div className="menu-container">
                    <div
                      className={`hamburger ${isOpen ? "active" : ""}`}
                      id="hamburger"
                    >
                      <div className="line"></div>
                      <div className="line"></div>
                      <div className="line"></div>
                    </div>
                  </div>
                  <div className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
                    <div className="profile-info">
                      <img
                        src={UserIcon}
                        alt="User Image"
                        className="mob-profile-img"
                        id="mob-profile-img"
                      />
                      <div className="user-data">
                        <h3 id="mob-profile-name">Omkar Kaurav</h3>
                        <p id="mob-profile-email">john.doe@example.com</p>
                      </div>
                      <ul>
                        <li>
                          <img src={MyOrderIcon} alt="" />
                          <a onClick={() => navigate("/myorder")}>My Orders</a>
                        </li>
                        <li>
                          <img src={WishlistIcon} alt="" />
                          <a onClick={() => navigate("/wishlist")}>Wishlist</a>
                        </li>
                        <li>
                          <img src={CartIcon} alt="" />
                          <a onClick={() => navigate("/cart")}>Cart</a>
                        </li>
                        <li>
                          <img src={AddressIcon} alt="" />
                          <a >Address</a>
                        </li>
                        <li>
                          <img src={MailUsIcon} alt="" />
                          <a>Mail Us</a>
                        </li>
                        <li className="logout" id="logout-2">
                          <a onClick={() => navigate("/")} id="logout-btn-2">
                            Log Out
                          </a>{" "}
                          <img src={LogOutIcon} alt="" />
                        </li>
                      </ul>
                      <div id="loginSignupButtons-2">
                        <button id="loginButton">
                          <a id="login-signup" onClick={() => navigate("/login")}>
                            Login / Sign Up
                          </a>
                        </button>
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
