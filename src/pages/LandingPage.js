import React, { useEffect } from "react";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import "../css/LandingPage.css";
import heroImage from "../images/hero.jpg";

// Product data
const dummyProducts = [
    { id: 1, name: "Street Hoodie", price: 1299, tag: "New" },
    { id: 2, name: "Oversized Tee", price: 699, tag: "Bestseller" },
    { id: 3, name: "Cargo Joggers", price: 999, tag: "Hot" },
];

// Product image links
const productImages = [
    "https://i.etsystatic.com/41119239/r/il/16ddb3/7316488106/il_fullxfull.7316488106_7gtn.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20250716/pngtree-oversized-white-t-shirt-mockup-showcasing-minimalistic-fashion-and-detailed-product-image_17590385.jpg",
    "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/N61921s.jpg?im=Resize,width=750"
];

const LandingPage = () => {
    const { addItem } = useCart();

    useEffect(() => {
        document.title = "SouthSide Apparel | Home";
    }, []);

    return (
        <div className="landing">
            {/* Hero section */}
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
                    {dummyProducts.map((p, index) => (
                        <Card key={p.id} className="product-card">
                            <img
                                src={productImages[index]}
                                alt={p.name}
                                className="product-image-placeholder"
                            />
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
