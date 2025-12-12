import React, { createContext, useContext, useState, useEffect } from "react";
import { secureStorage } from "../utils/secureStorage";

const CartContext = createContext();

const API_BASE_URL = "http://localhost:8080/api";

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const getUserId = () => {
        const user = secureStorage.getItem("user");
        if (user && user.id) {
            return user.id;
        }
        return null;
    };

    const getUserRole = () => {
        const user = secureStorage.getItem("user");
        return user?.role || null;
    };

    const userId = getUserId();

    const hasSession = () => {
        const user = secureStorage.getItem("user");
        return !!user;
    };

    // Fetch cart on mount
    useEffect(() => {
        // Don't fetch cart for admin users
        if (getUserRole() !== "admin") {
            fetchCart();
        } else {
            setCart({ items: [], totalAmount: 0 });
            setLoading(false);
        }
    }, []);

    const fetchCart = async () => {
        // Skip cart operations for admin users
        if (getUserRole() === "admin") {
            setCart({ items: [], totalAmount: 0 });
            setLoading(false);
            return;
        }

        if (!hasSession()) {
            setCart({ items: [], totalAmount: 0 });
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched cart data:", data);
                setCart(data);
            } else {
                console.error("Failed to fetch cart");
                setCart({ items: [], totalAmount: 0 });
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCart({ items: [], totalAmount: 0 });
        } finally {
            setLoading(false);
        }
    };

    const resetCart = () => {
        setCart({ items: [], totalAmount: 0 });
        setLoading(false);
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${userId}/items`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, quantity }),
            });

            if (response.ok) {
                // Get the updated cart from the response
                const updatedCart = await response.json();
                console.log("Cart after adding item:", updatedCart);
                setCart(updatedCart);
                return updatedCart;
            } else {
                const error = await response.text();
                console.error("Failed to add to cart:", error);
                throw new Error("Failed to add to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            throw error;
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) {
            return removeItem(itemId);
        }

        try {
            const response = await fetch(
                `${API_BASE_URL}/cart/${userId}/items/${itemId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ quantity }),
                }
            );

            if (response.ok) {
                const updatedCart = await response.json();
                setCart(updatedCart);
            } else {
                console.error("Failed to update quantity");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            console.log("Removing item with ID:", itemId);
            console.log("Current cart before removal:", cart);
            const response = await fetch(
                `${API_BASE_URL}/cart/${userId}/items/${itemId}`,
                { method: "DELETE" }
            );

            console.log("Remove response status:", response.status);

            if (response.ok) {
                // Backend returns updated cart, use it directly
                const updatedCart = await response.json();
                console.log("Updated cart after removal:", updatedCart);
                console.log("Updated cart items:", updatedCart.items);
                setCart(updatedCart);
                console.log("Item removed successfully");
            } else {
                const errorText = await response.text();
                console.error("Failed to remove item:", errorText);
                alert("Failed to remove item from cart");
            }
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Error removing item: " + error.message);
        }
    };

    const clearCart = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/cart/${userId}/clear`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Manually set cart to empty instead of fetching
                setCart({ items: [], totalAmount: 0 });
            } else {
                console.error("Failed to clear cart");
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const checkout = async (checkoutData) => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/orders/checkout/${userId}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(checkoutData),
                }
            );

            if (response.ok) {
                const order = await response.json();
                await fetchCart(); // Refresh cart (should be empty after checkout)
                return order;
            } else {
                const error = await response.text();
                console.error("Checkout failed:", error);
                throw new Error("Checkout failed");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            throw error;
        }
    };

    const value = {
        cart,
        loading,
        items: cart?.items || [],
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        checkout,
        fetchCart,
        resetCart,
        isAuthenticated: hasSession(),
        cartItemCount: cart?.items?.length || 0,
        cartTotal: cart?.items?.reduce((total, item) => total + (item.price * item.quantity), 0) || 0,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within CartProvider");
    }
    return context;
};