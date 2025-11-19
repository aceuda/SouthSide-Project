import React from "react";
import Section from "../components/ui/Section";
import "../css/StaticPages.css";

const PaymentPage = () => {
    return (
        <Section title="Payment">
            <div className="static-page">
                <p>
                    Detail accepted payment methods, billing rules, and security
                    information here.
                </p>
            </div>
        </Section>
    );
};

export default PaymentPage;