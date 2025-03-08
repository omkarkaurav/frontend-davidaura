import React from "react";
import "../style/footer.css";

import InstagramIcon from "../assets/instagram-2016-logo-svgrepo-com.svg";
import FacebookIcon from "../assets/icons8-facebook-logo (1).svg";
import TwitterIcon from "../assets/icons8-x (1).svg";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-container">
          <div class="row">
            <div class="footer-col">
              <form action="#" class="subscribe">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Enter your email"
                />
                <button class="submit-btn">→</button>
              </form>
            </div>
            <div class="footer-col">
              <ul class="footer-nav-links">
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
            </div>
            <div class="footer-col">
              <ul class="social-links">
                <li>
                  <a href="#">
                    <img src={FacebookIcon} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={InstagramIcon} alt="" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src={TwitterIcon} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-container">
          <div class="row">
            <div class="footer-col">
              <ul class="footer-nav-links">
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
            </div>
            <div class="footer-col site-logo">
              <a href="index.html">DevidAura</a>
            </div>
            <div class="footer-col">
              <p>© 2024. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
