import React from "react";
import Section from "../components/ui/Section";
import "../css/PrivacyPolicyPage.css";

const PrivacyPolicyPage = () => {
    return (
        <Section title="Privacy Policy">
            <div className="static-page">
                <h1>Privacy Policy</h1>
                <p>
                    SouthSide Apparel values the privacy of its customers. We understand that your personal information is important, and we are committed to protecting it. Below, we explain how we collect, use, and safeguard your data.
                </p>
                <p>
                    We collect personal information such as your name, email, shipping address, and payment details when you make a purchase on our site. This information is used to process your orders, communicate with you about your purchases, and improve our services. We take all necessary precautions to ensure your data is securely stored and handled.
                </p>
                <p>
                    By using our website, you agree to the collection and use of your information as described in this policy. We reserve the right to update this policy from time to time, and any changes will be posted here.
                </p>
                <p>
                    If you have any questions or concerns about our privacy practices, feel free to contact us.
                </p>
            </div>
        </Section>
    );
};

export default PrivacyPolicyPage;
