import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from "react-redux";

const ChatBubble = ({ item }) => {
    const userId = useSelector(state => state.user.id);
    const users = useSelector(state => state.user.roommates);
    const isSender = item.senderID === userId;

    // Find the sender's username if it's not the current user
    const senderUsername = !isSender
        ? users.find(user => user.id === item.senderID)?.username || "Unknown"
        : "You";

    // Convert Firestore timestamp to Date
    const timestamp = item.timestamp?.seconds
        ? new Date(item.timestamp.seconds * 1000)
        : new Date(item.timestamp);

    const formattedTimestamp = timestamp.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <View style={[styles.messageRow, isSender && styles.messageRowSender]}>
            {!isSender && (
                <Image
                    style={styles.avatar}
                    source={{ uri: item.avatar || "https://via.placeholder.com/40" }}
                />
            )}
            <View style={[styles.messageBubble, isSender ? styles.senderBubble : styles.receiverBubble]}>
                {!isSender && (
                    <Text style={styles.username}>
                        {senderUsername}
                    </Text>
                )}
                <Text style={isSender ? styles.senderText : styles.receiverText}>
                    {item.text}
                </Text>
                <Text style={[styles.timestamp, isSender ? styles.senderTimestamp : styles.receiverTimestamp]}>
                    {formattedTimestamp}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 16,
    },
    messageRowSender: {
        flexDirection: 'row-reverse',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 8,
        borderRadius: 8,
    },
    senderBubble: {
        backgroundColor: '#EDEFF7',
    },
    receiverBubble: {
        backgroundColor: '#2BAC76',
    },
    senderText: {
        color: '#4A154B',
    },
    receiverText: {
        color: '#FFFFFF',
    },
    username: {
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 4,
    },
    timestamp: {
        fontSize: 12,
        marginTop: 4,
    },
    senderTimestamp: {
        alignSelf: 'flex-end',
    },
    receiverTimestamp: {
        alignSelf: 'flex-start',
    },
});

export default ChatBubble;
