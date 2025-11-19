import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "../../css/CartIcon.css";

const CartIcon = () => {
    const { items } = useCart();
    const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Link to="/cart" className="cart-icon">
            <span className="cart-icon-symbol">🛒</span>
            {totalQty > 0 && <span className="cart-icon-badge">{totalQty}</span>}
        </Link>
    );
};

export default CartIcon;