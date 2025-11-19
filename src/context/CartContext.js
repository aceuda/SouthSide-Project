import React, { createContext, useContext, useReducer, useMemo } from "react";

const CartContext = createContext();

const initialState = {
    items: [],
};

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.id === action.payload.id
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }
        case "REMOVE_ITEM": {
            return {
                ...state,
                items: state.items.filter((i) => i.id !== action.payload),
            };
        }
        case "CLEAR_CART":
            return initialState;
        default:
            return state;
    }
}

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const value = useMemo(
        () => ({
            items: state.items,
            addItem: (product) => dispatch({ type: "ADD_ITEM", payload: product }),
            removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
            clearCart: () => dispatch({ type: "CLEAR_CART" }),
        }),
        [state.items]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);