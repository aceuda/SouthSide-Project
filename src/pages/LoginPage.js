import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "../css/AuthPages.css";

const LoginPage = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleForgotPassword = () => {
        window.location.href = "mailto:support@southside.com?subject=Password%20reset&body=Hi%20SouthSide%20team,%20please%20help%20me%20reset%20my%20password.";
    };

    const handleGoToSignup = () => {
        navigate("/signup");
    };

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("http://localhost:8080/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("LOGIN RESPONSE:", data);

                if (typeof data === "string") {
                    setError(data);
                    return;
                }

                if (data.id) {
                    localStorage.setItem("user", JSON.stringify(data));
                    alert("Login successful!");
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
                        <button type="button" className="auth-text-link" onClick={handleForgotPassword}>
                            Forgotten your password?
                        </button>
                    </div>

                    <Button type="submit">Sign In</Button>
                </form>

                <p className="auth-footnote">
                    Not a member? <span onClick={handleGoToSignup} style={{ cursor: "pointer" }}>Create an account</span>
                </p>
            </div>

            {/* Side Image */}
            <div className="auth-side-image"></div>
        </div>
    );
};

export default LoginPage;
