import React, { useEffect, useState, useCallback } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import CartIcon from "../cart/CartIcon";
import { useCart } from "../../context/CartContext";
import "../../css/Navbar.css";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { resetCart } = useCart();

    const loadAuthFromStorage = useCallback(() => {
        const storedUser = localStorage.getItem("user");
        const storedAdmin = localStorage.getItem("admin");

        setUser(storedUser ? JSON.parse(storedUser) : null);

        if (storedAdmin) {
            try {
                setAdmin(JSON.parse(storedAdmin));
            } catch (e) {
                setAdmin({ name: "Admin" });
            }
        } else {
            setAdmin(null);
        }
    }, []);

    useEffect(() => {
        loadAuthFromStorage();

        const handleStorage = () => loadAuthFromStorage();
        window.addEventListener("storage", handleStorage);
        window.addEventListener("focus", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("focus", handleStorage);
        };
    }, [loadAuthFromStorage]);

    // Also refresh auth state on route change (useful after login redirect without full reload)
    useEffect(() => {
        loadAuthFromStorage();
    }, [location.pathname, loadAuthFromStorage]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("admin");
        setUser(null);
        setAdmin(null);
        resetCart();
        navigate("/");
        window.location.reload();
    };

    return (
        <header className="navbar">
            <div className="navbar-inner">

                <Link to="/" className="navbar-logo">
                    SouthSide<span>Apparel</span>
                </Link>

                <nav className="navbar-links">
                    <NavLink to="/" end>Home</NavLink>
                    <NavLink to="/shop">Shop</NavLink>
                    <NavLink to="/shipping">Shipping</NavLink>
                    <NavLink to="/returns">Returns</NavLink>
                    <NavLink to="/privacy">Privacy</NavLink>
                </nav>

                <div className="navbar-actions">

                    {admin ? (
                        <div className="navbar-user-wrapper hover-wrapper">

                            <div className="navbar-user">
                                <span className="user-icon">👤</span>
                                <span className="user-name">ADMIN</span>
                                <span className="arrow-icon">▼</span>
                            </div>

                            <div className="user-dropdown hover-dropdown">
                                <p className="dropdown-title">Admin</p>

                                <Link to="/admin/dashboard" className="dropdown-item">Dashboard</Link>
                                <Link to="/admin/products" className="dropdown-item">Products</Link>

                                <button onClick={handleLogout} className="dropdown-item logout">
                                    Log Out
                                </button>
                            </div>

                        </div>
                    ) : user ? (
                        <div className="navbar-user-wrapper hover-wrapper">

                            {/* USER ICON + NAME */}
                            <div className="navbar-user">
                                <span className="user-icon">👤</span>
                                <span className="user-name">{user.name}</span>
                                <span className="arrow-icon">▼</span>
                            </div>

                            {/* DROPDOWN MENU */}
                            <div className="user-dropdown hover-dropdown">
                                <p className="dropdown-title">Account</p>

                                <Link to="/profile" className="dropdown-item">Profile</Link>
                                <Link to="/orders" className="dropdown-item">Orders</Link>
                                <Link to="/favorites" className="dropdown-item">Favourites</Link>
                                <Link to="/settings" className="dropdown-item">Account Settings</Link>

                                <button onClick={handleLogout} className="dropdown-item logout">
                                    Log Out
                                </button>
                            </div>

                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="navbar-auth">Login</Link>
                            <Link to="/signup" className="navbar-auth navbar-auth-primary">Sign Up</Link>
                        </>
                    )}

                    <CartIcon />
                </div>
            </div>
        </header>
    );
};

export default Navbar;
