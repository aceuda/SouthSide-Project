import React, { useState, useEffect } from "react";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { secureStorage } from "../utils/secureStorage";
import "../css/OrdersPage.css";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState("");

    useEffect(() => {
        // Get actual user ID from secureStorage
        const user = secureStorage.getItem("user");
        let userId = null;
        if (user && user.id) {
            userId = user.id;
        }

        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);

        fetch(`http://localhost:8080/api/orders/user/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "Delivered":
                return "status-delivered";
            case "Shipping":
                return "status-shipping";
            case "Processing":
                return "status-processing";
            case "Not Received":
                return "status-not-received";
            default:
                return "";
        }
    };

    const formatOrderId = (id) => {
        const idString = String(id);
        return idString.startsWith("ORD-") ? idString : `ORD-${idString}`;
    };

    const handleOrderReceived = (orderId) => {
        const updatedOrder = { status: "Delivered" };

        fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedOrder),
        })
            .then((response) => response.json())
            .then((order) => {
                setOrders((prevOrders) =>
                    prevOrders.map((o) =>
                        o.id === order.id ? { ...o, status: "Delivered" } : o
                    )
                );
                setNotification("Order marked as received!");
                setTimeout(() => setNotification(""), 3000);
            })
            .catch((error) => {
                console.error("Error updating order status:", error);
                alert("There was an error updating the order status.");
            });
    };

    const handleOrderNotReceived = (orderId) => {
        const updatedOrder = { status: "Not Received" };

        fetch(`http://localhost:8080/api/orders/${orderId}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedOrder),
        })
            .then((response) => response.json())
            .then((order) => {
                setOrders((prevOrders) =>
                    prevOrders.map((o) =>
                        o.id === order.id ? { ...o, status: "Not Received" } : o
                    )
                );
                alert("Order marked as not received.");
            })
            .catch((error) => {
                console.error("Error updating order status:", error);
                alert("There was an error updating the order status.");
            });
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            fetch(`http://localhost:8080/api/orders/${orderId}`, {
                method: "DELETE",
            })
                .then(() => {
                    const updatedOrders = orders.filter((order) => order.id !== orderId);
                    setOrders(updatedOrders);
                    alert("Order deleted successfully.");
                })
                .catch((error) => {
                    console.error("Error deleting order:", error);
                    alert("There was an error deleting the order.");
                });
        }
    };

    return (
        <Section title="My Orders">
            <div className="orders-page">
                {notification && (
                    <div className="order-notification">
                        ✓ {notification}
                    </div>
                )}
                {loading ? (
                    <div className="orders-loading">
                        <p>Loading your orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="orders-empty">
                        <p>You haven't placed any orders yet.</p>
                        <Link to="/shop">
                            <Button>Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Active Orders Section */}
                        <div className="orders-section">
                            <h2 className="section-title">Active Orders</h2>
                            <div className="orders-list">
                                {orders.filter(order => order.status !== "Delivered").length === 0 ? (
                                    <p className="no-orders-message">No active orders</p>
                                ) : (
                                    orders.filter(order => order.status !== "Delivered").map((order) => (
                                        <Card key={order.id} className="order-card">
                                            <div className="order-header">
                                                <div className="order-info">
                                                    <h3>{formatOrderId(order.id)}</h3>
                                                    <p className="order-date">
                                                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                                <span className={`order-status ${getStatusClass(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>

                                            <div className="order-items">
                                                {order.items && order.items.map((item, index) => (
                                                    <div key={index} className="order-item">
                                                        <span className="item-name">{item.product.name}</span>
                                                        <span className="item-qty">Qty: {item.quantity}</span>
                                                        <span className="item-price">₱{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="order-footer">
                                                <div className="order-total">
                                                    <span>Total:</span>
                                                    <span className="total-amount">₱{order.total}</span>
                                                </div>
                                                <div className="order-actions">
                                                    {order.status !== "Delivered" && order.status !== "Not Received" && (
                                                        <>
                                                            <Button onClick={() => handleOrderReceived(order.id)}>
                                                                ✓ Order Received
                                                            </Button>
                                                            <Button variant="outline" onClick={() => handleOrderNotReceived(order.id)}>
                                                                ✗ Not Received
                                                            </Button>
                                                        </>
                                                    )}
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleDeleteOrder(order.id)}
                                                        className="delete-btn"
                                                    >
                                                        🗑️ Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Completed Orders Section */}
                        {orders.filter(order => order.status === "Delivered").length > 0 && (
                            <div className="orders-section completed-section">
                                <h2 className="section-title">Completed Orders</h2>
                                <div className="orders-list">
                                    {orders.filter(order => order.status === "Delivered").map((order) => (
                                        <Card key={order.id} className="order-card">
                                            <div className="order-header">
                                                <div className="order-info">
                                                    <h3>{formatOrderId(order.id)}</h3>
                                                    <p className="order-date">
                                                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </p>
                                                </div>
                                                <span className={`order-status ${getStatusClass(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>

                                            <div className="order-items">
                                                {order.items && order.items.map((item, index) => (
                                                    <div key={index} className="order-item">
                                                        <span className="item-name">{item.product.name}</span>
                                                        <span className="item-qty">Qty: {item.quantity}</span>
                                                        <span className="item-price">₱{item.price}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="order-footer">
                                                <div className="order-total">
                                                    <span>Total:</span>
                                                    <span className="total-amount">₱{order.total}</span>
                                                </div>
                                                <div className="order-actions">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => handleDeleteOrder(order.id)}
                                                        className="delete-btn"
                                                    >
                                                        🗑️ Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </Section>
    );
};

export default OrdersPage;
