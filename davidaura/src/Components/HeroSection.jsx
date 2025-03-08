import React from "react";
// import "../style/main.css";
import InstagramIcon from "../assets/instagram-2016-logo-svgrepo-com.svg";
import FacebookIcon from "../assets/icons8-facebook-logo (1).svg";
import TwitterIcon from "../assets/icons8-x (1).svg";
import RIghtArrowIcon from "../assets/right-arrow-svgrepo-com.svg";
import BottleImage from "../assets/images/bottle-perfume-isolated-white-background_977935-10892-removebg-preview (1).png";



const HeroSection = () => {
  return (
    <section class="section-1">
    <div class="hero-container ">
      <div class="title">
        <div class="head-title">
          <h1>DEVID  AURA</h1>
        </div>
        <p>Presence in every step</p>
        
      </div>
      <div class="bottle-image">
        <img class="bottle-img" src={BottleImage} alt=""/>
      </div>
      <div class="hero-bottom">
        <div class="shop-btn">
          <a href="">
            <button>
              Shop Now
              <span>
                <img src={RIghtArrowIcon} alt=""/>
              </span>
            </button>
          </a>
        </div>
        <div class="social-link">
          <a href="#"><img src={InstagramIcon}alt=""/></a>
          <a href="#"><img src={TwitterIcon} alt=""/></a>
          <a href="#"><img src={FacebookIcon} alt=""/></a>
        </div>
      </div>
    </div>

  </section>
  );
};

export default HeroSection;
