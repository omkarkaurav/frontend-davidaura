import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";
import Login from "./Components/Register";
import Products from "./Components/Products";
import MyOrder from "./Components/MyOrder"; 



const App = () => {

  return (
    <Router>
        <>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Products />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/myorder" element={<MyOrder />} />
          </Routes>
          <Footer />
        </>
    </Router>
  );
};

export default App;
