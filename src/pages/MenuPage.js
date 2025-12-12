import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import { secureStorage } from "../utils/secureStorage";
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
    const { addToCart, isAuthenticated } = useCart();
    const navigate = useNavigate();
    const [favourites, setFavourites] = useState([]);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");
    const [addingToCart, setAddingToCart] = useState(null);
    const [notification, setNotification] = useState(null);

    // React state to hold products from Spring Boot
    const [products, setProducts] = useState([]);

    // Get current user ID
    const getUserId = () => {
        const user = secureStorage.getItem("user");
        if (user && user.id) {
            return user.id;
        }
        return null;
    };

    const userId = getUserId();
    const favKey = userId ? `favourites_user_${userId}` : "favourites_guest";

    // Load favourites from localStorage (per user)
    useEffect(() => {
        const stored = localStorage.getItem(favKey);
        if (stored) {
            try {
                setFavourites(JSON.parse(stored));
            } catch (e) {
                setFavourites([]);
            }
        }
    }, [favKey]);

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

    // Handle add to cart with backend API
    const handleAddToCart = async (productId) => {
        if (!isAuthenticated) {
            setShowLoginPrompt(true);
            return;
        }
        setAddingToCart(productId);
        try {
            const product = products.find(p => p.id === productId);
            await addToCart(productId, 1);

            // Show notification
            setNotification(`${product?.name || 'Item'} added to cart!`);
            setTimeout(() => setNotification(null), 3000);
        } catch (error) {
            alert("Failed to add to cart. Please try again.");
        } finally {
            setAddingToCart(null);
        }
    };

    const handleBuyNow = async (productId) => {
        if (!isAuthenticated) {
            setShowLoginPrompt(true);
            return;
        }
        setAddingToCart(productId);
        try {
            await addToCart(productId, 1);
            navigate("/checkout");
        } catch (error) {
            alert("Failed to proceed. Please try again.");
        } finally {
            setAddingToCart(null);
        }
    };

    const toggleFavourite = (product) => {
        const exists = favourites.find((f) => f.id === product.id);
        let updated;
        if (exists) {
            updated = favourites.filter((f) => f.id !== product.id);
        } else {
            updated = [
                ...favourites,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    badge: product.badge,
                    subtitle: product.subtitle,
                    image: product.image || "",
                },
            ];
        }
        setFavourites(updated);
        localStorage.setItem(favKey, JSON.stringify(updated));
    };

    const isFavourite = (productId) => favourites.some((f) => f.id === productId);

    return (
        <Section title="Shop">
            {/* Notification */}
            {notification && (
                <div className="cart-notification">
                    ✓ {notification}
                </div>
            )}

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
                                {p.image && p.image.trim() !== "" ? (
                                    <img
                                        src={p.image.startsWith('data:image') ? p.image : `data:image/jpeg;base64,${p.image}`}
                                        alt={p.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                                    />
                                ) : null}
                                <div style={{ display: p.image && p.image.trim() !== "" ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#f0f0f0', color: '#999' }}>No Image</div>
                            </div>
                        </Link>

                        <div className="menu-product-info">
                            <p className="menu-badge">{p.badge}</p>
                            <h3>{p.name}</h3>
                            <p className="menu-subtitle">{p.subtitle}</p>
                            <p className="menu-category">{p.category}</p>
                            <p className="menu-price">₱{p.price}</p>
                            <div className="menu-actions">
                                <button
                                    className={`fav-star ${isFavourite(p.id) ? "active" : ""}`}
                                    onClick={() => toggleFavourite(p)}
                                    aria-label="Toggle favourite"
                                >
                                    ★
                                </button>
                                <Button
                                    onClick={() => handleAddToCart(p.id)}
                                    disabled={addingToCart === p.id}
                                >
                                    {addingToCart === p.id ? "Adding..." : "Add to Cart"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleBuyNow(p.id)}
                                    disabled={addingToCart === p.id}
                                >
                                    {addingToCart === p.id ? "Adding..." : "Buy Now"}
                                </Button>
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
