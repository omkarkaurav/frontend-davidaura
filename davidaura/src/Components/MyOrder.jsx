import React, { useState, useEffect } from "react";
import ProductImage from "../assets/images/mockup-empty-perfume-bottle-perfume-brand-design_826454-355-removebg-preview.png"; // Import image
import "../style/myorder.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [showProgress, setShowProgress] = useState({});
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  // Dummy API Call Function (Simulating Backend)
  const fetchOrders = async () => {
    const fetchedOrders = [
      {
        id: 1,
        date: "2025-03-09",
        amount: 1500,
        status: "Processing",
        progressStep: 2,
        items: [{ name: "Wireless Headphones", price: 1500, quantity: 1, image: ProductImage }],
      },
      {
        id: 2,
        date: "2025-03-09",
        amount: 1501,
        status: "Shipped",
        progressStep: 3,
        items: [{ name: "Wireless Charger", price: 1501, quantity: 1, image: ProductImage }],
      },
    ];
    setOrders(fetchedOrders);
  };

  // Dummy Suggested Products API
  const fetchSuggestedProducts = async () => {
    const fetchedSuggestedProducts = [
      { name: "Bluetooth Speaker", price: 1200, image: ProductImage },
      { name: "Smart Watch", price: 2500, image: ProductImage },
      { name: "Wireless Mouse", price: 800, image: ProductImage },
    ];
    setSuggestedProducts(fetchedSuggestedProducts);
  };

  // Fetch Orders & Suggested Products Every 5s
  useEffect(() => {
    fetchOrders();
    fetchSuggestedProducts();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Track Order Progress Toggle
  const trackOrder = (orderId) => {
    setShowProgress((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  // Cancel Order (Only Frontend Simulation)
  const cancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
      alert(`Order #${orderId} has been canceled.`);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    }
  };

  // Render Step Progress (Order Tracking)
  const renderStepProgress = (progressStep) => {
    const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];
    return (
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={index} className="step-wrapper">
            <div className={`step ${progressStep > index ? "completed" : ""} ${progressStep === index + 1 ? "current" : ""}`}>
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{step}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="myorder-container">
      <h1 className="title">My Orders</h1>
      <div className="myorders">
        <div className="orders-section">
          <div id="orders-list">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="order-card">
                  <h3>Order #{order.id}</h3>
                  <p className="order-details"><strong>Date:</strong> {order.date}</p>
                  <p className="order-details"><strong>Total Amount:</strong> ₹{order.amount}</p>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <img src={item.image} alt={item.name} />
                        <span>{item.name} - ₹{item.price} (x{item.quantity})</span>
                      </div>
                    ))}
                  </div>

                  <div className="buttons">
                    <button className="track-btn" onClick={() => trackOrder(order.id)}>Track Order</button>
                    <button className="cancel-btn" onClick={() => cancelOrder(order.id)}>Cancel Order</button>
                  </div>

                  {showProgress[order.id] && <div className="order-progress">{renderStepProgress(order.progressStep)}</div>}

                  <div className="tracking-status" style={{ display: showProgress[order.id] ? "block" : "none" }}>
                    <strong>Status:</strong> {order.status}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>

        {/* "You May Also Like" Section */}
        <div className="suggestions-section">
          <h3 className="subtitle">You May Also Like</h3>
          <div id="suggested-products">
            {suggestedProducts.map((product, index) => (
              <div key={index} className="suggested-product">
                <img src={product.image} alt={product.name} />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
