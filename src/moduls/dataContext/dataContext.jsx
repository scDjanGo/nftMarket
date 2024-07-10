import React, { createContext, useContext, useState } from 'react';

export const WasContext = createContext();

export const WasProvider = ({ children }) => {
    const [was, setWas] = useState(null);

    return (
        <WasContext.Provider value={{ was, setWas }}>
            {children}
        </WasContext.Provider>
    );
};

export const useWas = () => useContext(WasContext);