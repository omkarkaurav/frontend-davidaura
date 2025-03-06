import React from "react";
import ProfileDropdown from "./ProfileDropdown";
import Sidebar from "./Sidebar";
import "../style/navbar.css";

const Navbar = () => {
  return (
    <nav id="navbar">
      <div className="part-1">
        <a className="logo" href="/">
          <h1>DEVIDAURA</h1>
        </a>
      </div>

      <div className="part-2">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/shop">Shop</a>
          </li>
        </ul>

        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              id="search-input"
              placeholder="Search for perfumes..."
            />
            <ul id="search-results" className="results-list"></ul>
          </div>
        </div>
      </div>

      <div className="part-3">
        <div className="icons">
          {/* Wishlist */}
          <div className="wishlist-icon">
            <a href="/wishlist">
              <button>
                <img src="/assets/wishlist-svgrepo-com.svg" alt="Wishlist" />
                <span id="wishlist-count">0</span>
              </button>
            </a>
          </div>

          {/* Cart */}
          <div className="cart-icon">
            <a href="/cart">
              <button>
                <img src="/assets/cart-svgrepo-com.svg" alt="Cart" />
                <span id="cart-count">0</span>
              </button>
            </a>
          </div>

          {/* Profile Dropdown */}
          <ProfileDropdown />
          <Sidebar />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
