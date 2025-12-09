import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "../../css/AdminNavbar.css";

const AdminNavbar = () => {
    const [admin, setAdmin] = useState({ name: "Admin" });
    const navigate = useNavigate();
    const { resetCart } = useCart();

    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin");
        if (storedAdmin) {
            try {
                const parsed = JSON.parse(storedAdmin);
                setAdmin({ name: parsed?.name || "Admin" });
            } catch (_) {
                setAdmin({ name: "Admin" });
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("admin");
        resetCart();
        navigate("/");
        window.location.reload();
    };

    return (
        <header className="navbar admin-navbar">
            <div className="navbar-inner">
                <Link to="/admin/dashboard" className="navbar-logo">
                    SouthSide<span>Admin</span>
                </Link>

                <nav className="navbar-links">
                    <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    <NavLink to="/admin/products">Products</NavLink>
                    <NavLink to="/admin/orders">User Orders</NavLink>
                </nav>

                <div className="navbar-actions">
                    <div className="navbar-user-wrapper hover-wrapper">
                        <div className="navbar-user">
                            <span className="user-icon">🛡️</span>
                            <span className="user-name">{admin.name?.toUpperCase?.() || "ADMIN"}</span>
                            <span className="arrow-icon">▼</span>
                        </div>
                        <div className="user-dropdown hover-dropdown">
                            <p className="dropdown-title">Admin</p>
                            <Link to="/admin/dashboard" className="dropdown-item">Dashboard</Link>
                            <Link to="/admin/products" className="dropdown-item">Products</Link>
                            <Link to="/admin/orders" className="dropdown-item">User Orders</Link>
                            <button onClick={handleLogout} className="dropdown-item logout">Log Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
