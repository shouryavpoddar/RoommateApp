import React, { createContext, useState } from 'react';

// Create the context
export const SettingsContext = createContext();

// Define the provider component
export const SettingsProvider = ({ children }) => {
    const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);

    return (
        <SettingsContext.Provider
            value={{
                isProfileModalVisible,
                setIsProfileModalVisible,
                isPasswordModalVisible,
                setIsPasswordModalVisible,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};