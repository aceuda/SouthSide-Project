import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartScreen() {
    const { cartItems, removeFromCart, cartCount } = useContext(CartContext);

    return (
        <div className="cart-screen">
            <h2>Your Cart ({cartCount})</h2>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div className="cart-item" key={item.id}>
                        <img src={item.image} alt={item.name} />
                        <div>
                            <h3>{item.name}</h3>
                            <p>PHP {item.price.toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default CartScreen;