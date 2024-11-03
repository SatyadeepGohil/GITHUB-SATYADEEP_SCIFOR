import React, {createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }
        setIsLoading(false);
    }, []);

    const signup = (email, password, name) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(user => user.email === email)) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: Date.now().toString(),
            email,
            password,
            name,
            cart: [],
            browsingHistory: []
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
    };

    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem('users' || '[]'));
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invaild email or password');
        }

        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    const logout = () => {
        if (currentUser) {
            const users = JSON.parse(localStorage.getItem('users' || '[]'));
            const updatedUsers = users.map(user => user.id === currentUser.id ? currentUser : user);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
        }

        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    };

    const updateUserData = (newData) => {
        if (currentUser) {
            const updateUser = {...currentUser, ...newData};
            setCurrentUser(updateUser);
            localStorage.setItem('currentUser', JSON.stringify(updateUser));
        }
    }

    return (
        <AuthContext.Provider value={{
            currentUser,
            isLoading,
            signup,
            login,
            logout,
            updateUserData
        }}>
            {!isLoading && children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}