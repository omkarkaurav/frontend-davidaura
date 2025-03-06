import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import "../src/style/style.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default App;
