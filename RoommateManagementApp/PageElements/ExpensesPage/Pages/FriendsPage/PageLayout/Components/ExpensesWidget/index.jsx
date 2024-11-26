import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

const ExpensesWiget = () => {
    const expenses = useSelector((state) => state.expenses.expenses);
    const goh = expenses.map((object)=>object[Object.keys(object)[0]])
    console.log("expenses",goh);
    const totalBalances = goh.reduce(
        (totals, expense) => {
            if (expense.type === 'lent') {
                totals.youAreOwed += expense.amount;
            } else {
                totals.youOwe += expense.amount;
            }
            return totals;
        },
        { youOwe: 0, youAreOwed: 0 }
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Total balance</Text>
            <Text style={styles.youOwe}>You owe ${totalBalances.youOwe.toFixed(2)}</Text>
            <Text style={styles.youAreOwed}>You are owed ${totalBalances.youAreOwed.toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#E8F7EF',
        borderRadius: 8,
        //marginBottom: 16,
        width: '100%',
        overflow: 'hidden', // Ensure it doesn't overflow
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A154B',
    },
    youOwe: {
        fontSize: 18,
        color: '#FF0000',
    },
    youAreOwed: {
        fontSize: 18,
        color: '#2BAC76',
        //marginBottom: 16,
    },
});

export default ExpensesWiget;