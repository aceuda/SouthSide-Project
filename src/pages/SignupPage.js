import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { secureStorage } from "../utils/secureStorage";
import "../css/AuthPages.css";

const SignupPage = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validate required fields
        if (!form.name || !form.email || !form.password) {
            setError("Please fill in all fields");
            return;
        }

        // Validate password length
        if (form.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        console.log("Attempting signup with:", { name: form.name, email: form.email });

        // Send signup request to backend
        fetch("http://localhost:8080/api/users/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        })
            .then((res) => {
                console.log("Response status:", res.status);
                return res.json();
            })
            .then((data) => {
                console.log("SIGNUP RESPONSE:", data);

                if (data.success === false) {
                    setError(data.message || "This email is already registered. Please use a different email or login.");
                    return;
                }

                if (data.success === true) {
                    setSuccess(data.message || "Account created successfully! Redirecting to login...");

                    // Redirect to login page after showing success message
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                } else {
                    // Log unexpected response
                    console.error("Unexpected response:", data);
                    setError("Unexpected response from server. Please try again.");
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

                {/* Success Message */}
                {success && <p className="auth-success">{success}</p>}

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

            <div className="auth-side-image"></div>
        </div>
    );
};

export default SignupPage;
