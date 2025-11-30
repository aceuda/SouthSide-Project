import React from "react";
import Section from "../components/ui/Section";
import "../css/Shipping.css";

const ShippingPage = () => {
    return (
        <Section title="Shipping">
            <div className="shipping-page">
                <h2>Shipping Options</h2>
                <p>
                    We offer several shipping options to meet your needs:
                </p>
                <ul>
                    <li><strong>Standard Shipping:</strong> 5-7 business days.</li>
                    <li><strong>Expedited Shipping:</strong> 2-3 business days.</li>
                    <li><strong>Overnight Shipping:</strong> 1 business day (orders must be placed before 2 PM).</li>
                </ul>

                <h2>Delivery Times</h2>
                <p>
                    Delivery times may vary depending on your location and the shipping method selected. Orders are processed within 1-2 business days.
                </p>

                <h2>Shipping Fees</h2>
                <p>
                    Shipping fees are calculated based on the weight of your order and the shipping method chosen:
                </p>
                <ul>
                    <li>Standard Shipping: $5.99 (free for orders over $50)</li>
                    <li>Expedited Shipping: $12.99</li>
                    <li>Overnight Shipping: $24.99</li>
                </ul>

                <h2>International Shipping</h2>
                <p>
                    We currently offer international shipping to selected countries. Fees and delivery times vary depending on the destination. Customs duties may apply.
                </p>

                <h2>Tracking Your Order</h2>
                <p>
                    Once your order is shipped, you will receive a tracking number via email to monitor your package.
                </p>
            </div>
        </Section>
    );
};

export default ShippingPage;
