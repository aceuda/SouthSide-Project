import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import "../css/MenuPage.css";

const categories = [
    "All",
    "New Arrivals",
    "Men",
    "Women",
    "Kids",
    "Accessories",
];

const MenuPage = () => {
    const { addItem } = useCart();
    const [activeCategory, setActiveCategory] = useState("All");

    // React state to hold products from Spring Boot
    const [products, setProducts] = useState([]);

    // Fetch products from Spring Boot API
    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error loading products:", err));
    }, []);

    // Filtering logic
    const filteredProducts =
        activeCategory === "All"
            ? products
            : products.filter((p) =>
                activeCategory === "New Arrivals"
                    ? p.category === "New Arrivals"
                    : p.category === activeCategory
            );

    return (
        <Section title="Shop">
            {/* Category Tabs */}
            <div className="menu-tabs">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        className={`menu-tab ${activeCategory === cat ? "active" : ""}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Product Grid */}
            <div className="menu-product-grid">
                {filteredProducts.map((p) => (
                    <Card key={p.id} className="menu-product-card">
                        <Link to={`/product/${p.id}`}>
                            <div className="menu-product-image">
                                <span>Image</span>
                            </div>
                        </Link>

                        <div className="menu-product-info">
                            <p className="menu-badge">{p.badge}</p>
                            <h3>{p.name}</h3>
                            <p className="menu-subtitle">{p.subtitle}</p>
                            <p className="menu-category">{p.category}</p>
                            <p className="menu-price">₱{p.price}</p>
                            <div className="menu-actions">
                                <Button onClick={() => addItem(p)}>Add to Cart</Button>
                                <Link to={`/product/${p.id}`} className="menu-link">
                                    View
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
};

export default MenuPage;
