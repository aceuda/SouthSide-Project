import React from "react";
import "../../css/Section.css";

const Section = ({ title, subtitle, children }) => {
    return (
        <section className="section">
            {(title || subtitle) && (
                <header className="section-header">
                    {title && <h2>{title}</h2>}
                    {subtitle && <p>{subtitle}</p>}
                </header>
            )}
            <div className="section-body">{children}</div>
        </section>
    );
};

export default Section;