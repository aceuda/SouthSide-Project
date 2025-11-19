import React from "react";
import "../../css/Button.css";

const Button = ({ variant = "primary", children, ...props }) => {
    return (
        <button className={`btn btn-${variant}`} {...props}>
            {children}
        </button>
    );
};

export default Button;