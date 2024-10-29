import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            
            const existingItem = prevItems.find(i => i.id === item.id);
            if (existingItem) {
                return prevItems.map(i => i.id === item.id ? {...i, quantity: (i.quantity || 1) + 1} : i)
            }

            return [...prevItems, {...item, quantity: 1}]
        })
    }

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    }

    const getTotalItemCount = () => {
        return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
    }

    const getItemCountById = (itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        return item ? item.quantity || 1 : 0;
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItemCount, getItemCountById }}>
            {children}
        </CartContext.Provider>
    )
}