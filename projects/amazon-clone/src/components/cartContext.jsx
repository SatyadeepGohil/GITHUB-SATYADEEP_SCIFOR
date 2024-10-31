import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item, quantity = 1) => {
        setCartItems((prevItems) => {
            
            const existingItem = prevItems.findIndex(i => i.id === item.id);
            if (existingItem > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItem] = {
                    ...updatedItems[existingItem], quantity : updatedItems[existingItem].quantity + quantity
                }
                return updatedItems;
            }

            return [...prevItems, {...item, quantity: quantity}]
        })
    }

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    }

    const setItemQuantity = (itemId, quantity) => {
        setCartItems((prevItems) => 
        prevItems.map(item => 
            item.id === itemId ? {...item, quantity} : item
        ))
    }

    const getTotalItemCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    const getItemCountById = (itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, setItemQuantity,  removeFromCart, getTotalItemCount, getItemCountById }}>
            {children}
        </CartContext.Provider>
    )
}