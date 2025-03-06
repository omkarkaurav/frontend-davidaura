import React from "react";

const HeroSection = () => {
  return (
    <section className="section-1">
      <div className="hero-container">
        <div className="title">
          <h1>DEVID AURA</h1>
          <p>Presence in every step</p>
        </div>

        <div className="bottle-image">
          <img src="/assets/bottle-perfume.png" alt="Perfume Bottle" />
        </div>

        <div className="hero-bottom">
          <a href="/shop">
            <button>
              Shop Now
              <span>
                <img src="/assets/right-arrow-svgrepo-com.svg" alt="Arrow" />
              </span>
            </button>
          </a>

          <div className="social-link">
            <a href="#">
              <img src="/assets/instagram.svg" alt="Instagram" />
            </a>
            <a href="#">
              <img src="/assets/x.svg" alt="Twitter" />
            </a>
            <a href="#">
              <img src="/assets/facebook.svg" alt="Facebook" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
