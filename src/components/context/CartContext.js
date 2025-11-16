import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => setCartItems((prev) => [...prev, product]);

    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeFromCart, cartCount: cartItems.length }}
        >
            {children}
        </CartContext.Provider>
    );
}
