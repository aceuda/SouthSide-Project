import React, { useState } from "react";
import Section from "../components/ui/Section";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import "../css/CheckoutPage.css";

const CheckoutPage = () => {
    const { items } = useCart();
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const [form, setForm] = useState({
        fullName: "",
        address: "",
        city: "",
        postal: "",
        card: "",
    });

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Checkout", form, items);
        alert("This is a demo checkout only.");
    };

    return (
        <Section title="Checkout">
            <div className="checkout-page">
                <form className="checkout-form" onSubmit={handleSubmit}>
                    <h3>Shipping</h3>
                    <Input
                        label="Full Name"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                    />
                    <Input
                        label="Address"
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                    />
                    <Input
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                    />
                    <Input
                        label="Postal Code"
                        name="postal"
                        value={form.postal}
                        onChange={handleChange}
                    />

                    <h3>Payment</h3>
                    <Input
                        label="Card Number"
                        name="card"
                        value={form.card}
                        onChange={handleChange}
                    />

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
                </aside>
            </div>
        </Section>
    );
};

export default CheckoutPage;
