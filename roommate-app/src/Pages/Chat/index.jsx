// src/Pages/Chat/index.jsx
import React from 'react';
import { ChatProvider } from './Context';
import ChatScreen from './ChatScreen';

const Chat = () => {
    return (
        <ChatProvider>
            <ChatScreen />
        </ChatProvider>
    );
};

export default Chat;
