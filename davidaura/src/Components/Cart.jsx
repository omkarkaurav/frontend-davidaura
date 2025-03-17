// src/Components/ShoppingCart.js

import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../style/cart.css";
import BottleImage from "../assets/images/bottle-perfume-isolated-white-background_977935-10892-removebg-preview (1).png";
import { CouponContext } from "../contexts/CouponContext"; // Global coupon state
import { ProductContext } from "../contexts/productContext"; // Global product state
import { UserContext } from "../contexts/UserContext"; // New User Context


const ShoppingCart = ({ cart, setCart, wishlist, setWishlist }) => {
  const navigate = useNavigate();
  const { coupons , setCoupons } = useContext(CouponContext); // Retrieve global coupons
  const { products } = useContext(ProductContext); // Retrieve global products
  const { user } = useContext(UserContext); // Access user data (e.g., orderCount)


  // -------------------------------
  // State Definitions
  // -------------------------------
  const [selectedItems, setSelectedItems] = useState([]); // Items marked for checkout
  const [couponDiscount, setCouponDiscount] = useState(0); // Discount amount from applied coupon
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Currently selected coupon
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controls coupon dropdown visibility
  const dropdownRef = useRef(null); // For handling outside click on dropdown

  // -------------------------------
  // Checkout Handler
  // -------------------------------
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item before checking out.");
      return;
    }
    // Save selected items and coupon discount in localStorage for the checkout page
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    localStorage.setItem(
      "newdiscountcoupon",
      selectedCoupon ? selectedCoupon.discount.toString() : "0"
    );
    navigate("/checkout");
  };

  // -------------------------------
  // Cart Management Functions
  // -------------------------------

  // Add product to cart; if it exists, increment quantity; else, add a new entry with calculated discounted price (dprice)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            ...product,
            dprice: Math.trunc(
              product.oprice - (product.oprice * product.discount) / 100
            ),
            quantity: 1,
          },
        ];
      }
    });
  };

  // Move an item from the cart to the wishlist
  const moveToWishlist = (index) => {
    setCart((prevCart) => {
      const itemToMove = prevCart[index];
      if (!itemToMove) return prevCart;
      setWishlist((prevWishlist) => {
        if (
          prevWishlist.some(
            (wishlistItem) => wishlistItem.name === itemToMove.name
          )
        ) {
          return prevWishlist;
        }
        return [...prevWishlist, itemToMove];
      });
      return prevCart.filter((_, i) => i !== index);
    });
  };

  // Toggle checkbox selection for an item
  const handleCheckboxChange = (product) => {
    setSelectedItems((prevSelected) => {
      return prevSelected.some((item) => item.name === product.name)
        ? prevSelected.filter((item) => item.name !== product.name)
        : [...prevSelected, product];
    });
    // Reset coupon selection when the selection changes
    setCouponDiscount(0);
    setSelectedCoupon(null);
  };

  // Update quantity for a cart item
  function updateQuantity(index, change) {
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
    setSelectedItems((prevSelected) =>
      prevSelected.map((item) =>
        item.name === cart[index].name
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
    setCouponDiscount(0);
    setSelectedCoupon(null);
  }

  // Remove an item from the cart
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    setSelectedItems((prevSelected) =>
      prevSelected.filter((item) => item.name !== cart[index].name)
    );
  };

  // Clear the entire cart and reset coupon selections
  const clearCart = () => {
    setCart([]);
    setSelectedItems([]);
    setCouponDiscount(0);
    setSelectedCoupon(null);
  };

  // -------------------------------
  // Coupon Handling Function
  // -------------------------------

// Helper function to check coupon applicability
const isCouponApplicable = (coupon) => {
  // If coupon has a condition function, use it
  if (coupon.condition) {
    return coupon.condition(selectedItems, user);
  }
  
  // If coupon has a free-form text condition, parse it
  if (coupon.conditionText) {
    const cond = coupon.conditionText.toLowerCase();
    // Example: nthOrder:10
    if (cond.startsWith("nthorder:")) {
      const nth = parseInt(cond.split(":")[1], 10);
      // Assuming user.orderCount reflects completed orders,
      // then the coupon applies if the upcoming order is the nth order.
      return user && (user.orderCount + 1 === nth);
    }
    // You can add more text-based condition checks here, for example:
    // if (cond.startsWith("mintotal:")) { ... }
    
    // Default if no known condition format is detected:
    return true;
  }
  
  // If no condition is specified, coupon is applicable
  return true;
};
function applyDiscount() {
  if (!selectedCoupon) {
    alert("Please select a coupon from the list.");
    return;
  }
  if (selectedItems.length === 0) {
    alert("Please select at least one item.");
    return;
  }
  // Check the coupon's condition using our function that now accepts the coupon object
  if (selectedCoupon.condition && !selectedCoupon.condition(selectedItems, user, selectedCoupon)) {
    alert("This coupon is not applicable for your order.");
    return;
  }
  const selectedTotal = selectedItems.reduce(
    (acc, item) => acc + item.dprice * (item.quantity || 1),
    0
  );
  if (selectedTotal === 0) {
    alert("Selected items total cannot be zero.");
    return;
  }
  const newCouponDiscount = Math.trunc((selectedCoupon.discount / 100) * selectedTotal);
  setCouponDiscount(newCouponDiscount);
  alert(`Coupon Applied: ${selectedCoupon.code} - ${selectedCoupon.discount}% Off!`);
  
  // If the coupon's condition text includes "once" or "singleuse", mark it as used
  if (
    selectedCoupon.conditionText.toLowerCase().includes("once") ||
    selectedCoupon.conditionText.toLowerCase().includes("singleuse")
  ) {
    // Update the coupon in the context to mark it as used
    setCoupons((prevCoupons) =>
      prevCoupons.map((c) =>
        c.id === selectedCoupon.id ? { ...c, used: true } : c
      )
    );
  }
}

  // -------------------------------
  // Price Calculation Variables
  // -------------------------------
  // Total using original prices
  const selectedTotal = selectedItems.length
    ? selectedItems.reduce((acc, item) => acc + item.oprice * item.quantity, 0)
    : cart.reduce((acc, item) => acc + item.oprice * item.quantity, 0);

  // Total using discounted prices
  const selectedDiscountedTotal = selectedItems.length
    ? selectedItems.reduce((acc, item) => acc + item.dprice * item.quantity, 0)
    : cart.reduce((acc, item) => acc + item.dprice * item.quantity, 0);

  // Final price after subtracting coupon discount
  const finalPrice = Math.max(0, selectedDiscountedTotal - couponDiscount);

  // -------------------------------
  // Dropdown Outside Click Handler
  // -------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cart]);

  // -------------------------------
  // Render Remaining Products Section
  // -------------------------------
  // Use the global products state so any updates/deletions in the admin panel are reflected here
  const renderRemainingProducts = () => {
    return products
      .filter(
        (product) => !cart.some((cartItem) => cartItem.name === product.name)
      )
      .map((product) => {
        const discountedPrice = Math.trunc(
          product.oprice - (product.oprice * product.discount) / 100
        );
        return (
          <div key={product.name} className="remaining-product-item">
            <img src={product.img} alt="Product" />
            <div className="r-product-title">
              <h3>{product.name}</h3>
              <span>{product.size} ml</span>
            </div>
            <div className="product-price">
              <div className="price">
                <span style={{ color: "green", fontWeight: "bold" }}>
                  ₹{discountedPrice}
                </span>
                <span
                  className="old-price"
                  style={{ color: "lightgray", textDecoration: "line-through" }}
                >
                  (₹{product.oprice})
                </span>
              </div>
              <span className="discount" style={{ color: "blue" }}>
                {product.discount}% Off
              </span>
            </div>
            <button className="add-to-cart" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        );
      });
  };

  // -------------------------------
  // Render Component UI
  // -------------------------------
  return (
    <>
      <main className="main-container">
      <h1 className="cart-title">Your Shopping Cart</h1>
        <div className="cart-item-summary-container">
          {/* ---------- Cart Items List ---------- */}
          <div className="cart-items-box">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <input
                  type="checkbox"
                  className="select-item"
                  checked={selectedItems.some(
                    (selected) => selected.name === item.name
                  )}
                  onChange={() => handleCheckboxChange(item)}
                />
                <img src={item.img} alt={item.name} />
                <div className="product-title">
                  <h3>{item.name}</h3>
                  <span>{item.size} ml</span>
                </div>
                <div className="quantity-controls">
                  <button
                    className="decrease"
                    onClick={() => updateQuantity(index, -1)}
                  >
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button
                    className="increase"
                    onClick={() => updateQuantity(index, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-price">
                  <span style={{ color: "green" }}>₹{item.dprice}</span>
                  <span
                    style={{
                      color: "lightgray",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{item.oprice}
                  </span>
                </div>
                <button
                  className="remove"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
                <button
                  className="move-to-wishlist"
                  onClick={() => moveToWishlist(index)}
                >
                  Move to Wishlist
                </button>
              </div>
            ))}
          </div>

          {/* ---------- Cart Summary Section ---------- */}
          <div className="cart-summary">
            <div className="cart-summary-button">
              {/* Coupon Dropdown using global coupons */}
              {/* // Coupon Dropdown inside render */}
              <div id="discount-dropdown-container">
                <div ref={dropdownRef} className="custom-dropdown">
                  <button
                    className="dropdown-btn"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    {selectedCoupon
                      ? `${selectedCoupon.code} - ${selectedCoupon.discount}% Off`
                      : "Select Coupon"}
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-list">
                      {coupons.map((coupon) => {
                        // Pass both selectedItems and user to the condition function
                        const isApplicable = coupon.condition
                          ? coupon.condition(selectedItems, user, coupon)
                          : true;
                        return (
                          <li
                            key={coupon.code}
                            className={`dropdown-item ${
                              !isApplicable ? "disabled-coupon" : ""
                            }`}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              if (!isApplicable) return;
                              setSelectedCoupon(coupon);
                              setDropdownOpen(false);
                            }}
                            title={coupon.description}
                          >
                            {coupon.code} - {coupon.discount}% Off
                            <p className="coupon-description">
                              {coupon.description}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>

              <button id="apply-discount" onClick={applyDiscount}>
                Apply Coupon
              </button>
              <button id="clear-cart" onClick={clearCart}>
                Clear Cart
              </button>
              <button
                id="checkout-button"
                disabled={selectedItems.length === 0}
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
            <div className="cart-summary-price">
              <h3>Total : ₹{selectedTotal}</h3>
              <h3>Discounted Total : ₹{finalPrice}</h3>
            </div>
          </div>
        </div>
      </main>

      {/* ---------- Remaining Products Section ---------- */}
      <div id="remaining-products-container">
        <h3>Explore more</h3>
        <div id="remaining-products">{renderRemainingProducts()}</div>
      </div>
    </>
  );
};

export default ShoppingCart;
