// src/App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import HeroSection from "./Components/HeroSection";
import Footer from "./Components/Footer";
import Login from "./Components/Register";
import Products from "./Components/Products";
import MyOrder from "./Components/MyOrder";
import Wishlist from "./Components/Wishlist";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import Adminpannel from "./Components/Adminpanel";
import ContactUs from "./Components/ContactUs";
import "./style/adminPanel.css";

// Import providers for managing global state
import { ProductProvider } from "./contexts/productContext";
import { OrderProvider } from "./contexts/OrderContext";
import { CartProvider } from "./contexts/CartContext";
import { ContactProvider } from "./contexts/ContactContext";
import { CouponProvider } from "./contexts/CouponContext"; // New Coupon Provider
import { UserProvider } from "./contexts/UserContext";

const App = () => {
  // Local states for cart and wishlist management
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Debug logging for cart updates
  useEffect(() => {
    console.log("Cart updated in App.js:", cart);
  }, [cart]);

  return (
    // Wrap the entire app with all the necessary providers
    <UserProvider>
      <ProductProvider>
        <OrderProvider>
          <CartProvider>
            <ContactProvider>
              <CouponProvider>
                <Router>
                  <>
                    <Navbar
                      cartCount={cart.length || 0}
                      wishlistCount={wishlist.length || 0}
                    />
                    <Routes>
                      <Route
                        path="/"
                        element={
                          <>
                            <HeroSection />
                            <Products
                              cart={cart}
                              setCart={setCart}
                              wishlist={wishlist}
                              setWishlist={setWishlist}
                            />
                          </>
                        }
                      />
                      <Route path="/login" element={<Login />} />
                      <Route path="/myorder" element={<MyOrder />} />
                      <Route
                        path="/wishlist"
                        element={
                          <Wishlist
                            wishlist={wishlist}
                            setWishlist={setWishlist}
                            cart={cart}
                            setCart={setCart}
                          />
                        }
                      />
                      <Route
                        path="/cart"
                        element={
                          <Cart
                            cart={cart}
                            setCart={setCart}
                            wishlist={wishlist}
                            setWishlist={setWishlist}
                          />
                        }
                      />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/Admin" element={<Adminpannel />} />
                      <Route path="/contact" element={<ContactUs />} />
                    </Routes>
                    <Footer />
                  </>
                </Router>
              </CouponProvider>
            </ContactProvider>
          </CartProvider>
        </OrderProvider>
      </ProductProvider>
    </UserProvider>
  );
};

export default App;
