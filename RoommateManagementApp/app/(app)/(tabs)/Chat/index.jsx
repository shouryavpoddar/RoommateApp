import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {FlatList, View} from "react-native";
import ChatBubble from "@/PageElements/ChatPage/Components/ChatBubble";
import MessageInput from "@/PageElements/ChatPage/Components/MessageInput";
import {loadMessages, subscribeToMessages} from "@/StateManagement/Slices/ChatSlice";

export default function ChatScreen() {
    const chatHistory = useSelector(state => state.chat.chatHistory);
    const groupID = useSelector(state => state.user.groupID);
    const dispatch = useDispatch();


    useEffect(() => {
        // Load existing messages once
        dispatch(loadMessages(groupID));

        // Set up real-time subscription
        const unsubscribe = dispatch(subscribeToMessages(groupID));

        // Cleanup subscription on component unmount
        return () => {
            if (typeof unsubscribe === "function") unsubscribe();
        };
    }, [groupID, dispatch]);

    return (
        <View style={styles.container} testID='chat-main-page'>
            {/* Chat Messages */}
            <FlatList
                data={chatHistory}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.chatContainer}
                renderItem={({item}) => <ChatBubble item={item} />}
            />

            {/* Message Input */}
            <View style={styles.inputContainer}>
                <MessageInput  />
            </View>
        </View>
    );

}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#4B225F', // Equivalent to 'bg-[#4B225F]'
    },
}
