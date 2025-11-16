import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

// Dummy products for demonstration
const products = [
    { id: 1, name: "Street Hoodie", price: 1999, image: "/images/hoodie.jpg" },
    { id: 2, name: "Sneaker X", price: 3499, image: "/images/sneaker.jpg" },
    { id: 3, name: "Cap Classic", price: 499, image: "/images/cap.jpg" },
];

function ProductList({ title }) {
    return (
        <div className="product-list">
            <h2>{title}</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
