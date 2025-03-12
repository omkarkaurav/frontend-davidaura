// src/Components/Adminpanel.js
import React, { useState, useContext } from "react";
import ProductImage from "../assets/images/mockup-empty-perfume-bottle-perfume-brand-design_826454-355-removebg-preview.png";
import "../style/adminPanel.css";
import { OrderContext } from "../contexts/OrderContext";
import { ProductContext } from "../contexts/productContext";
import { ContactContext } from "../contexts/ContactContext"; // Import ContactContext
import { CartContext } from "../contexts/CartContext"; // Import ContactContext

// Dummy data for coupons (if not using global state for coupons)
const dummyCoupons = [
  { id: 1, code: "DISCOUNT10", discount: 10 },
  { id: 2, code: "SAVE20", discount: 20 },
];

// Dummy users data for demonstration (if needed)
const dummyUsers = [
  { id: 1, name: "John Doe", phone: "1234567890" },
  { id: 2, name: "Jane Smith", phone: "9876543210" },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("products");

  // Use global product state from ProductContext
  const { products, setProducts } = useContext(ProductContext);
  const [coupons, setCoupons] = useState(dummyCoupons);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Get orders from OrderContext
  const { orders, setOrders } = useContext(OrderContext);

  // Get queries from ContactContext
  const { queries } = useContext(ContactContext);

  // New state for orders filtering and search (Orders tab)
  const [orderStatusTab, setOrderStatusTab] = useState("All");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");

  // New state for user search (Users tab)
  const [userSearchQuery, setUserSearchQuery] = useState("");

  // New state for query search (Queries tab)
  const [querySearch, setQuerySearch] = useState("");

  // Generate new IDs for products or coupons
  const generateNewId = (list) =>
    list.length > 0 ? Math.max(...list.map((item) => item.id)) + 1 : 1;

  // --- Product Functions ---
  const handleProductUpdate = (updatedProduct) => {
    setProducts((prevProducts) => {
      const exists = prevProducts.find((p) => p.id === updatedProduct.id);
      return exists
        ? prevProducts.map((p) =>
            p.id === updatedProduct.id ? updatedProduct : p
          )
        : [...prevProducts, updatedProduct];
    });
    setEditingProduct(null);
  };

  const handleProductDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
    }
  };

  // --- Coupon Functions ---
  const handleCouponUpdate = (updatedCoupon) => {
    setCoupons((prevCoupons) => {
      const exists = prevCoupons.find((c) => c.id === updatedCoupon.id);
      return exists
        ? prevCoupons.map((c) =>
            c.id === updatedCoupon.id ? updatedCoupon : c
          )
        : [...prevCoupons, updatedCoupon];
    });
    setEditingCoupon(null);
  };

  const handleCouponDelete = (couponId) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      setCoupons((prevCoupons) =>
        prevCoupons.filter((c) => c.id !== couponId)
      );
    }
  };

  // --- Order Functions ---
  const handleOrderStatusUpdate = (orderId, newStatus, newProgressStep) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus, progressStep: newProgressStep }
        : order
    );
    setOrders(updatedOrders);
  };

  // --- Users Section (Optional) ---
  // Enrich dummy users with their orders (if orders have a userId property)
  const users = dummyUsers.map((user) => ({
    ...user,
    orders: orders.filter((order) => order.userId === user.id),
  }));

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.phone.includes(userSearchQuery)
  );

  // --- Orders Tab Filtering ---
  const statusFilteredOrders =
    orderStatusTab === "All"
      ? orders
      : orders.filter((order) => order.status === orderStatusTab);
  const searchedOrders = statusFilteredOrders.filter(
    (order) =>
      order.id.toString().includes(orderSearchQuery) ||
      order.date.includes(orderSearchQuery)
  );

  // --- Queries Tab Filtering ---
  const filteredQueries = queries.filter(
    (q) =>
      q.email.toLowerCase().includes(querySearch.toLowerCase()) ||
      q.phone.includes(querySearch)
  );

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <nav className="admin-nav">
        <button onClick={() => setActiveTab("products")}>Products</button>
        <button onClick={() => setActiveTab("coupons")}>Coupon Codes</button>
        <button onClick={() => setActiveTab("orders")}>Orders</button>
        <button onClick={() => setActiveTab("users")}>Users</button>
        <button onClick={() => setActiveTab("queries")}>Queries</button>
      </nav>

      <div className="admin-content">
        {/* Products Tab */}
        {activeTab === "products" && (
          <div className="products-tab">
            <h2>Manage Products</h2>
            <button
              className="admin-btn add-btn"
              onClick={() => {
                const newProduct = {
                  id: generateNewId(products),
                  name: "",
                  oprice: 0,
                  discount: 0,
                  size: 0,
                  img: ProductImage,
                };
                setEditingProduct(newProduct);
              }}
            >
              Add New Product
            </button>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Original Price</th>
                  <th>Discount (%)</th>
                  <th>Size (ml)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) =>
                  editingProduct && editingProduct.id === product.id ? (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img
                          src={editingProduct.img}
                          alt={editingProduct.name}
                          width="50"
                          height="50"
                        />
                        <br />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setEditingProduct({
                                ...editingProduct,
                                img: imageUrl,
                              });
                            }
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              name: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editingProduct.oprice}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              oprice: parseFloat(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editingProduct.discount}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              discount: parseFloat(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editingProduct.size}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              size: parseFloat(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="admin-btn"
                          onClick={() => handleProductUpdate(editingProduct)}
                        >
                          Save
                        </button>
                        <button
                          className="admin-btn"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>
                        <img
                          src={product.img}
                          alt={product.name}
                          width="50"
                          height="50"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>₹{product.oprice}</td>
                      <td>{product.discount}</td>
                      <td>{product.size}</td>
                      <td>
                        <button
                          className="admin-btn"
                          onClick={() => setEditingProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-btn delete-btn"
                          onClick={() => handleProductDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
                {editingProduct &&
                  !products.find((p) => p.id === editingProduct.id) && (
                    <tr key={editingProduct.id}>
                      <td>{editingProduct.id}</td>
                      <td>
                        <img
                          src={editingProduct.img}
                          alt={editingProduct.name}
                          width="50"
                          height="50"
                        />
                        <br />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const imageUrl = URL.createObjectURL(file);
                              setEditingProduct({
                                ...editingProduct,
                                img: imageUrl,
                              });
                            }
                          }}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              name: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editingProduct.oprice}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              oprice: parseFloat(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editingProduct.discount}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              discount: parseFloat(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editingProduct.size}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              size: parseFloat(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="admin-btn"
                          onClick={() => handleProductUpdate(editingProduct)}
                        >
                          Save
                        </button>
                        <button
                          className="admin-btn"
                          onClick={() => setEditingProduct(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        )}

        {/* Coupons Tab */}
        {activeTab === "coupons" && (
          <div className="coupons-tab">
            <h2>Manage Coupon Codes</h2>
            <button
              className="admin-btn add-btn"
              onClick={() => {
                const newCoupon = { id: generateNewId(coupons), code: "", discount: 0 };
                setEditingCoupon(newCoupon);
              }}
            >
              Add New Coupon
            </button>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Coupon Code</th>
                  <th>Discount (%)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) =>
                  editingCoupon && editingCoupon.id === coupon.id ? (
                    <tr key={coupon.id}>
                      <td>{coupon.id}</td>
                      <td>
                        <input
                          type="text"
                          value={editingCoupon.code}
                          onChange={(e) =>
                            setEditingCoupon({ ...editingCoupon, code: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editingCoupon.discount}
                          onChange={(e) =>
                            setEditingCoupon({
                              ...editingCoupon,
                              discount: parseFloat(e.target.value),
                            })
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="admin-btn"
                          onClick={() => handleCouponUpdate(editingCoupon)}
                        >
                          Save
                        </button>
                        <button
                          className="admin-btn"
                          onClick={() => setEditingCoupon(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <tr key={coupon.id}>
                      <td>{coupon.id}</td>
                      <td>{coupon.code}</td>
                      <td>{coupon.discount}</td>
                      <td>
                        <button
                          className="admin-btn"
                          onClick={() => setEditingCoupon(coupon)}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-btn delete-btn"
                          onClick={() => handleCouponDelete(coupon.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )}
                {editingCoupon && !coupons.find((c) => c.id === editingCoupon.id) && (
                  <tr key={editingCoupon.id}>
                    <td>{editingCoupon.id}</td>
                    <td>
                      <input
                        type="text"
                        value={editingCoupon.code}
                        onChange={(e) =>
                          setEditingCoupon({ ...editingCoupon, code: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editingCoupon.discount}
                        onChange={(e) =>
                          setEditingCoupon({
                            ...editingCoupon,
                            discount: parseFloat(e.target.value),
                          })
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="admin-btn"
                        onClick={() => handleCouponUpdate(editingCoupon)}
                      >
                        Save
                      </button>
                      <button
                        className="admin-btn"
                        onClick={() => setEditingCoupon(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="orders-tab">
            <h2>Manage Orders</h2>
            <div className="orders-header">
              <span>Total Orders: {orders.length}</span>
              <div className="order-tabs">
                <button
                  onClick={() => setOrderStatusTab("All")}
                  className={orderStatusTab === "All" ? "active" : ""}
                >
                  All
                </button>
                <button
                  onClick={() => setOrderStatusTab("Order Placed")}
                  className={orderStatusTab === "Order Placed" ? "active" : ""}
                >
                  Placed
                </button>
                <button
                  onClick={() => setOrderStatusTab("Processing")}
                  className={orderStatusTab === "Processing" ? "active" : ""}
                >
                  Processing
                </button>
                <button
                  onClick={() => setOrderStatusTab("Shipped")}
                  className={orderStatusTab === "Shipped" ? "active" : ""}
                >
                  Shipped
                </button>
                <button
                  onClick={() => setOrderStatusTab("Delivered")}
                  className={orderStatusTab === "Delivered" ? "active" : ""}
                >
                  Delivered
                </button>
              </div>
              <div className="order-search">
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                />
              </div>
            </div>
            {(() => {
              const statusFiltered =
                orderStatusTab === "All"
                  ? orders
                  : orders.filter((order) => order.status === orderStatusTab);
              const searchedOrders = statusFiltered.filter(
                (order) =>
                  order.id.toString().includes(orderSearchQuery) ||
                  order.date.includes(orderSearchQuery)
              );
              return searchedOrders.length > 0 ? (
                searchedOrders.map((order) => (
                  <div key={order.id} className="order-card-admin">
                    <h3>Order #{order.id}</h3>
                    <p>
                      <strong>Date:</strong> {order.date}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹{order.amount}
                    </p>
                    <p>
                      <strong>Current Status:</strong> {order.status || "N/A"}
                    </p>
                    <div>
                      <label>
                        Update Status:{" "}
                        <select
                          defaultValue={order.status}
                          onChange={(e) =>
                            handleOrderStatusUpdate(
                              order.id,
                              e.target.value,
                              order.progressStep
                            )
                          }
                        >
                          <option value="">Select</option>
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </label>
                    </div>
                    <div>
                      <label>
                        Progress Step:{" "}
                        <select
                          defaultValue={order.progressStep}
                          onChange={(e) =>
                            handleOrderStatusUpdate(
                              order.id,
                              order.status,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          <option value={0}>0</option>
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                        </select>
                      </label>
                    </div>
                    {order.progressStep && (
                      <div className="order-progress">
                        {(() => {
                          const steps = [
                            "Order Placed",
                            "Processing",
                            "Shipped",
                            "Delivered",
                          ];
                          return (
                            <div className="progress-steps">
                              {steps.map((step, index) => (
                                <div key={index} className="step-wrapper">
                                  <div
                                    className={`step ${
                                      order.progressStep > index ? "completed" : ""
                                    } ${
                                      order.progressStep === index + 1 ? "current" : ""
                                    }`}
                                  >
                                    <div className="step-number">{index + 1}</div>
                                    <div className="step-label">{step}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
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
              );
            })()}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="users-tab">
            <h2>User Details</h2>
            <div className="user-search">
              <input
                type="text"
                placeholder="Search users by name or phone..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
              />
            </div>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div key={user.id} className="user-card">
                  <h3>{user.name}</h3>
                  <p>Phone: {user.phone}</p>
                  <p>Total Orders: {user.orders.length}</p>
                  {user.orders.length > 0 && (
                    <div className="user-orders">
                      <h4>Orders:</h4>
                      {user.orders.map((order) => (
                        <div key={order.id} className="user-order">
                          <span>
                            Order #{order.id} - ₹{order.amount} - {order.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}
{/* Queries Tab */}
{activeTab === "queries" && (
  <div className="queries-tab">
    <h2>User Queries</h2>
    <div className="query-search">
      <input
        type="text"
        placeholder="Search queries by email, phone or date..."
        value={querySearch}
        onChange={(e) => setQuerySearch(e.target.value)}
      />
    </div>
    {(() => {
      // Update filtering to check for email, phone, and date (if query.date exists)
      const filteredQueries = queries.filter(
        (q) =>
          q.email.toLowerCase().includes(querySearch.toLowerCase()) ||
          q.phone.includes(querySearch) ||
          (q.date && q.date.includes(querySearch))
      );
      return filteredQueries.length > 0 ? (
        filteredQueries.map((query, index) => (
          <div key={index} className="query-card">
            <p>
              <strong>Email:</strong> {query.email}
            </p>
            <p>
              <strong>Phone:</strong> {query.phone}
            </p>
            {query.date && (
              <p>
                <strong>Date:</strong> {query.date}
              </p>
            )}
            <p>
              <strong>Message:</strong> {query.message}
            </p>
          </div>
        ))
      ) : (
        <p>No queries found.</p>
      );
    })()}
  </div>
)}

      </div>
    </div>
  );
};

export default AdminPanel;
