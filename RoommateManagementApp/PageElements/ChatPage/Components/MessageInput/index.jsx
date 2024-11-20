import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

const MessageInput = ({ onSend }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <View className="flex-row items-center">
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Type a message"
                className="flex-1 border border-gray-300 p-2 rounded-lg"
            />
            <Button title="Send" onPress={handleSend} />
        </View>
    );
};

export default MessageInput;