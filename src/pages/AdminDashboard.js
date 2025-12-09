import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import "../css/AdminDashboard.css";

const API_BASE_URL = "http://localhost:8080/api";

const AdminDashboard = () => {
    const [adminName, setAdminName] = useState("Admin");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        // Load admin display name (adjust to your auth store as needed)
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            try {
                const parsed = JSON.parse(storedAdmin);
                if (parsed?.name) setAdminName(parsed.name);
            } catch (_) {
                setAdminName("Admin");
            }
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_BASE_URL}/orders`);
                if (!res.ok) {
                    throw new Error(`Failed to load orders (${res.status})`);
                }
                const data = await res.json();
                setOrders(Array.isArray(data) ? data : []);
                setError("");
            } catch (err) {
                console.error("Error fetching orders", err);
                setError("Unable to load orders right now.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const stats = useMemo(() => {
        const totalRevenue = orders.reduce((sum, o) => sum + (o.total ?? o.totalAmount ?? 0), 0);
        const totalOrders = orders.length;
        const delivered = orders.filter((o) => o.status === "Delivered").length;
        const inProgress = orders.filter((o) => o.status !== "Delivered").length;
        return { totalRevenue, totalOrders, delivered, inProgress };
    }, [orders]);

    const userOrdersBreakdown = useMemo(() => {
        const userMap = {};
        orders.forEach((order) => {
            const userId = order.userId || "Unknown";
            if (!userMap[userId]) {
                userMap[userId] = {
                    userId,
                    totalOrders: 0,
                    totalSpent: 0,
                    delivered: 0,
                    inProgress: 0,
                };
            }
            userMap[userId].totalOrders += 1;
            userMap[userId].totalSpent += order.total ?? order.totalAmount ?? 0;
            if (order.status === "Delivered") {
                userMap[userId].delivered += 1;
            } else {
                userMap[userId].inProgress += 1;
            }
        });
        return Object.values(userMap).sort((a, b) => b.totalSpent - a.totalSpent);
    }, [orders]);

    const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);

    return (
        <Section title="Admin Dashboard">
            <div className="admin-dash">
                <header className="dash-header">
                    <div>
                        <p className="dash-eyebrow">Welcome back</p>
                        <h1 className="dash-title">{adminName}</h1>
                        <p className="dash-sub">Overview of revenue and orders across the shop.</p>
                    </div>
                    <div className="dash-actions">
                        <Link to="/admin/products">
                            <Button>Manage Products</Button>
                        </Link>
                    </div>
                </header>

                {error && <div className="dash-error">{error}</div>}

                <div className="dash-metrics">
                    <Card className="metric-card">
                        <p className="metric-label">Revenue</p>
                        <p className="metric-value">₱{stats.totalRevenue.toFixed(2)}</p>
                        <p className="metric-hint">Sum of all orders</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Total Orders</p>
                        <p className="metric-value">{stats.totalOrders}</p>
                        <p className="metric-hint">All time</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Delivered</p>
                        <p className="metric-value">{stats.delivered}</p>
                        <p className="metric-hint">Completed orders</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">In Progress</p>
                        <p className="metric-value">{stats.inProgress}</p>
                        <p className="metric-hint">Shipping / processing</p>
                    </Card>
                </div>

                <Card className="dash-panel">
                    <div className="panel-header">
                        <h3>Recent Orders</h3>
                        <span className="panel-meta">Latest 5</span>
                    </div>
                    {loading ? (
                        <div className="dash-loading">Loading orders...</div>
                    ) : recentOrders.length === 0 ? (
                        <div className="dash-empty">No orders yet.</div>
                    ) : (
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{String(order.id).startsWith("ORD-") ? order.id : `ORD-${order.id}`}</td>
                                        <td>
                                            <span className={`status-chip status-${(order.status || "").toLowerCase().replace(/\s+/g, "-")}`}>
                                                {order.status || ""}
                                            </span>
                                        </td>
                                        <td>₱{(order.total ?? order.totalAmount ?? 0).toFixed(2)}</td>
                                        <td>{order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-US") : ""}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Card>

                <Card className="dash-panel">
                    <div className="panel-header">
                        <h3>Orders by User</h3>
                        <span className="panel-meta">Total Revenue Breakdown</span>
                    </div>
                    {loading ? (
                        <div className="dash-loading">Loading user orders...</div>
                    ) : userOrdersBreakdown.length === 0 ? (
                        <div className="dash-empty">No user orders yet.</div>
                    ) : (
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Total Orders</th>
                                    <th>Delivered</th>
                                    <th>In Progress</th>
                                    <th>Total Spent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userOrdersBreakdown.map((user) => (
                                    <tr key={user.userId}>
                                        <td>User {user.userId}</td>
                                        <td>{user.totalOrders}</td>
                                        <td><span className="status-chip status-delivered">{user.delivered}</span></td>
                                        <td><span className="status-chip status-processing">{user.inProgress}</span></td>
                                        <td className="user-total-spent">₱{user.totalSpent.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Card>
            </div>
        </Section>
    );
};

export default AdminDashboard;
