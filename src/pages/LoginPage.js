import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "../css/AuthPages.css";

const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send login request to backend
        fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("LOGIN RESPONSE:", data);

                // If backend returns "User not found", "Invalid password", etc.
                if (typeof data === "string") {
                    setError(data);
                    return;
                }

                // If login success, backend returns the user object
                if (data.id) {
                    // Store user session
                    localStorage.setItem("user", JSON.stringify(data));

                    alert("Login successful!");

                    // Redirect to home or shop
                    navigate("/");
                }
            })
            .catch((err) => {
                console.error("Login error:", err);
                setError("Something went wrong. Try again.");
            });
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <h1 className="auth-title">Sign In</h1>
                <p className="auth-subtitle">
                    Enter your credentials to access SouthSide Apparel.
                </p>

                {/* Error message */}
                {error && <p className="auth-error">{error}</p>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <div className="auth-links-row">
                        <button type="button" className="auth-text-link">
                            Forgotten your password?
                        </button>
                    </div>

                    <Button type="submit">Sign In</Button>
                </form>

                <p className="auth-footnote">
                    Not a member? <span>Create an account</span>
                </p>
            </div>

            <div className="auth-side-image">Lifestyle Image</div>
        </div>
    );
};

export default LoginPage;
