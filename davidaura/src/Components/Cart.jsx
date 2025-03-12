import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../style/cart.css";
import BottleImage from "../assets/images/bottle-perfume-isolated-white-background_977935-10892-removebg-preview (1).png";

const products = [
  {
    name: "Attractive",
    oprice: 1999,
    size: 100,
    discount: 65,
    img: BottleImage,
  },
  {
    name: "Desire",
    oprice: 1999,
    size: 100,
    discount: 65,
    img: BottleImage,
  },
  {
    name: "Heaven",
    oprice: 1999,
    size: 100,
    discount: 65,
    img: BottleImage,
  },
  {
    name: "Wild",
    oprice: 1999,
    size: 100,
    discount: 65,
    img: BottleImage,
  },
];

const coupons = [
  { code: "SAVE10", discount: 10 },
  { code: "SAVE20", discount: 20 },
];

const ShoppingCart = ({ cart, setCart, wishlist, setWishlist }) => {
  const navigate = useNavigate();
  // States for cart items and selections
  const [selectedItems, setSelectedItems] = useState([]);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // When the user clicks the checkout button, store selected items and applied coupon in localStorage and navigate
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select at least one item before checking out.");
      return;
    }
    // Save selected items so Checkout page can use them
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    // Save applied coupon discount if any, else save "0"
    localStorage.setItem(
      "newdiscountcoupon",
      selectedCoupon ? selectedCoupon.discount.toString() : "0"
    );
    navigate("/checkout");
  };

  // --- Cart Functions ---
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

  const moveToWishlist = (index) => {
    setCart((prevCart) => {
      const itemToMove = prevCart[index];
      if (!itemToMove) return prevCart;
      setWishlist((prevWishlist) => {
        if (prevWishlist.some((wishlistItem) => wishlistItem.name === itemToMove.name)) {
          return prevWishlist;
        }
        return [...prevWishlist, itemToMove];
      });
      return prevCart.filter((_, i) => i !== index);
    });
  };

  const handleCheckboxChange = (product) => {
    setSelectedItems((prevSelected) => {
      return prevSelected.some((item) => item.name === product.name)
        ? prevSelected.filter((item) => item.name !== product.name)
        : [...prevSelected, product];
    });
    setCouponDiscount(0);
    setSelectedCoupon(null);
  };

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

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    setSelectedItems((prevSelected) =>
      prevSelected.filter((item) => item.name !== cart[index].name)
    );
  };

  const clearCart = () => {
    setCart([]);
    setSelectedItems([]);
    setCouponDiscount(0);
    setSelectedCoupon(null);
  };

  function applyDiscount() {
    if (!selectedCoupon) {
      alert("Please select a valid discount code.");
      return;
    }
    if (selectedItems.length === 0) {
      alert("Please select at least one item.");
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
    const newCouponDiscount = Math.trunc(
      (selectedCoupon.discount / 100) * selectedTotal
    );
    setCouponDiscount(newCouponDiscount);
    alert(
      `Coupon Applied: ${selectedCoupon.code} - ${selectedCoupon.discount}% Off!`
    );
  }

  const selectedTotal = selectedItems.length
    ? selectedItems.reduce((acc, item) => acc + item.oprice * item.quantity, 0)
    : cart.reduce((acc, item) => acc + item.oprice * item.quantity, 0);

  const selectedDiscountedTotal = selectedItems.length
    ? selectedItems.reduce((acc, item) => acc + item.dprice * item.quantity, 0)
    : cart.reduce((acc, item) => acc + item.dprice * item.quantity, 0);

  const finalPrice = Math.max(0, selectedDiscountedTotal - couponDiscount);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cart]);

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

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
      <h1 className="cart-title">Your Shopping Cart</h1>
      <main className="main-container">
        <div className="cart-item-summary-container">
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
                  <button className="decrease" onClick={() => updateQuantity(index, -1)}>
                    -
                  </button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button className="increase" onClick={() => updateQuantity(index, 1)}>
                    +
                  </button>
                </div>
                <div className="item-price">
                  <span style={{ color: "green" }}>₹{item.dprice}</span>
                  <span style={{ color: "lightgray", textDecoration: "line-through" }}>
                    ₹{item.oprice}
                  </span>
                </div>
                <button className="remove" onClick={() => removeFromCart(index)}>
                  Remove
                </button>
                <button className="move-to-wishlist" onClick={() => moveToWishlist(index)}>
                  Move to Wishlist
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-summary-button">
              <div id="discount-dropdown-container">
                <div ref={dropdownRef} className="custom-dropdown">
                  <button className="dropdown-btn" onClick={() => setDropdownOpen((prev) => !prev)}>
                    {selectedCoupon
                      ? `${selectedCoupon.code} - ${selectedCoupon.discount}% Off`
                      : "Coupon Code"}
                  </button>
                  {dropdownOpen && (
                    <ul className="dropdown-list">
                      {coupons.map((coupon) => (
                        <li
                          key={coupon.code}
                          className="dropdown-item"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setSelectedCoupon(coupon);
                            setDropdownOpen(false);
                          }}
                        >
                          {coupon.code} - {coupon.discount}% Off
                        </li>
                      ))}
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
      <div id="remaining-products-container">
        <h3>Explore more</h3>
        <div id="remaining-products">{renderRemainingProducts()}</div>
      </div>
    </>
  );
};

export default ShoppingCart;
