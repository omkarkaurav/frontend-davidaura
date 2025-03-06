import React from "react";
import "../style/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-container">
          <form className="subscribe">
            <input type="email" placeholder="Enter your email" />
            <button className="submit-btn">→</button>
          </form>

          <ul className="footer-nav-links">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Products</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
          </ul>

          <ul className="social-links">
            <li>
              <a href="#">
                <img src="/assets/facebook.svg" alt="Facebook" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/assets/instagram.svg" alt="Instagram" />
              </a>
            </li>
            <li>
              <a href="#">
                <img src="/assets/x.svg" alt="X" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container">
          <ul className="footer-nav-links">
            <li>
              <a href="#">Terms</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Privacy</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
          <p>© 2024. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
