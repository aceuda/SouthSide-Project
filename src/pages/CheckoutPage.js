import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/ui/Section";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import "../css/CheckoutPage.css";

const CheckoutPage = () => {
    const { items, checkout, cartTotal, fetchCart } = useCart();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState("");
    const [form, setForm] = useState({
        fullName: "",
        address: "",
        city: "",
        postal: "",
        card: "",
    });

    // Set form values based on user input
    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate shipping fields
        if (!form.fullName || !form.address || !form.city || !form.postal) {
            alert("Please fill in all shipping fields");
            return;
        }

        // Validate payment method
        if (paymentMethod === "card" && !form.card) {
            alert("Please enter card number");
            return;
        }

        setSubmitting(true);

        try {
            // Prepare checkout data for backend
            const checkoutData = {
                fullName: form.fullName,
                address: form.address,
                city: form.city,
                postal: form.postal,
                paymentMethod: paymentMethod,
                card: paymentMethod === "card" ? form.card : null,
            };

            // Call checkout from CartContext (which calls the backend API)
            const order = await checkout(checkoutData);

            console.log("Order created:", order);

            // Force refresh cart to ensure it's cleared
            await fetchCart();

            setSuccess(`Order #${order.id} placed successfully! Redirecting to your orders...`);

            // Redirect to orders page after showing success message
            setTimeout(() => {
                navigate("/orders");
            }, 2000);
        } catch (error) {
            console.error("Error creating order:", error);
            alert("There was an error placing the order. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Section title="Checkout">
            <div className="checkout-page">
                {success && (
                    <div className="checkout-success-notification">
                        ✓ {success}
                    </div>
                )}
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h3>Shipping Information</h3>
                    <Input
                        label="Full Name"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Postal Code"
                        name="postal"
                        value={form.postal}
                        onChange={handleChange}
                        required
                    />

                    <h3>Payment Method</h3>
                    <div className="payment-methods">
                        <label className="payment-option">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="card"
                                checked={paymentMethod === "card"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="payment-label">
                                <span className="payment-icon">💳</span>
                                <span>Credit/Debit Card</span>
                            </span>
                        </label>

                        <label className="payment-option">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={paymentMethod === "cod"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="payment-label">
                                <span className="payment-icon">💵</span>
                                <span>Cash on Delivery (COD)</span>
                            </span>
                        </label>
                    </div>

                    {paymentMethod === "card" && (
                        <Input
                            label="Card Number"
                            name="card"
                            value={form.card}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            required
                        />
                    )}

                    {paymentMethod === "cod" && (
                        <div className="cod-info">
                            <p>💵 You will pay for this order when it is delivered to you.</p>
                            <p>Please have the exact amount ready when the delivery agent arrives.</p>
                        </div>
                    )}

                    <Button type="submit" disabled={submitting || items.length === 0}>
                        {submitting ? "Processing..." : "Place Order"}
                    </Button>
                </form>

                <aside className="checkout-summary">
                    <h3>Order Summary</h3>
                    <div className="checkout-items">
                        {items.map((item) => (
                            <div key={item.id} className="checkout-item">
                                <span>{item.product?.name}</span>
                                <span>
                                    x{item.quantity} · ₱{item.price}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="checkout-line">
                        <span>Subtotal</span>
                        <span>₱{cartTotal.toFixed(2)}</span>
                    </p>
                    <p className="checkout-line">
                        <span>Shipping</span>
                        <span>₱0.00</span>
                    </p>
                    <p className="checkout-line checkout-total">
                        <span>Total</span>
                        <span>₱{cartTotal.toFixed(2)}</span>
                    </p>
                    <div className="payment-method-display">
                        <p><strong>Payment:</strong> {paymentMethod === "card" ? "Credit/Debit Card" : "Cash on Delivery"}</p>
                    </div>
                </aside>
            </div>
        </Section>
    );
};

export default CheckoutPage;
