// src/Pages/Chat/Context/index.jsx
import React, { createContext, useState } from 'react';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([
        {
            sender: 'roommate',
            text: "Going well! I’ll take care of it tomorrow 😊",
            timestamp: "12:47 PM",
            avatar: 'https://i.pinimg.com/564x/9c/ac/dc/9cacdc207e8997bf90a3daf9c8aaca80.jpg'
        },
        {
            sender: 'user',
            text: "Hey! How’s the cleaning schedule going?",
            timestamp: "12:55 PM"
        },
    ]);

    const sendMessage = (text) => {
        if (text.trim()) {
            setChatHistory([...chatHistory, { sender: 'user', text, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
            setMessage('');
        }
    };

    return (
        <ChatContext.Provider value={{ message, setMessage, chatHistory, sendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};
