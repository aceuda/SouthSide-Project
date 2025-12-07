import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    { id: 4, name: "Denim Jacket", price: 1499, tag: "Trending" },
    { id: 5, name: "Tech Fleece Hoodie", price: 1899, tag: "New" },
    { id: 6, name: "Relaxed Jeans", price: 1199, tag: "Classic" },
    { id: 7, name: "Quarter Zip Sleeve", price: 799, tag: "Bestseller" },
    { id: 8, name: "Running Shorts", price: 499, tag: "Drop" },
];

// Product image links
const productImages = [
    "https://i.etsystatic.com/41119239/r/il/16ddb3/7316488106/il_fullxfull.7316488106_7gtn.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20250716/pngtree-oversized-white-t-shirt-mockup-showcasing-minimalistic-fashion-and-detailed-product-image_17590385.jpg",
    "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/N61921s.jpg?im=Resize,width=750",
    "https://media2.newlookassets.com/i/newlook/833260545M3/mens/mens-clothing/jackets-and-coats/blue-denim-western-jacket.jpg?strip=true&qlt=50&w=720",
    "https://i5.samsclubimages.com/asr/8684ea0f-917a-42e9-a640-3277b79ad6bd.5321548bcd0299af9412fa788d7186f7.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    "https://www.cernucci.com/cdn/shop/files/YY-DCRGT01DH-M-B--_VG-NVRD01DH-M-WG-2.jpg?v=1725286873&width=800",
    "https://m.media-amazon.com/images/I/71zP4BUatFL._AC_UY1000_.jpg",
    "https://images.bike24.com/media/350/i/mb/52/bb/94/adidas-mens-designed-for-running-5-shorts-core-fuse-hn8019-5-1386873.jpg"
];

const LandingPage = () => {
    const { addItem } = useCart();
    const navigate = useNavigate();
    const [addedItems, setAddedItems] = useState({});
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        document.title = "SouthSide Apparel | Home";
    }, []);

    const handleShopNow = () => {
        navigate("/shop");
    };

    const handleViewCollection = () => {
        navigate("/shop");
    };

    const handleAddToCart = (product) => {
        addItem(product);
        
        // Show notification
        setNotification(`${product.name} added to cart!`);
        setTimeout(() => setNotification(null), 3000);

        // Show "Added!" on button
        setAddedItems(prev => ({ ...prev, [product.id]: true }));
        setTimeout(() => {
            setAddedItems(prev => ({ ...prev, [product.id]: false }));
        }, 2000);
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
