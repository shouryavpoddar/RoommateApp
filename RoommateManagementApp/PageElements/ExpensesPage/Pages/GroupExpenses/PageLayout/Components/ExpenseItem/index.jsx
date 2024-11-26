import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ExpenseItem = ({ item, onPress }) => {
    // Get current user's ID from Redux state
    const userID = useSelector((state) => state.user.id);

    // Determine whether the expense is "borrowed" or "lent"
    const type = item.OwedTo === userID ? 'lent' : item.OwedBy === userID ? 'borrowed' : null;

    return (
        <TouchableOpacity onPress={() => onPress(item)} style={styles.itemContainer}>
            <View>
                <Text style={styles.dateText}>{item.date || 'Unknown Date'}</Text>
                <Text style={styles.descriptionText}>{item.description || 'No Description'}</Text>
            </View>
            <Text
                style={[
                    styles.amountText,
                    type === 'borrowed' ? styles.borrowedAmount : styles.lentAmount,
                ]}
            >
                ${item.amount ? item.amount.toFixed(2) : '0.00'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        backgroundColor: '#EDEFF7',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        marginBottom: 8,
    },
    dateText: {
        color: '#9E9E9E',
        fontSize: 12,
    },
    descriptionText: {
        fontWeight: 'bold',
        color: '#4A154B',
    },
    amountText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    borrowedAmount: {
        color: '#FF0000',
    },
    lentAmount: {
        color: '#2BAC76',
    },
});

export default ExpenseItem;
