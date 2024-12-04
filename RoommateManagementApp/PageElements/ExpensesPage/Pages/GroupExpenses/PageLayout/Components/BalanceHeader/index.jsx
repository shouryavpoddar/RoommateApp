import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BalanceHeader = ({ name, balance }) => (

    <View style={styles.container}>
        <View style={styles.balanceBox}>
            <Text style={styles.name}>{name}</Text>
            <Text style={[styles.balanceText, balance >= 0 ? styles.positiveBalance : styles.negativeBalance]}>
                {balance >= 0 ? `owes you $${Math.abs(balance).toFixed(2)}` : `is owed from you $${Math.abs(balance).toFixed(2)}`}
            </Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        marginBottom: 16, // mb-4
    },
    balanceBox: {
        padding: 16, // p-4
        backgroundColor: '#EDEFF7',
        borderRadius: 8, // rounded-lg
        flexDirection: 'row',
        justifyContent: 'space-between', // justify-between
        alignItems: 'center', // items-center
    },
    name: {
        fontSize: 24, // text-2xl
        fontWeight: 'bold', // font-bold
        color: '#4A154B',
    },
    balanceText: {
        fontWeight: 'bold', // font-bold
    },
    positiveBalance: {
        color: '#2BAC76', // text-[#2BAC76]
    },
    negativeBalance: {
        color: '#FF0000', // text-[#FF0000]
    },
});

export default BalanceHeader;
