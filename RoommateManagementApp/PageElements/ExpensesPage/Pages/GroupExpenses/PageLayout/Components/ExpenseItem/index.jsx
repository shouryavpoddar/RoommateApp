import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const ExpenseItem = ({ item, onPress }) => (
    <TouchableOpacity onPress={() => onPress(item)}>
        <View style={styles.itemContainer}>
            <View>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <Text style={[styles.amountText, item.type === 'borrowed' ? styles.borrowedAmount : styles.lentAmount]}>
                ${item.amount.toFixed(2)}
            </Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#EDEFF7',
        justifyContent: 'space-between',
        padding: 16, // p-4
        borderRadius: 24, // rounded-3xl
        borderBottomWidth: 1, // border-b
        borderBottomColor: '#E0E0E0', // border-gray-200
    },
    dateText: {
        color: '#9E9E9E', // text-gray-500
        fontSize: 12, // text-xs
    },
    descriptionText: {
        fontWeight: 'bold', // font-bold
        color: '#4A154B',
    },
    amountText: {
        fontWeight: 'bold', // font-bold
    },
    borrowedAmount: {
        color: '#FF0000', // text-[#FF0000]
    },
    lentAmount: {
        color: '#2BAC76', // text-[#2BAC76]
    },
});

export default ExpenseItem;
