import React from "react";
import Section from "../components/ui/Section";
import "../css/ReturnPolicyPage.css";

const ReturnPolicyPage = () => {
    return (
        <Section title="Return Policy">
            <div className="static-page">
                <h1>Return Policy</h1>
                <p>
                    At SouthSide Apparel, we want you to be satisfied with your purchase.
                    If you're not completely happy with your order, you can return or exchange eligible items within 30 days of receiving them.
                </p>
                <p>
                    To be eligible for a return or exchange, items must be in their original condition, unworn, and with all tags attached. Certain items such as undergarments and swimwear are not eligible for returns.
                </p>
                <p>
                    To initiate a return or exchange, please contact our customer service team with your order number and the item(s) you wish to return. Once the return is approved, you will be provided with a return shipping label.
                </p>
                <p>
                    Please note that shipping fees are non-refundable, and the customer is responsible for the cost of return shipping.
                </p>
                <p>
                    If you have any questions or need further assistance, don't hesitate to reach out to our support team.
                </p>
            </div>
        </Section>
    );
};

export default ReturnPolicyPage;
