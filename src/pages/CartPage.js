import React from "react";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../css/CartPage.css";

const CartPage = () => {
    const { items, removeItem, clearCart } = useCart();
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <Section title="Bag">
            <div className="cart-page">
                <div className="cart-items">
                    {items.length === 0 ? (
                        <p>Your bag is empty.</p>
                    ) : (
                        items.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-image">Image</div>
                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.category}</p>
                                    <p>Qty: {item.quantity}</p>
                                    <p>₱{item.price}</p>
                                </div>
                                <Button variant="outline" onClick={() => removeItem(item.id)}>
                                    Remove
                                </Button>
                            </div>
                        ))
                    )}
                </div>

                <aside className="cart-summary">
                    <h3>Summary</h3>
                    <p className="cart-line">
                        <span>Subtotal</span>
                        <span>₱{subtotal}</span>
                    </p>
                    <p className="cart-line">
                        <span>Estimated Shipping</span>
                        <span>₱0.00</span>
                    </p>
                    <p className="cart-line cart-total">
                        <span>Total</span>
                        <span>₱{subtotal}</span>
                    </p>

                    <div className="cart-summary-buttons">
                        <Link to="/checkout">
                            <Button disabled={items.length === 0}>Checkout</Button>
                        </Link>
                        <Button variant="outline" onClick={clearCart}>
                            Clear Bag
                        </Button>
                    </div>

                </aside>
            </div>
        </Section>
    );
};

export default CartPage;
