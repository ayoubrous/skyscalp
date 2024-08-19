import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataContextProvider = ({ children }) => {
    const [country, setCountry] = useState('');
    const contextValue = {
        country,
        setCountry
    };

    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>;
};

export default DataContext;
