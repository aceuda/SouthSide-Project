import React, { useEffect } from "react";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import "../css/LandingPage.css";
import heroImage from "../images/hero.jpg";

const dummyProducts = [
    { id: 1, name: "Street Hoodie", price: 1299, tag: "New" },
    { id: 2, name: "Oversized Tee", price: 699, tag: "Bestseller" },
    { id: 3, name: "Cargo Joggers", price: 999, tag: "Hot" },
];

const LandingPage = () => {
    const { addItem } = useCart();

    useEffect(() => {
        document.title = "SouthSide Apparel | Home";
    }, []);

    return (
        <div className="landing">
            {/* Hero section similar to wireframe big banner */}
            <section className="hero">
                <div className="hero-content">
                    <h1>SouthSide Apparel</h1>
                    <p>Urban fits for your everyday hustle.</p>
                    <div className="hero-actions">
                        <Button>Shop Now</Button>
                        <Button variant="outline">View Collection</Button>
                    </div>
                </div>
                <img src={heroImage} alt="Hero" className="hero-image" />
            </section>

            {/* Featured products */}
            <Section
                title="Featured Drops"
                subtitle="Curated picks from this week's collection."
            >
                <div className="product-grid">
                    {dummyProducts.map((p) => (
                        <Card key={p.id} className="product-card">
                            <div className="product-image-placeholder">Image</div>
                            <div className="product-info">
                                <div className="product-title-row">
                                    <h3>{p.name}</h3>
                                    <span className="product-tag">{p.tag}</span>
                                </div>
                                <p className="product-price">₱{p.price}</p>
                                <Button onClick={() => addItem(p)}>Add to Cart</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default LandingPage;