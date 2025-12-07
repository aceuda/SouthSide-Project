import React, { useEffect } from "react";
import Section from "../components/ui/Section";
import "../css/PrivacyPolicyPage.css";

const PrivacyPolicyPage = () => {
    useEffect(() => {
        document.title = "Privacy Policy | SouthSide Apparel";
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="privacy-policy-container">
            <Section title="Privacy Policy" subtitle="Your privacy matters to us">
                <div className="static-page">
                    <div className="policy-intro">
                        <p className="intro-text">
                            At SouthSide Apparel, we value and respect your privacy. This Privacy Policy outlines how we collect, use, protect, and share your personal information when you visit our website or make a purchase.
                        </p>
                        <p className="last-updated">
                            <strong>Last Updated:</strong> December 7, 2025
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Information We Collect</h2>
                        <p>
                            When you interact with our website, we may collect the following types of information:
                        </p>
                        <ul>
                            <li><strong>Personal Information:</strong> Name, email address, phone number, and shipping address</li>
                            <li><strong>Payment Information:</strong> Credit card details and billing information (processed securely through encrypted payment gateways)</li>
                            <li><strong>Usage Data:</strong> Browser type, IP address, pages visited, and time spent on our site</li>
                            <li><strong>Cookie Data:</strong> Preferences and settings to enhance your browsing experience</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>How We Use Your Information</h2>
                        <p>
                            We use the information we collect to:
                        </p>
                        <ul>
                            <li>Process and fulfill your orders efficiently</li>
                            <li>Communicate with you about your purchases, shipping updates, and customer service inquiries</li>
                            <li>Improve our website, products, and services based on your feedback and behavior</li>
                            <li>Send promotional emails and special offers (you can opt-out anytime)</li>
                            <li>Prevent fraudulent transactions and enhance security</li>
                            <li>Comply with legal obligations and regulations</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Data Protection & Security</h2>
                        <p>
                            Your data security is our top priority. We implement industry-standard security measures including:
                        </p>
                        <ul>
                            <li>SSL encryption for all data transmissions</li>
                            <li>Secure payment processing through trusted third-party providers</li>
                            <li>Regular security audits and updates</li>
                            <li>Restricted access to personal information on a need-to-know basis</li>
                            <li>Secure servers protected by firewalls and monitoring systems</li>
                        </ul>
                    </div>

                    <div className="policy-section">
                        <h2>Sharing Your Information</h2>
                        <p>
                            We do not sell, trade, or rent your personal information to third parties. However, we may share your data with:
                        </p>
                        <ul>
                            <li><strong>Service Providers:</strong> Shipping companies, payment processors, and email service providers who help us operate our business</li>
                            <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulations</li>
                            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                        </ul>
                        <p>
                            All third parties are contractually obligated to keep your information confidential and use it only for the purposes we specify.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Cookies & Tracking Technologies</h2>
                        <p>
                            We use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us:
                        </p>
                        <ul>
                            <li>Remember your preferences and settings</li>
                            <li>Understand how you use our website</li>
                            <li>Provide personalized content and recommendations</li>
                            <li>Analyze website traffic and performance</li>
                        </ul>
                        <p>
                            You can control cookie settings through your browser preferences, though disabling cookies may affect website functionality.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Your Rights</h2>
                        <p>
                            You have the following rights regarding your personal information:
                        </p>
                        <ul>
                            <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                            <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                            <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal obligations)</li>
                            <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails at any time</li>
                            <li><strong>Data Portability:</strong> Receive your data in a structured, commonly used format</li>
                        </ul>
                        <p>
                            To exercise any of these rights, please contact us at <a href="mailto:privacy@southsideapparel.com">privacy@southsideapparel.com</a>
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Children's Privacy</h2>
                        <p>
                            Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately so we can delete it.
                        </p>
                    </div>

                    <div className="policy-section">
                        <h2>Policy Updates</h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of significant changes by posting the updated policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
                        </p>
                    </div>

                    <div className="policy-section contact-section">
                        <h2>Contact Us</h2>
                        <p>
                            If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please don't hesitate to reach out:
                        </p>
                        <div className="contact-info">
                            <p><strong>Email:</strong> <a href="mailto:privacy@southsideapparel.com">privacy@southsideapparel.com</a></p>
                            <p><strong>Phone:</strong> +63 (02) 1234-5678</p>
                            <p><strong>Address:</strong> 123 Urban Street, Metro Manila, Philippines</p>
                        </div>
                    </div>

                    <div className="policy-footer">
                        <p>
                            By using our website, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
};

export default PrivacyPolicyPage;
