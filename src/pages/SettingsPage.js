import React, { useState, useEffect } from "react";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import "../css/SettingsPage.css";

const SettingsPage = () => {
    const navigate = useNavigate();
    const [settings, setSettings] = useState({
        emailNotifications: true,
        orderUpdates: true,
        promotionalEmails: false,
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");

    useEffect(() => {
        const storedSettings = localStorage.getItem("userSettings");
        if (storedSettings) {
            setSettings({ ...settings, ...JSON.parse(storedSettings) });
        }
    }, []);

    const handleToggle = (field) => {
        const updated = {
            ...settings,
            [field]: !settings[field]
        };
        setSettings(updated);
        const { currentPassword, newPassword, confirmPassword, ...settingsToSave } = updated;
        localStorage.setItem("userSettings", JSON.stringify(settingsToSave));
    };

    const handlePasswordChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });
    };

    const handleChangePassword = () => {
        if (settings.newPassword !== settings.confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }
        if (settings.newPassword.length < 6) {
            setMessage("Password must be at least 6 characters!");
            return;
        }
        // Simulate password change
        setMessage("Password changed successfully!");
        setSettings({
            ...settings,
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        });
        setTimeout(() => setMessage(""), 3000);
    };

    const handleDeleteAccount = () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            localStorage.removeItem("user");
            localStorage.removeItem("userSettings");
            localStorage.removeItem("favourites");
            localStorage.removeItem("orders");
            navigate("/");
            window.location.reload();
        }
    };

    return (
        <Section title="Account Settings">
            <div className="settings-page">
                <div className="settings-card">
                    {/* Notifications Section */}
                    <div className="settings-section">
                        <h3>Notifications</h3>
                        <div className="settings-group">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <h4>Email Notifications</h4>
                                    <p>Receive notifications about your account activity</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.emailNotifications}
                                        onChange={() => handleToggle("emailNotifications")}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <h4>Order Updates</h4>
                                    <p>Get updates about your orders and shipping</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.orderUpdates}
                                        onChange={() => handleToggle("orderUpdates")}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>

                            <div className="setting-item">
                                <div className="setting-info">
                                    <h4>Promotional Emails</h4>
                                    <p>Receive news about sales and promotions</p>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={settings.promotionalEmails}
                                        onChange={() => handleToggle("promotionalEmails")}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Password Section */}
                    <div className="settings-section">
                        <h3>Change Password</h3>
                        {message && <div className="settings-message">{message}</div>}
                        <div className="password-form">
                            <div className="form-group">
                                <label>Current Password</label>
                                <Input
                                    type="password"
                                    name="currentPassword"
                                    value={settings.currentPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter current password"
                                />
                            </div>
                            <div className="form-group">
                                <label>New Password</label>
                                <Input
                                    type="password"
                                    name="newPassword"
                                    value={settings.newPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={settings.confirmPassword}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <Button onClick={handleChangePassword}>Update Password</Button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="settings-section danger-zone">
                        <h3>Danger Zone</h3>
                        <div className="danger-content">
                            <div className="danger-info">
                                <h4>Delete Account</h4>
                                <p>Permanently delete your account and all your data</p>
                            </div>
                            <Button variant="outline" onClick={handleDeleteAccount}>
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default SettingsPage;
