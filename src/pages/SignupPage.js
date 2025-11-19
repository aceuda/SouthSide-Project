import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import "../css/AuthPages.css";

const SignupPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send signup request to backend
        fetch("http://localhost:8080/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((res) => res.text())
            .then((msg) => {
                console.log("SIGNUP RESPONSE:", msg);

                if (msg === "Email already exists") {
                    setError(msg);
                    return;
                }

                if (msg === "Signup successful") {
                    alert("Account created successfully!");
                    navigate("/login"); // redirect to login page
                }
            })
            .catch((err) => {
                console.error("Signup error:", err);
                setError("Something went wrong, try again.");
            });
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <h1 className="auth-title">Create Account</h1>
                <p className="auth-subtitle">
                    Join SouthSide to unlock members-only drops and early access.
                </p>

                {/* Error Message */}
                {error && <p className="auth-error">{error}</p>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <Input
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
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
                    <Button type="submit">Join Now</Button>
                </form>

                <p className="auth-footnote">
                    Already a member? <span onClick={() => navigate("/login")} style={{ cursor: "pointer" }}>Sign in</span>
                </p>
            </div>

            <div className="auth-side-image">Street Photo</div>
        </div>
    );
};

export default SignupPage;
