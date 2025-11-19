import React from "react";
import { Link } from "react-router-dom";
import "../../css/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <h3>SouthSide Apparel</h3>
                    <p>Street-ready styles, everyday comfort.</p>
                </div>
                <div className="footer-links">
                    <Link to="/privacy">Privacy Policy</Link>
                    <Link to="/shipping">Shipping</Link>
                    <Link to="/returns">Return Policy</Link>
                </div>
                <p className="footer-copy">
                    © {new Date().getFullYear()} SouthSide Apparel. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;