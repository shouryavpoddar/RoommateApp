import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const MessageInput = ({ onSend }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input) {
            onSend(input);
            setInput('');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Type a message"
                style={styles.textInput}
            />
            <Button title="Send" onPress={handleSend} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Equivalent to 'flex-row'
        alignItems: 'center', // Equivalent to 'items-center'
    },
    textInput: {
        flex: 1, // Equivalent to 'flex-1'
        borderWidth: 1, // Equivalent to 'border'
        borderColor: '#D1D5DB', // Equivalent to 'border-gray-300'
        padding: 8, // Equivalent to 'p-2'
        borderRadius: 8, // Equivalent to 'rounded-lg'
        marginRight: 8, // Add spacing between input and button
    },
});

export default MessageInput;
