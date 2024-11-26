import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";

const renderFriend = ({ item, onPress }) => (
    <TouchableOpacity
        onPress={() => onPress(item)}
        key={item.id}
        style={styles.friendContainer}
    >
        <View>
            <Text style={styles.friendName}>{item.username}</Text>
            <Text style={styles.balanceText}>Balance: ${item.balance}</Text>
            {(item.transactions || []).slice(0, 2).map((transaction, index) => (
                <Text key={index} style={styles.transactionText}>
                    {transaction.description}: ${transaction.amount.toFixed(2)}
                </Text>
            ))}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    friendContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#F0F4F8',
        borderRadius: 12,
        marginBottom: 16,
    },
    friendName: {
        fontWeight: 'bold',
        color: '#4A154B',
    },
    balanceText: {
        fontSize: 12,
        color: '#6B7280', // Similar to text-gray-500
    },
    transactionText: {
        fontSize: 10,
        color: '#9E9E9E', // Similar to text-gray-400
    },
});

export default renderFriend;
