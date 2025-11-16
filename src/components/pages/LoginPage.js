import React from "react";
import AuthForm from "../forms/AuthForm";

function LoginPage() {
    return (
        <div className="auth-page">
            <h2>Login</h2>
            <AuthForm type="login" />
        </div>
    );
}

export default LoginPage;