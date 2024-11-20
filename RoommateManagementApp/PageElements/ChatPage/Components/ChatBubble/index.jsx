import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ChatBubble = ({ message, isSender }) => {
    return (
        <View style={[styles.chatBubble, isSender ? styles.senderBubble : styles.receiverBubble]}>
            <Text>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    chatBubble: {
        padding: 12, // Equivalent to 'p-3'
        borderRadius: 8, // Equivalent to 'rounded-lg'
    },
    senderBubble: {
        backgroundColor: '#3B82F6', // Equivalent to 'bg-blue-500'
    },
    receiverBubble: {
        backgroundColor: '#E5E7EB', // Equivalent to 'bg-gray-200'
    },
});

export default ChatBubble;
