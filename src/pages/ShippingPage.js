import React, { useEffect } from "react";
import Section from "../components/ui/Section";
import "../css/Shipping.css";

const ShippingPage = () => {
    useEffect(() => {
        document.title = "Shipping Information | SouthSide Apparel";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="shipping-container">
            <Section title="Shipping Information" subtitle="Fast and reliable delivery">
                <div className="static-page">
                    <div className="policy-intro">
                        <p className="intro-text">
                            We're committed to getting your SouthSide Apparel order to you quickly and safely. Choose from multiple shipping options to suit your needs.
                        </p>
                        <p className="last-updated">
                            <strong>Last Updated:</strong> December 7, 2025
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Shipping Options</h2>
                        <p>
                            We offer flexible shipping methods to meet your timeline:
                        </p>
                        <ul>
                            <li><strong>Standard Shipping:</strong> 5-7 business days - Perfect for regular orders</li>
                            <li><strong>Expedited Shipping:</strong> 2-3 business days - Faster delivery when you need it</li>
                            <li><strong>Overnight Shipping:</strong> 1 business day - Next-day delivery for urgent orders (must be placed before 2:00 PM)</li>
                        </ul>
                        <p>
                            All orders are processed within 1-2 business days (excluding weekends and holidays).
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Shipping Rates</h2>
                        <p>
                            Shipping fees are calculated based on your order's weight and destination:
                        </p>
                        <ul>
                            <li><strong>Standard Shipping:</strong> ₱350.00</li>
                            <li><strong>Expedited Shipping:</strong> ₱750.00</li>
                            <li><strong>Overnight Shipping:</strong> ₱1,500.00</li>
                            <li><strong>Free Shipping:</strong> Available on orders over ₱3,000.00 (Standard Shipping only)</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Processing & Delivery Times</h2>
                        <p>
                            Understanding your order timeline:
                        </p>
                        <ul>
                            <li><strong>Order Processing:</strong> 1-2 business days for order verification and packaging</li>
                            <li><strong>In Transit:</strong> Time varies by shipping method selected</li>
                            <li><strong>Delivery Window:</strong> Packages typically arrive between 9:00 AM - 6:00 PM</li>
                            <li><strong>Peak Season:</strong> Additional 1-3 days during holidays and sales events</li>
                        </ul>
                        <p>
                            Business days are Monday through Saturday, excluding national holidays.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Delivery Areas</h2>
                        <p>
                            We ship nationwide across the Philippines:
                        </p>
                        <ul>
                            <li><strong>Metro Manila:</strong> All shipping options available</li>
                            <li><strong>Luzon (Provincial):</strong> Standard and Expedited shipping available</li>
                            <li><strong>Visayas:</strong> Standard and Expedited shipping available</li>
                            <li><strong>Mindanao:</strong> Standard and Expedited shipping available</li>
                            <li><strong>Remote Areas:</strong> Standard shipping only, may require additional 2-3 days</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>International Shipping</h2>
                        <p>
                            We currently offer international shipping to selected countries in Asia and beyond:
                        </p>
                        <ul>
                            <li><strong>Available Countries:</strong> Singapore, Malaysia, Thailand, Hong Kong, Japan, South Korea, USA, Canada, Australia</li>
                            <li><strong>Delivery Time:</strong> 7-14 business days depending on destination</li>
                            <li><strong>Shipping Fees:</strong> Calculated at checkout based on weight and destination</li>
                            <li><strong>Customs & Duties:</strong> Customer is responsible for any customs fees, taxes, or duties imposed by destination country</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Order Tracking</h2>
                        <p>
                            Stay updated on your order's journey:
                        </p>
                        <ul>
                            <li>Tracking number sent via email within 24 hours of shipment</li>
                            <li>Track your package in real-time through our shipping partner's website</li>
                            <li>Receive SMS notifications for key delivery milestones</li>
                            <li>Check order status anytime in your account dashboard</li>
                        </ul>
                        <p>
                            If you haven't received tracking information within 48 hours of placing your order, please contact us.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Delivery Issues</h2>
                        <p>
                            If you experience any issues with delivery:
                        </p>
                        <ul>
                            <li><strong>Package Not Received:</strong> Contact us within 7 days of expected delivery date</li>
                            <li><strong>Damaged Package:</strong> Inspect upon delivery and report damage to courier immediately</li>
                            <li><strong>Wrong Address:</strong> Verify shipping address before completing checkout - we cannot redirect packages once shipped</li>
                            <li><strong>Failed Delivery Attempts:</strong> Packages returned to sender after 3 failed delivery attempts may incur reshipment fees</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Shipping Restrictions</h2>
                        <p>
                            Please note the following shipping limitations:
                        </p>
                        <ul>
                            <li>We do not ship to PO boxes or military APO/FPO addresses</li>
                            <li>Certain remote areas may have limited shipping options</li>
                            <li>Orders exceeding 10kg may require special handling and additional fees</li>
                            <li>International shipments may be subject to local import restrictions</li>
                        </ul>
                    </div>

                    <div className="policy-section contact-section">
                        <h2>Shipping Support</h2>
                        <p>
                            Questions about your shipment? We're here to help:
                        </p>
                        <div className="contact-info">
                            <p><strong>Email:</strong> <a href="mailto:shipping@southsideapparel.com">shipping@southsideapparel.com</a></p>
                            <p><strong>Phone:</strong> +63 (02) 1234-5678</p>
                            <p><strong>Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM (PHT)</p>
                        </div>
                    </div>

                    <div className="policy-footer">
                        <p>
                            Shipping times and rates are subject to change. We are not responsible for delays caused by weather, customs, or carrier issues beyond our control.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ShippingPage;
