import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    }

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    }

    const getTotalItemCount = () => {
        return cartItems.length;
    }

    const getItemCountById = (itemId) => {
        return cartItems.filter(item => item.id === itemId).length
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItemCount, getItemCountById }}>
            {children}
        </CartContext.Provider>
    )
}