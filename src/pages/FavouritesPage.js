import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../components/ui/Section";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";
import "../css/FavouritesPage.css";

const FavouritesPage = () => {
    const { addToCart } = useCart();
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const storedFavourites = localStorage.getItem("favourites");
        if (storedFavourites) {
            try {
                setFavourites(JSON.parse(storedFavourites));
            } catch (e) {
                setFavourites([]);
            }
        }
    }, []);

    const removeFavourite = (id) => {
        const updated = favourites.filter(item => item.id !== id);
        setFavourites(updated);
        localStorage.setItem("favourites", JSON.stringify(updated));
    };

    const handleAddToCart = async (product) => {
        try {
            await addToCart(product.id, 1);
            alert("Added to cart!");
        } catch (e) {
            alert("Failed to add to cart.");
        }
    };

    return (
        <Section title="My Favourites">
            <div className="favourites-page">
                {favourites.length === 0 ? (
                    <div className="favourites-empty">
                        <p>You haven't added any favourites yet.</p>
                        <Link to="/shop">
                            <Button>Browse Products</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="favourites-grid">
                        {favourites.map((product) => (
                            <Card key={product.id} className="favourite-card">
                                <div className="favourite-image">
                                    <span>Image</span>
                                    <button
                                        className="remove-favourite"
                                        onClick={() => removeFavourite(product.id)}
                                        title="Remove from favourites"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <div className="favourite-info">
                                    <div className="favourite-badge">{product.badge}</div>
                                    <h3>{product.name}</h3>
                                    <p className="favourite-category">{product.category}</p>
                                    <p className="favourite-price">₱{product.price}</p>
                                    <div className="favourite-actions">
                                        <Button onClick={() => handleAddToCart(product)}>
                                            Add to Cart
                                        </Button>
                                        <Link to={`/product/${product.id}`} className="view-link">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </Section>
    );
};

export default FavouritesPage;
