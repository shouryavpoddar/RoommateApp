import React, { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Text,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '@/StateManagement/Slices/ChatSlice';

const MessageInput = () => {
    const [message, setMessage] = useState('');
    const {id: userID, groupID} = useSelector((state) => state.user); // Ensure `state.user.id` exists
    const dispatch = useDispatch();

    const handleSend = () => {
        if (!message.trim()) {
            console.log('Cannot send an empty message');
            return;
        }

        if (!userID) {
            console.error('User ID is not available. Ensure the user is logged in.');
            return;
        }

        if (!groupID) {
            console.error('Group ID is not available. Ensure groupID is passed as a prop.');
            return;
        }

        // Dispatch the sendMessage action with groupID and senderID
        dispatch(
            sendMessage({
                groupID,
                senderID: userID,
                text: message.trim(),
            })
        );

        setMessage(''); // Clear input after sending
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="#BBBBBB"
                value={message}
                onChangeText={setMessage}
                onSubmitEditing={handleSend} // Send message on "Enter" key press
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: '#EDEFF7',
        borderTopWidth: 1,
        borderTopColor: '#CCCCCC',
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 16,
        color: '#000000', // Changed to black for better contrast
        backgroundColor: '#FFFFFF', // White input field
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#CCCCCC', // Light border for input field
    },
    sendButton: {
        marginLeft: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#4B225F',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default MessageInput;
