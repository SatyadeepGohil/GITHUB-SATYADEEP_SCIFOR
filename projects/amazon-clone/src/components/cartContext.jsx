import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useAuth } from './authContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { currentUser, updateUserData } = useAuth();
    const [isInitialized, setIsInitialized] = useState(false);
    
    useEffect(() => {
        if (currentUser && !isInitialized) {
            setCartItems(currentUser.cart || []);
            setIsInitialized(true);
        } else if (!currentUser) {
            setCartItems([]);
            setIsInitialized(false);
        }
    }, [currentUser, isInitialized]);

    // Sync cart changes to localStorage directly to prevent loss of data
    const syncToStorage = useCallback((items) => {
        if (!currentUser) return;
        
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = users.map(user => 
            user.id === currentUser.id 
                ? { ...user, cart: items }
                : user
        );
        
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        
        // Update current user in localStorage
        const updatedCurrentUser = { ...currentUser, cart: items };
        localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
        
        // Update user data in context
        setTimeout(() => {
            updateUserData({ cart: items });
        }, 500);
    }, [currentUser, updateUserData]);

    const addToCart = useCallback((item, quantity = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.findIndex(i => i.id === item.id);
            let updatedItems;
            
            if (existingItem > -1) {
                updatedItems = [...prevItems];
                updatedItems[existingItem] = {
                    ...updatedItems[existingItem],
                    quantity: updatedItems[existingItem].quantity + quantity
                };
            } else {
                updatedItems = [...prevItems, { ...item, quantity }];
            }
            
            syncToStorage(updatedItems);
            return updatedItems;
        });
    }, [syncToStorage]);

    const removeFromCart = useCallback((itemId) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.filter(item => item.id !== itemId);
            syncToStorage(updatedItems);
            return updatedItems;
        });
    }, [syncToStorage]);

    const setItemQuantity = useCallback((itemId, quantity) => {
        setCartItems(prevItems => {
            const updatedItems = prevItems.map(item => 
                item.id === itemId ? { ...item, quantity } : item
            );
            syncToStorage(updatedItems);
            return updatedItems;
        });
    }, [syncToStorage]);

    const getTotalItemCount = useCallback(() => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    const getItemCountById = useCallback((itemId) => {
        const item = cartItems.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    }, [cartItems]);

    const clearCart = useCallback(() => {
        setCartItems([]);
        syncToStorage([]);
    }, [syncToStorage]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        setItemQuantity,
        getTotalItemCount,
        getItemCountById,
        clearCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};