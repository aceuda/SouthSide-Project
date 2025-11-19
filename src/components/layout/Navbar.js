import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import CartIcon from "../cart/CartIcon";
import "../../css/Navbar.css";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
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

                    {user ? (
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
