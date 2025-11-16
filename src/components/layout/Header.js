import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext"; // fixed path
import MenuScreen from "./MenuScreen";
import "./Header.css";

function Header({ onNavigate }) {
    const { cartCount } = useContext(CartContext);
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <header className="header">
                <button className="icon-btn" onClick={() => setMenuOpen(true)}>
                    ☰
                </button>

                <div className="logo">SouthSide</div>

                <div className="header-icons">
                    <button className="icon-btn">🔍</button>
                    <button className="icon-btn" onClick={() => onNavigate("login")}>👤</button>

                    <button className="icon-btn" onClick={() => onNavigate("cart")}>
                        🛒 <span className="cart-count">{cartCount}</span>
                    </button>
                </div>
            </header>

            {menuOpen && (
                <MenuScreen onClose={() => setMenuOpen(false)} onNavigate={onNavigate} />
            )}
        </>
    );
}

export default Header;
