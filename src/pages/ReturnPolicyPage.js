import React, { useEffect } from "react";
import Section from "../components/ui/Section";
import "../css/ReturnPolicyPage.css";

const ReturnPolicyPage = () => {
    useEffect(() => {
        document.title = "Return Policy | SouthSide Apparel";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="return-policy-container">
            <Section title="Return Policy" subtitle="Shop with confidence">
                <div className="static-page">
                    <div className="policy-intro">
                        <p className="intro-text">
                            At SouthSide Apparel, your satisfaction is our priority. We stand behind the quality of our products and want you to love every purchase. If you're not completely satisfied, we're here to help.
                        </p>
                        <p className="last-updated">
                            <strong>Last Updated:</strong> December 7, 2025
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Return Eligibility</h2>
                        <p>
                            Items are eligible for return within <strong>30 days</strong> of delivery if they meet the following conditions:
                        </p>
                        <ul>
                            <li>Items must be unworn, unwashed, and in original condition</li>
                            <li>All original tags and packaging must be attached</li>
                            <li>Items must not show any signs of wear or damage</li>
                            <li>Proof of purchase (receipt or order confirmation) is required</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Non-Returnable Items</h2>
                        <p>
                            For health and safety reasons, the following items cannot be returned:
                        </p>
                        <ul>
                            <li>Undergarments, underwear, and intimates</li>
                            <li>Swimwear and activewear bottoms</li>
                            <li>Earrings and body jewelry</li>
                            <li>Sale or clearance items marked as "Final Sale"</li>
                            <li>Items without original tags or packaging</li>
                            <li>Customized or personalized products</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>How to Return</h2>
                        <p>
                            Follow these simple steps to initiate your return:
                        </p>
                        <ul>
                            <li><strong>Step 1:</strong> Contact our customer service team at <a href="mailto:returns@southsideapparel.com">returns@southsideapparel.com</a> with your order number</li>
                            <li><strong>Step 2:</strong> Provide details about the item(s) you wish to return and reason for return</li>
                            <li><strong>Step 3:</strong> Receive your return authorization and shipping label via email</li>
                            <li><strong>Step 4:</strong> Pack items securely in original packaging if possible</li>
                            <li><strong>Step 5:</strong> Ship the package using the provided label</li>
                        </ul>
                        <p>
                            Once we receive and inspect your return, we'll process your refund within 5-7 business days.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Exchanges</h2>
                        <p>
                            We offer exchanges for size and color variations, subject to availability. If you'd like to exchange an item:
                        </p>
                        <ul>
                            <li>Contact us within 30 days of delivery</li>
                            <li>Specify the size or color you'd like to exchange for</li>
                            <li>We'll confirm availability and provide exchange instructions</li>
                            <li>Exchanges are processed after we receive the original item</li>
                        </ul>
                        <p>
                            If the desired item is unavailable, we'll process a full refund instead.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Refund Process</h2>
                        <p>
                            Refunds are issued to your original payment method:
                        </p>
                        <ul>
                            <li><strong>Processing Time:</strong> 5-7 business days after we receive your return</li>
                            <li><strong>Credit Card:</strong> Refunds appear within 7-10 business days</li>
                            <li><strong>Debit Card:</strong> Refunds appear within 5-7 business days</li>
                            <li><strong>PayPal:</strong> Refunds appear within 3-5 business days</li>
                        </ul>
                        <p>
                            You'll receive an email confirmation once your refund has been processed.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Return Shipping</h2>
                        <p>
                            Return shipping policies:
                        </p>
                        <ul>
                            <li><strong>Defective Items:</strong> We cover return shipping costs for defective or damaged items</li>
                            <li><strong>Changed Mind:</strong> Customer is responsible for return shipping costs (₱150-350 depending on location)</li>
                            <li><strong>Wrong Item Sent:</strong> We cover all shipping costs and send the correct item immediately</li>
                        </ul>
                        <p>
                            Original shipping fees are non-refundable unless the return is due to our error.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Damaged or Defective Items</h2>
                        <p>
                            If you receive a damaged or defective item:
                        </p>
                        <ul>
                            <li>Contact us within 7 days of receiving your order</li>
                            <li>Provide photos of the damaged item and packaging</li>
                            <li>We'll arrange for a replacement or full refund, including shipping costs</li>
                            <li>No need to return the defective item unless requested</li>
                        </ul>
                    </div>

                    <div className="policy-section contact-section">
                        <h2>Need Help?</h2>
                        <p>
                            Our customer service team is here to assist you with returns, exchanges, or any questions:
                        </p>
                        <div className="contact-info">
                            <p><strong>Email:</strong> <a href="mailto:returns@southsideapparel.com">returns@southsideapparel.com</a></p>
                            <p><strong>Phone:</strong> +63 (02) 1234-5678</p>
                            <p><strong>Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM (PHT)</p>
                        </div>
                    </div>

                    <div className="policy-footer">
                        <p>
                            We reserve the right to refuse returns that do not meet our policy requirements. This policy is subject to change without prior notice.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default ReturnPolicyPage;
