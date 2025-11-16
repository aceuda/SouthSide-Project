import React, { useState } from "react";
import ProductList from "../products/ProductList";
import './LandingPage.css';

// Placeholder data for products (replace with your actual data)
const products = [
    { name: 'WAFFLE WEAVE MOCK NECK TEE IN ANTHRACITE', price: 'PHP 970.00', image: 'path/to/product1.jpg' },
    { name: 'OVERPOCKET MESH SHORT IN STEEL', price: 'PHP 870.00', image: 'path/to/product2.jpg' },
    { name: 'M+ PINSTRIPE SWEATSHIRT IN CHARCOAL GREY', price: 'PHP 1,770.00', image: 'path/to/product3.jpg' },
    { name: 'FLOW PIQUE TEE IN OLIVE', price: 'PHP 1,070.00', image: 'path/to/product4.jpg' },
];

// Array of background images for the slider
const sliderImages = [
    'path/to/hero-image-1.jpg',
    'path/to/hero-image-2.jpg',
    'path/to/hero-image-3.jpg',
];


const LandingPage = () => {
    // State to manage the current slide index
    const [currentSlide, setCurrentSlide] = useState(0);

    // Function to move to the next slide
    const showNextSlide = () => {
        setCurrentSlide((prevIndex) => (prevIndex + 1) % sliderImages.length);
    };

    // Function to move to the previous slide
    const showPrevSlide = () => {
        setCurrentSlide((prevIndex) =>
            (prevIndex - 1 + sliderImages.length) % sliderImages.length
        );
    };

    // Calculate the transform value for the slider container
    const sliderTransform = {
        // Shift by the percentage needed to show the current slide
        transform: `translateX(${-currentSlide * (100 / sliderImages.length)}%)`,
    };

    return (
        <div className="landing-page">
            {/* --- 2. Hero Image Slider Section --- */}
            <section className="hero-slider">
                <div className="slider-container" style={sliderTransform}>
                    {sliderImages.map((imgSrc, index) => (
                        <div
                            key={index}
                            className="slide"
                            style={{ backgroundImage: `url(${imgSrc})` }}
                        />
                    ))}
                </div>

                {/* Slider Arrows */}
                <button className="slider-arrow left-arrow" onClick={showPrevSlide}>〈</button>
                <button className="slider-arrow right-arrow" onClick={showNextSlide}>〉</button>
            </section>

            {/* --- 3. New Arrivals Section --- */}
            <section className="new-arrivals">
                <h2 className="section-title">NEW ARRIVALS</h2>

                {/* Product Grid */}
                <div className="product-grid">
                    {products.map((product, index) => (
                        <div key={index} className="product-item">
                            <img src={product.image} alt={product.name} className="product-image" />
                            <p className="product-name">{product.name}</p>
                            <p className="product-price">{product.price}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
