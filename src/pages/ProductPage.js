import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";
import "../css/ProductPage.css";

const ProductPage = () => {
    const { id } = useParams();
    const { addToCart, isAuthenticated } = useCart();
    const navigate = useNavigate();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load product from Spring Boot backend
    useEffect(() => {
        fetch(`http://localhost:8080/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading product:", err);
                setLoading(false);
            });
    }, [id]);

    // Loading state
    if (loading) {
        return <p style={{ padding: "20px" }}>Loading product...</p>;
    }

    // Product not found (404)
    if (!product) {
        return (
            <div style={{ padding: "20px" }}>
                <h2>Product not found.</h2>
                <Link to="/shop">← Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="product-page">

            {/* LEFT: IMAGES */}
            <div className="product-media">
                <div className="product-main-image">
                    {product.image ? (
                        <img src={product.image} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                        "Main Image"
                    )}
                </div>

                <div className="product-thumbs">
                    <div className="product-thumb">View 1</div>
                    <div className="product-thumb">View 2</div>
                    <div className="product-thumb">View 3</div>
                </div>
            </div>

            {/* RIGHT: PRODUCT INFO */}
            <div className="product-info-panel">
                <p className="product-category-label">{product.category}</p>

                <h1 className="product-title">{product.name}</h1>
                <p className="product-subtitle">{product.subtitle}</p>

                <p className="product-price-detail">₱{product.price}</p>

                {/* Size selector (mock, Nike-style) */}
                <div className="product-size-section">
                    <div className="product-size-header">
                        <span>Select Size</span>
                        <button className="size-guide-btn">Size Guide</button>
                    </div>
                    <div className="size-grid">
                        {["XS", "S", "M", "L", "XL"].map((size) => (
                            <button key={size} className="size-pill">
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add to Bag + Favorite */}
                <div className="product-actions">
                    <Button
                        onClick={async () => {
                            if (!isAuthenticated) {
                                setShowLoginPrompt(true);
                                return;
                            }
                            await addToCart(product.id, 1);
                        }}
                    >
                        Add to Bag
                    </Button>
                    <Button
                        variant="outline"
                        onClick={async () => {
                            if (!isAuthenticated) {
                                setShowLoginPrompt(true);
                                return;
                            }
                            try {
                                await addToCart(product.id, 1);
                                navigate("/checkout");
                            } catch (err) {
                                alert("Could not proceed to checkout. Please try again.");
                            }
                        }}
                    >
                        Buy Now
                    </Button>
                </div>

                {showLoginPrompt && (
                    <div className="login-modal-backdrop" onClick={() => setShowLoginPrompt(false)}>
                        <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                            <h3>Please log in</h3>
                            <p>You need an account to add items to your bag.</p>
                            <div className="login-modal-actions">
                                <Link to="/login" className="btn btn-primary">Login</Link>
                                <Link to="/signup" className="btn btn-outline">Sign Up</Link>
                                <button className="btn btn-outline" onClick={() => setShowLoginPrompt(false)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Description */}
                <div className="product-desc">
                    <p>{product.description}</p>
                </div>

                {/* Extra Links */}
                <div className="product-extra-links">
                    <button>Shipping & Returns</button>
                    <button>Reviews</button>
                </div>

                <div className="product-back-link">
                    <Link to="/shop">← Back to Shop</Link>
                </div>
            </div>

        </div>
    );
};

export default ProductPage;
