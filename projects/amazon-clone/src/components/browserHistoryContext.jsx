import React, { createContext, useContext, useState } from 'react';

const BrowsingHistoryContext = createContext();

export const BrowsingHistoryProvider = ({ children }) => {
    const [browsingHistory, setBrowsingHistory] = useState([]);

    const addToBrowsingHistory = (product) => {
        setBrowsingHistory(prevHistory => {
            
            const filteredHistory = prevHistory.filter(item => item.id !== product.id)

            return [
                {
                    id: product.id,
                    title: product.title,
                    thumbnail: product.thumbnail,
                    timestamp: new Date().toISOString()
                },
                ...filteredHistory
            ].slice(0,20);
        });
    };

    const clearBrowsingHistory = () => {
        setBrowsingHistory([]);
    };

    return (
        <BrowsingHistoryContext.Provider value={{ browsingHistory, addToBrowsingHistory, clearBrowsingHistory}}>
            {children}
        </BrowsingHistoryContext.Provider>
    )
}

export const useBrowsingHistory = () => {
    const context = useContext(BrowsingHistoryContext);
    if (!context) {
        throw new Error('useBrowsingHistory must be used within a BrowsingHistoryProvider')
    }
    return context;
}