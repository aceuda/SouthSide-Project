import React, { useEffect } from "react";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import "../css/CartPage.css";

const CartPage = () => {
    const { items, loading, removeItem, updateQuantity, clearCart, cartTotal, fetchCart } = useCart();

    // Refresh cart when page loads
    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) {
        return (
            <Section title="Bag">
                <div className="cart-page">
                    <div className="cart-loading">
                        <p>Loading your cart...</p>
                    </div>
                </div>
            </Section>
        );
    }

    return (
        <Section title="Bag">
            <div className="cart-page">
                <div className="cart-items">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <p>Your bag is empty.</p>
                            <Link to="/shop">
                                <Button>Start Shopping</Button>
                            </Link>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div className="cart-item" key={item.id}>
                                <div className="cart-item-image">
                                    {item.product?.image ? (
                                        <img src={item.product.image} alt={item.product.name} />
                                    ) : (
                                        <span>Image</span>
                                    )}
                                </div>
                                <div className="cart-item-info">
                                    <h3>{item.product?.name}</h3>
                                    <p>{item.product?.category}</p>
                                    <p>₱{item.price}</p>

                                    {/* Quantity controls */}
                                    <div className="quantity-controls">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="quantity-btn"
                                        >
                                            -
                                        </button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="quantity-btn"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="item-subtotal">
                                        Subtotal: ₱{(item.price * item.quantity).toFixed(2)}
                                    </p>
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
                        <span>₱{cartTotal.toFixed(2)}</span>
                    </p>
                    <p className="cart-line">
                        <span>Estimated Shipping</span>
                        <span>₱0.00</span>
                    </p>
                    <p className="cart-line cart-total">
                        <span>Total</span>
                        <span>₱{cartTotal.toFixed(2)}</span>
                    </p>

                    <div className="cart-summary-buttons">
                        <Link to="/checkout">
                            <Button disabled={items.length === 0}>Checkout</Button>
                        </Link>
                        <Button variant="outline" onClick={clearCart} disabled={items.length === 0}>
                            Clear Bag
                        </Button>
                    </div>
                </aside>
            </div>
        </Section>
    );
};

export default CartPage;