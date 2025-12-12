import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import "../css/LandingPage.css";
import heroImage from "../images/hero.jpg";

const LandingPage = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [addedItems, setAddedItems] = useState({});
    const [notification, setNotification] = useState(null);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        document.title = "SouthSide Apparel | Home";

        // Fetch real products from backend
        fetch("http://localhost:8080/api/products")
            .then((res) => res.json())
            .then((data) => {
                // Get first 8 products for featured drops
                setFeaturedProducts(data.slice(0, 8));
            })
            .catch((err) => console.error("Error loading products:", err));
    }, []);

    const handleShopNow = () => {
        navigate("/shop");
    };

    const handleViewCollection = () => {
        navigate("/shop");
    };

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product.id, 1);

            // Show notification
            setNotification(`${product.name} added to cart!`);
            setTimeout(() => setNotification(null), 3000);

            // Show "Added!" on button
            setAddedItems(prev => ({ ...prev, [product.id]: true }));
            setTimeout(() => {
                setAddedItems(prev => ({ ...prev, [product.id]: false }));
                navigate("/cart");
            }, 1000);
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Please login to add items to cart");
        }
    };

    return (
        <div className="landing">
            {/* Notification */}
            {notification && (
                <div className="cart-notification">
                    ✓ {notification}
                </div>
            )}

            {/* Hero section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>SouthSide Apparel</h1>
                    <p>Urban fits for your everyday hustle.</p>
                    <div className="hero-actions">
                        <Button onClick={handleShopNow}>Shop Now</Button>
                        <Button variant="outline" onClick={handleViewCollection}>View Collection</Button>
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
                    {featuredProducts.map((p) => (
                        <Card key={p.id} className="product-card">
                            <img
                                src={p.image?.startsWith('data:image') ? p.image : `data:image/jpeg;base64,${p.image}`}
                                alt={p.name}
                                className="product-image-placeholder"
                            />
                            <div className="product-info">
                                <div className="product-title-row">
                                    <h3>{p.name}</h3>
                                    <span className="product-tag">{p.category}</span>
                                </div>
                                <p className="product-price">₱{p.price}</p>
                                <Button
                                    onClick={() => handleAddToCart(p)}
                                    disabled={addedItems[p.id]}
                                    className={addedItems[p.id] ? 'button-added' : ''}
                                >
                                    {addedItems[p.id] ? '✓ Added!' : 'Add to Cart'}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    );
};

export default LandingPage;
