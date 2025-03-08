import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";


import "../src/style/style.css";
import "../src/style/navbar.css";

const App = () => {
  
  return (
    <div className="App">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default App;
