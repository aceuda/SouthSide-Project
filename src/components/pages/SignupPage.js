import React from "react";
import AuthForm from "../forms/AuthForm";

function SignupPage() {
    return (
        <div className="auth-page">
            <h2>Create Account</h2>
            <AuthForm type="signup" />
        </div>
    );
}

export default SignupPage;