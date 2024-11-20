import React from 'react';
import { ChatProvider } from "@/PageElements/ChatPage/Context";
import ChatScreen from "@/PageElements/ChatPage/ChatScreen";

const Chat = () => {
    return (
        <ChatProvider>
            <ChatScreen />
        </ChatProvider>
    );
};

export default Chat;