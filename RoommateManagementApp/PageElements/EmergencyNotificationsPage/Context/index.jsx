import {createContext, useState} from "react";

export const EmergencyContext = createContext();

// Create a provider component
export const EmergencyProvider = ({ children }) => {
    const [selectedButton, setSelectedButton] = useState(null);  // State for selected button to edit
    
    return (
        <EmergencyContext.Provider value={{ selectedButton, setSelectedButton }}>
            {children}
        </EmergencyContext.Provider>
    );
};