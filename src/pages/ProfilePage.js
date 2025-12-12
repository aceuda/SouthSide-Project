import React, { useState, useEffect } from "react";
import Section from "../components/ui/Section";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { secureStorage } from "../utils/secureStorage";
import "../css/ProfilePage.css";

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const storedUser = secureStorage.getItem("user");
        if (storedUser) {
            setUser({
                name: storedUser.name || "",
                email: storedUser.email || "",
                phone: storedUser.phone || "",
                address: storedUser.address || ""
            });
        }
    }, []);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = () => {
        const storedUser = secureStorage.getItem("user");
        const updatedUser = { ...storedUser, ...user };
        secureStorage.setItem("user", updatedUser);
        setIsEditing(false);
    };

    return (
        <Section title="My Profile">
            <div className="profile-page">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">
                            <span>{user.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="profile-header-info">
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <div className="profile-content">
                        <div className="profile-section">
                            <h3>Personal Information</h3>
                            <div className="profile-form">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <Input
                                        name="name"
                                        value={user.name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={user.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <Input
                                        name="phone"
                                        value={user.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter phone number"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Address</label>
                                    <Input
                                        name="address"
                                        value={user.address}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter address"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="profile-actions">
                            {isEditing ? (
                                <>
                                    <Button onClick={handleSave}>Save Changes</Button>
                                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default ProfilePage;
