// src/pages/Checkout.js
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../style/checkout.css";
import "../style/cart.css";
import { OrderContext } from "../contexts/OrderContext";

// -------------------------------------------------------------------
// Helper Function: formatAddress
// Formats an address object into a display string.
// -------------------------------------------------------------------
const formatAddress = (address) => {
  if (!address) return "";
  return `${address.name} - ${address.address}, ${address.city}, ${address.state}, ${address.country} (${address.pincode})${
    address.phone ? " - Phone: " + address.phone : ""
  }`;
};

// -------------------------------------------------------------------
// Component: AddressSelection
// Renders a list of saved addresses and a form to add or edit an address.
// -------------------------------------------------------------------
function AddressSelection({
  addresses,
  selectedAddress,
  setSelectedAddress,
  newAddress,
  setNewAddress,
  handleSaveAddress,
  handlePincodeBlur,
  handleEditAddress,
  handleDeleteAddress,
  addressFieldsOrder,
  editingIndex,
}) {
  return (
    <div className="address-selection">
      <h2>Select or Add Delivery Address</h2>
      <div className="address-list">
        {addresses.map((addr, index) => (
          <div
            key={index}
            className={`address-item ${
              selectedAddress && selectedAddress.pincode === addr.pincode ? "active" : ""
            }`}
          >
            <span
              onClick={() => {
                setSelectedAddress(addr);
                setNewAddress({
                  name: "",
                  phone: "",
                  address: "",
                  city: "",
                  pincode: "",
                  state: "",
                  country: "",
                });
              }}
            >
              {formatAddress(addr)}
            </span>
            <div className="address-actions">
              <button onClick={() => handleEditAddress(index)} className="btn btn-link edit-button">
                Edit
              </button>
              <button onClick={() => handleDeleteAddress(index)} className="btn btn-link delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <h3>{editingIndex !== null ? "Edit Address" : "Add New Address"}</h3>
      <div className="new-address-form">
        {addressFieldsOrder.map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={newAddress[field]}
            onFocus={() => setSelectedAddress(null)}
            onChange={(e) => setNewAddress({ ...newAddress, [field]: e.target.value })}
            onBlur={field === "pincode" ? handlePincodeBlur : null}
            className="form-control"
          />
        ))}
        <div className="address-form-actions">
          {editingIndex !== null ? (
            <button onClick={handleSaveAddress} className="btn btn-outline-primary">
              Update Address
            </button>
          ) : (
            <button onClick={handleSaveAddress} className="btn btn-outline-primary">
              Save Address
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Component: OrderSummary
// Displays the selected delivery address, products, and pricing breakdown.
// -------------------------------------------------------------------
function OrderSummary({ selectedAddress, selectedItems, couponDiscount, deliveryCharge }) {
  const originalTotal = selectedItems.reduce((acc, item) => acc + item.oprice * (item.quantity || 1), 0);
  const productTotal = selectedItems.reduce((acc, item) => acc + item.dprice * (item.quantity || 1), 0);
  const discountCalculated = originalTotal - productTotal;
  const finalPrice = productTotal - couponDiscount + deliveryCharge;

  return (
    <div className="order-summary">
      <div className="summary-address">
        <strong>Delivery Address:</strong>
        {selectedAddress ? (
          <div className="order-summary-address-item">
            <span>{formatAddress(selectedAddress)}</span>
          </div>
        ) : (
          "Please select an address"
        )}
      </div>
      <div className="selected-products">
        {selectedItems.length > 0 ? (
          selectedItems.map((item, index) => (
            <div key={index} className="selected-product">
              <img src={item.img} alt={item.name} />
              <div className="product-title-quantity">
                <h3>{item.name}</h3>
                <span>{item.size} ml</span>
              </div>
              <div className="item-price-quantity">
                <span style={{ color: "green" }}>₹{item.dprice}</span>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No products selected.</p>
        )}
      </div>
      <div className="price-breakdown">
        <p>
          <span>Products ({selectedItems.reduce((acc, item) => acc + (item.quantity || 1), 0)} items):</span>
          <span>₹{productTotal}</span>
        </p>
        <p>
          <span>Discount:</span>
          <span>₹{discountCalculated}</span>
        </p>
        <p>
          <span>Coupon Discount:</span>
          <span>₹{couponDiscount}</span>
        </p>
        <p>
          <span>Delivery Charge:</span>
          <span>₹{deliveryCharge}</span>
        </p>
        <div className="total-price">
          <p>
            <span>Total:</span>
            <span>₹{finalPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Component: PaymentDetails
// Handles payment method selection and displays relevant input fields.
// For "Cash on Delivery", payment is auto-verified without a Pay Now button.
// -------------------------------------------------------------------
function PaymentDetails({
  paymentMethod,
  setPaymentMethod,
  upiId,
  setUpiId,
  verifiedUpi,
  verifyUpi,
  selectedUpiApp,
  setSelectedUpiApp,
  onPaymentVerified,
  paymentVerified,
}) {
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [expiry, setExpiry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiError, setUpiError] = useState("");

  // Automatically mark payment as verified when Cash on Delivery is selected.
  useEffect(() => {
    if (paymentMethod === "Cash on Delivery") {
      onPaymentVerified(true);
    }
  }, [paymentMethod, onPaymentVerified]);

  // Format expiry date as MM/YY
  const handleExpiryChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");
    let formatted = "";
    if (digits.length === 0) {
      formatted = "";
    } else if (digits.length <= 2) {
      formatted = digits;
    } else {
      formatted = digits.slice(0, 2) + "/" + digits.slice(2, 4);
    }
    setExpiry(formatted);
  };

  // Format card number into groups of 4 digits
  const handleCardNumberChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "");
    if (digits.length > 16) {
      digits = digits.slice(0, 16);
    }
    const formatted = digits.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(formatted);
  };

  // Limit CVV input to 3 digits
  const handleCvvChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "");
    if (digits.length > 3) {
      digits = digits.slice(0, 3);
    }
    setCvv(digits);
  };

  // Validate UPI ID format
  const handleUpiVerification = () => {
    const regex = /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/;
    if (regex.test(upiId)) {
      setUpiError("");
    } else {
      setUpiError("Invalid UPI ID format. Example: example@bank");
    }
  };

  // Simulate payment verification for UPI and Debit Card methods.
  const handlePayNow = () => {
    onPaymentVerified(true);
  };

  return (
    <div className="payment-details">
      <div className="payment-summary">
        <div className="summary-header" onClick={() => setSummaryExpanded(!summaryExpanded)}>
          <span>Payment Section</span>
          <span className="toggle-icon">{summaryExpanded ? "▲" : "▼"}</span>
        </div>
        {summaryExpanded && (
          <div className="summary-details">
            <p>Please review your payment details below.</p>
          </div>
        )}
      </div>
      <h2>Payment Options</h2>
      <div className="payment-method-selection">
        {["UPI", "Debit Card", "Cash on Delivery"].map((method) => (
          <label key={method} className="payment-option">
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            {method}
          </label>
        ))}
      </div>
      <div className="payment-method-content">
        {paymentMethod === "UPI" && (
          <div className="upi-payment-content">
            <h3>Select UPI Option</h3>
            <div className="upi-option-group">
              {["PhonePe", "Paytm", "Google Pay", "Other"].map((option) => (
                <label key={option} className="upi-option">
                  <input
                    type="radio"
                    name="upiOption"
                    value={option}
                    checked={selectedUpiApp === option}
                    onChange={(e) => setSelectedUpiApp(e.target.value)}
                  />
                  {option === "Other" ? "Enter UPI ID" : option}
                </label>
              ))}
            </div>
            {selectedUpiApp === "Other" && (
              <div className="upi-id-input">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g., example@bank)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="form-control"
                />
                <button onClick={handleUpiVerification} className="btn btn-outline-primary">
                  Verify
                </button>
                {upiError && <p className="text-danger">{upiError}</p>}
              </div>
            )}
            {!paymentVerified ? (
              <button onClick={handlePayNow} className="btn btn-success pay-now-btn">
                Pay Now
              </button>
            ) : (
              <p>Payment Verified</p>
            )}
          </div>
        )}
        {paymentMethod === "Debit Card" && (
          <div className="debit-card-payment-content">
            <h3>Enter Card Details</h3>
            <input
              type="text"
              placeholder="Card Number"
              className="form-control"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            <div className="card-details-row">
              <input
                type="text"
                placeholder="Expiry Date (MM/YY)"
                className="form-control"
                value={expiry}
                onChange={handleExpiryChange}
              />
              <input
                type="text"
                placeholder="CVV"
                className="form-control"
                value={cvv}
                onChange={handleCvvChange}
              />
            </div>
            {!paymentVerified ? (
              <button onClick={handlePayNow} className="btn btn-success pay-now-btn">
                Pay Now
              </button>
            ) : (
              <p>Payment Verified</p>
            )}
          </div>
        )}
        {paymentMethod === "Cash on Delivery" && (
          <div className="cod-payment-content">
            <p>
              You have selected Cash on Delivery. No online payment is required.
              Please prepare the exact amount for the delivery agent.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Component: Confirmation
// Displays order confirmation and navigation options after order placement.
// -------------------------------------------------------------------
function Confirmation({ resetCheckout }) {
  const navigate = useNavigate();
  return (
    <div className="confirmation">
      <h2>Order Confirmed!</h2>
      <p>Thank you for your purchase. Your order is being processed.</p>
      <button onClick={() => navigate("/admin")} className="btn btn-secondary">
        Back to Home
      </button>
      <button onClick={() => navigate("/myorder")} className="btn btn-primary">
        View My Orders
      </button>
    </div>
  );
}

// -------------------------------------------------------------------
// Main Component: Checkout
// Orchestrates the checkout process: address selection, order summary,
// payment, and confirmation.
// -------------------------------------------------------------------
export default function Checkout() {
  const navigate = useNavigate();
  const { orders, setOrders } = useContext(OrderContext);

  // Step 1: Address, 2: Order Summary, 3: Payment, 4: Confirmation
  const [step, setStep] = useState(1);

  // Address-related state
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    { name: "Home", phone: "1234567890", address: "123 Street", city: "City", pincode: "123456", state: "State", country: "Country" },
    { name: "Office", phone: "9876543210", address: "456 Avenue", city: "City", pincode: "654321", state: "State", country: "Country" },
  ]);
  const [newAddress, setNewAddress] = useState({ name: "", phone: "", address: "", city: "", pincode: "", state: "", country: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const addressFieldsOrder = ["name", "phone", "address", "pincode", "city", "state", "country"];

  // Retrieve selected items from localStorage
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    const items = localStorage.getItem("selectedItems");
    if (items) {
      setSelectedItems(JSON.parse(items));
    }
  }, []);

  // Retrieve coupon discount from localStorage (if applied)
  const [couponDiscount, setCouponDiscount] = useState(0);
  useEffect(() => {
    const storedCoupon = localStorage.getItem("newdiscountcoupon");
    if (storedCoupon) {
      setCouponDiscount(parseInt(storedCoupon, 10));
    }
  }, []);

  // Price Calculations
  const deliveryCharge = 50;
  const originalTotal = selectedItems.reduce((acc, item) => acc + item.oprice * (item.quantity || 1), 0);
  const productTotal = selectedItems.reduce((acc, item) => acc + item.dprice * (item.quantity || 1), 0);
  const discountCalculated = originalTotal - productTotal;
  const couponDiscounted = couponDiscount ? Math.trunc((couponDiscount / 100) * productTotal) : 0;
  const totalPrice = productTotal - couponDiscounted + deliveryCharge;

  // Payment-related state
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("");
  const [verifiedUpi, setVerifiedUpi] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState("PhonePe");
  const [paymentVerified, setPaymentVerified] = useState(false);

  // Handler: Validate pincode and auto-fill address fields (simulate fetch)
  const handlePincodeBlur = () => {
    const { pincode } = newAddress;
    if (pincode.length !== 6) {
      alert("Pincode must be 6 digits.");
      return;
    }
    const fetchedData = { city: "Sample City", state: "Sample State", country: "Sample Country" };
    setNewAddress((prev) => ({
      ...prev,
      city: fetchedData.city,
      state: fetchedData.state,
      country: fetchedData.country,
    }));
  };

  // Handler: Save or update address
  const handleSaveAddress = () => {
    if (editingIndex === null && addresses.length >= 4) {
      alert("You can only save up to 4 addresses.");
      return;
    }
    if (editingIndex !== null) {
      const updatedAddresses = [...addresses];
      updatedAddresses[editingIndex] = newAddress;
      setAddresses(updatedAddresses);
      setSelectedAddress(newAddress);
      setEditingIndex(null);
    } else {
      setAddresses([...addresses, newAddress]);
      setSelectedAddress(newAddress);
    }
    setNewAddress({ name: "", phone: "", address: "", city: "", pincode: "", state: "", country: "" });
  };

  // Handler: Edit an existing address
  const handleEditAddress = (index) => {
    setNewAddress(addresses[index]);
    setEditingIndex(index);
  };

  // Handler: Delete address and clear selection if needed
  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    if (selectedAddress && addresses[index].pincode === selectedAddress.pincode) {
      setSelectedAddress(null);
    }
  };

  // Handler: Place Order - create order and move to confirmation
  const handlePlaceOrder = () => {
    if (selectedItems.length === 0) {
      alert("No items selected for the order.");
      return;
    }
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: totalPrice,
      status: "Order Placed",
      progressStep: 1,
      items: selectedItems,
    };

    setOrders((prevOrders) => [...prevOrders, newOrder]);
    localStorage.removeItem("selectedItems");
    setStep(4);
  };

  // Navigation handlers for checkout steps
  const handleNext = () => {
    if (step === 1 && !selectedAddress) {
      if (newAddress.name && newAddress.address && newAddress.pincode) {
        setSelectedAddress(newAddress);
        setNewAddress({ name: "", phone: "", address: "", city: "", pincode: "", state: "", country: "" });
      } else {
        alert("Please select or enter a valid address.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    if (step === 1) {
      navigate("/cart");
    } else {
      setStep((prev) => Math.max(prev - 1, 1));
    }
  };

  const resetCheckout = () => setStep(1);

  // -------------------------------------------------------------------
  // Render Main Checkout UI
  // -------------------------------------------------------------------
  return (
    <div className="checkout-wrapper">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <div className="progress-indicator">
          {["Address", "Order Summary", "Payment", "Confirmation"].map((label, idx) => (
            <div key={idx} className={`progress-step ${step >= idx + 1 ? "active" : ""}`}>
              <span>{idx + 1}</span>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="checkout-body">
        {step === 1 && (
          <AddressSelection
            addresses={addresses}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            newAddress={newAddress}
            setNewAddress={setNewAddress}
            handleSaveAddress={handleSaveAddress}
            handlePincodeBlur={handlePincodeBlur}
            handleEditAddress={handleEditAddress}
            handleDeleteAddress={handleDeleteAddress}
            addressFieldsOrder={addressFieldsOrder}
            editingIndex={editingIndex}
          />
        )}
        {step === 2 && (
          <OrderSummary
            selectedAddress={selectedAddress}
            selectedItems={selectedItems}
            couponDiscount={couponDiscounted}
            deliveryCharge={deliveryCharge}
          />
        )}
        {step === 3 && (
          <PaymentDetails
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            upiId={upiId}
            setUpiId={setUpiId}
            verifiedUpi={verifiedUpi}
            verifyUpi={() => {}}
            selectedUpiApp={selectedUpiApp}
            setSelectedUpiApp={setSelectedUpiApp}
            onPaymentVerified={setPaymentVerified}
            paymentVerified={paymentVerified}
          />
        )}
        {step === 4 && <Confirmation resetCheckout={resetCheckout} />}
      </div>
      <div className="checkout-footer">
        {step !== 4 && (
          <>
            <button onClick={handlePrev} className="btn btn-outline-secondary">
              Back
            </button>
            {step === 3 ? (
              <button onClick={handlePlaceOrder} className="btn btn-primary" disabled={!paymentVerified}>
                Place Order
              </button>
            ) : (
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
