// src/pages/MyOrders.js
import React, { useContext, useEffect } from "react";
import ProductImage from "../assets/images/mockup-empty-perfume-bottle-perfume-brand-design_826454-355-removebg-preview.png";
import "../style/myorder.css";
import { OrderContext } from "../contexts/OrderContext";

const MyOrders = () => {
  // Consume orders from OrderContext
  const { orders } = useContext(OrderContext);

  // Debug log orders for troubleshooting
  useEffect(() => {
    console.log("Orders in MyOrders:", orders);
  }, [orders]);

  // Render order progress steps (dummy implementation)
  const renderStepProgress = (progressStep) => {
    const steps = ["Order Placed", "Processing", "Shipped", "Delivered"];
    return (
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={index} className="step-wrapper">
            <div
              className={`step ${
                progressStep > index ? "completed" : ""
              } ${
                progressStep === index + 1 ? "current" : ""
              }`}
            >
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{step}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Dummy functions for order actions
  const trackOrder = (orderId) => {
    console.log("Track order", orderId);
  };

  const cancelOrder = (orderId) => {
    if (window.confirm(`Are you sure you want to cancel Order #${orderId}?`)) {
      // In a real scenario, you might update the order status here.
      console.log("Cancel order", orderId);
    }
  };

  const reorder = (orderId) => {
    console.log("Reorder", orderId);
    // Add your reorder logic (e.g., load order items into cart and navigate to cart)
  };

  return (
    <div className="myorder-container">
      <h1 className="title">My Orders</h1>
      <div className="myorders">
        <div className="orders-section">
          <div id="orders-list">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="order-card">
                  <h3>Order #{order.id}</h3>
                  <p className="order-details">
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p className="order-details">
                    <strong>Total Amount:</strong> ₹{order.amount}
                  </p>
                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="order-item">
                        <img src={item.img || ProductImage} alt={item.name} />
                        <span>
                          {item.name} - ₹{item.dprice} (x{item.quantity})
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="buttons">
                    <button
                      className="track-btn"
                      onClick={() => trackOrder(order.id)}
                    >
                      Track Order
                    </button>
                    {order.status === "Delivered" ? (
                      <button
                        className="reorder-btn"
                        onClick={() => reorder(order.id)}
                      >
                        Reorder
                      </button>
                    ) : (
                      <button
                        className="cancel-btn"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                  {order.progressStep && (
                    <div className="order-progress">
                      {renderStepProgress(order.progressStep)}
                    </div>
                  )}
                  {order.status && (
                    <div className="tracking-status">
                      <strong>Status:</strong> {order.status}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
