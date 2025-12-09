import React, { useEffect, useMemo, useState } from "react";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import "../css/AdminOrders.css";

const API_BASE_URL = "http://localhost:8080/api";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAllOrders = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${API_BASE_URL}/orders`);
                if (!res.ok) throw new Error(`Failed to load orders (${res.status})`);
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
        fetchAllOrders();
    }, []);

    const grouped = useMemo(() => {
        const map = new Map();
        orders.forEach((o) => {
            const userId = o.userId ?? o.user?.id ?? "Unknown";
            const name = o.user?.name || o.customerName || `User ${userId}`;
            const entry = map.get(userId) || {
                userId,
                name,
                orders: 0,
                delivered: 0,
                inProgress: 0,
                revenue: 0,
            };
            entry.orders += 1;
            entry.revenue += o.total ?? o.totalAmount ?? 0;
            if (o.status === "Delivered") entry.delivered += 1; else entry.inProgress += 1;
            map.set(userId, entry);
        });
        return Array.from(map.values());
    }, [orders]);

    const totals = useMemo(() => {
        const revenue = orders.reduce((s, o) => s + (o.total ?? o.totalAmount ?? 0), 0);
        const delivered = orders.filter((o) => o.status === "Delivered").length;
        const inProgress = orders.filter((o) => o.status !== "Delivered").length;
        return { revenue, count: orders.length, delivered, inProgress };
    }, [orders]);

    return (
        <Section title="User Orders Summary">
            <div className="admin-orders">
                {error && <div className="orders-error">{error}</div>}

                <div className="orders-metrics">
                    <Card className="metric-card">
                        <p className="metric-label">Total Revenue</p>
                        <p className="metric-value">₱{totals.revenue.toFixed(2)}</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Total Orders</p>
                        <p className="metric-value">{totals.count}</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">Delivered</p>
                        <p className="metric-value">{totals.delivered}</p>
                    </Card>
                    <Card className="metric-card">
                        <p className="metric-label">In Progress</p>
                        <p className="metric-value">{totals.inProgress}</p>
                    </Card>
                </div>

                <Card className="orders-panel">
                    <div className="panel-header">
                        <h3>Orders by User</h3>
                        <span className="panel-meta">Grouped summary</span>
                    </div>
                    {loading ? (
                        <div className="orders-loading">Loading orders...</div>
                    ) : grouped.length === 0 ? (
                        <div className="orders-empty">No orders found.</div>
                    ) : (
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>User ID</th>
                                    <th>Total Orders</th>
                                    <th>Delivered</th>
                                    <th>In Progress</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grouped.map((u) => (
                                    <tr key={u.userId}>
                                        <td>{u.name}</td>
                                        <td>{u.userId}</td>
                                        <td>{u.orders}</td>
                                        <td>{u.delivered}</td>
                                        <td>{u.inProgress}</td>
                                        <td>₱{u.revenue.toFixed(2)}</td>
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

export default AdminOrders;
