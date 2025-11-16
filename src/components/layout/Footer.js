import React from "react";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <p>© 2025 SouthSide Apparel</p>

            <nav className="footer-links">
                <a href="/privacy">Privacy</a>
                <a href="/shipping">Shipping</a>
                <a href="/returns">Returns</a>
            </nav>
        </footer>
    );
}

export default Footer;
