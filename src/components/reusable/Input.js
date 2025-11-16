import React from "react";
import "./Input.css";

function Input({ label, value, onChange, type = "text" }) {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input type={type} value={value} onChange={onChange} />
        </div>
    );
}

export default Input;