import React from "react";
import "../../css/Input.css";

const Input = ({ label, type = "text", ...props }) => {
    return (
        <label className="input-group">
            <span className="input-label">{label}</span>
            <input type={type} className="input-control" {...props} />
        </label>
    );
};

export default Input;