import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/ui/Section";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import "../css/CheckoutPage.css";

const CheckoutPage = () => {
    const { items, clearCart } = useCart();
    const navigate = useNavigate();
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const [paymentMethod, setPaymentMethod] = useState("card");
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
    const handleSubmit = (e) => {
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

        // Prepare order data
        const orderData = {
            shippingAddress: form.address,
            shippingCity: form.city,
            shippingState: form.city, // Assuming state is the same as city for simplicity
            shippingZip: form.postal,
            phoneNumber: form.card || "N/A",  // Using the card number for phone number if needed
            items: items.map((item) => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                category: item.category
            })),
        };

        const userId = 1; // Replace with actual user ID, e.g., from session or auth context

        // Send order data to the backend to create an order
        fetch(`http://localhost:8080/api/orders/checkout/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        })
            .then((response) => response.json())
            .then((order) => {
                console.log("Order created:", order);
                alert("Order placed successfully!");

                // Clear cart after order creation
                clearCart();

                // Redirect to orders page
                navigate("/orders");
            })
            .catch((error) => {
                console.error("Error creating order:", error);
                alert("There was an error placing the order. Please try again.");
            });
    };

    return (
        <Section title="Checkout">
            <div className="checkout-page">
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

                    <Button type="submit">Place Order</Button>
                </form>

                <aside className="checkout-summary">
                    <h3>Order Summary</h3>
                    <div className="checkout-items">
                        {items.map((item) => (
                            <div key={item.id} className="checkout-item">
                                <span>{item.name}</span>
                                <span>
                                    x{item.quantity} · ₱{item.price}
                                </span>
                            </div>
                        ))}
                    </div>

                    <p className="checkout-line">
                        <span>Subtotal</span>
                        <span>₱{subtotal}</span>
                    </p>
                    <p className="checkout-line">
                        <span>Shipping</span>
                        <span>₱0.00</span>
                    </p>
                    <p className="checkout-line checkout-total">
                        <span>Total</span>
                        <span>₱{subtotal}</span>
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
