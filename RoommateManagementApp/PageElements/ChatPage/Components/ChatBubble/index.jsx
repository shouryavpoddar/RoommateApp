import React from 'react';
import { View, Text } from 'react-native';

const ChatBubble = ({ message, isSender }) => {
    return (
        <View className={`p-3 rounded-lg ${isSender ? 'bg-blue-500' : 'bg-gray-200'}`}>
            <Text>{message}</Text>
        </View>
    );
};

export default ChatBubble;