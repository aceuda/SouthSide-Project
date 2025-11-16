import React from "react";

function PaymentPage() {
    return (
        <div className="page-content">
            <h2>Payment Details</h2>

            <form className="payment-form">
                <label>Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" />

                <label>Expiration Date</label>
                <input type="text" placeholder="MM/YY" />

                <label>CVV</label>
                <input type="text" placeholder="123" />

                <button className="primary-btn">Complete Payment</button>
            </form>
        </div>
    );
}

export default PaymentPage;