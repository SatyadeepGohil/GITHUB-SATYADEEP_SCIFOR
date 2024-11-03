import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './authContext';

const BrowsingHistoryContext = createContext();

export const BrowsingHistoryProvider = ({ children }) => {
    const [browsingHistory, setBrowsingHistory] = useState([]);
    const { currentUser, updateUserData } = useAuth();

    useEffect(() => {
        if (currentUser) {
            setBrowsingHistory(currentUser.browsingHistory || []);
        } else {
            setBrowsingHistory([]);
        }
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) return;
        
        const timeoutId = setTimeout(() => {
            updateUserData({ browsingHistory });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [browsingHistory, currentUser, updateUserData]);

    const addToBrowsingHistory = (product) => {
        setBrowsingHistory(prevHistory => {
            const filteredHistory = prevHistory.filter(item => item.id !== product.id);
            return [
                {
                    id: product.id,
                    title: product.title,
                    thumbnail: product.thumbnail,
                    timestamp: new Date().toISOString()
                },
                ...filteredHistory
            ].slice(0, 20);
        });
    };

    const clearBrowsingHistory = () => {
        setBrowsingHistory([]);
    };

    const value = {
        browsingHistory,
        addToBrowsingHistory,
        clearBrowsingHistory
    };

    return (
        <BrowsingHistoryContext.Provider value={value}>
            {children}
        </BrowsingHistoryContext.Provider>
    );
};

export const useBrowsingHistory = () => {
    const context = useContext(BrowsingHistoryContext);
    if (!context) {
        throw new Error('useBrowsingHistory must be used within a BrowsingHistoryProvider');
    }
    return context;
};