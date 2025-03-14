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
            <div class="footer-col site-logo">
              <a href="index.html">
                DevidAura
              </a>
            </div>
            <div class="footer-col">
              <ul class="footer-nav-links">
                <li onClick={() => document.getElementById('home-section').scrollIntoView({ behavior: 'smooth' })}>
                  Home
                </li>
                <li onClick={() => document.getElementById('products-section').scrollIntoView({ behavior: 'smooth' })}>
                  Products
                </li>
                <li onClick={() => document.getElementById('shop-section').scrollIntoView({ behavior: 'smooth' })}>
                  Shop
                </li>
                <li>
                  <a onClick={() =>navigate("/contact")}>
                  Contact Us
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

            <div class="footer-col">
              <p>© 2025. All Rights Reserved.</p>
            </div>
          </div>
          <div className="credits">
              <div className="developer">
                <p className="frontend">
                  <strong>Frontend:</strong> Omkar Kaurav
                </p>
                <p className="frontend">
                  <strong>Backend:</strong> Dev Bandil
                </p>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
