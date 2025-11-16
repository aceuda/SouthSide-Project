import React, { useState } from "react";
import Input from "../reusable/Input";
import Button from "../reusable/Button";
import "./AuthForm.css";

function AuthForm({ type }) {
    const isLogin = type === "login";

    const [form, setForm] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
    });

    const update = (field, value) => {
        setForm({ ...form, [field]: value });
    };

    return (
        <form className="auth-form">
            {!isLogin && (
                <>
                    <Input label="First Name" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} />
                    <Input label="Last Name" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} />
                </>
            )}

            <Input label="Email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
            />

            <Button variant="primary">{isLogin ? "Login" : "Sign Up"}</Button>
        </form>
    );
}

export default AuthForm;
