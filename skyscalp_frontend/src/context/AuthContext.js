import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context
const AuthContext = createContext();

// Custom hook to consume the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState('');
    const [userData, setUserData] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        if (user) {
            if (user.isLoggedIn) {
                setIsLoggedIn(true)
                setUserData(user)
            }
        }
    }, [])

    // Function to handle login
    const login = (userData, admin = false) => {
        setIsLoggedIn(true);
        setUserID(userData._id);
        setUserData(userData);
        setIsAdmin(admin);
    };

    // Function to handle logout
    const logout = () => {
        setIsLoggedIn(false);
        setUserID('');
        setUserData({});
        setIsAdmin(false);
    };

    const authContextValue = {
        isLoggedIn,
        userID,
        userData,
        isAdmin,
        login,
        logout,
    };

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
