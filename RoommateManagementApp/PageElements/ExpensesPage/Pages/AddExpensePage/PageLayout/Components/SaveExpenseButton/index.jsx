import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const SaveExpenseButton = ({ onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Save Expense</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#4A154B', // bg-[#4A154B]
        marginTop: 32, // mt-8
        paddingHorizontal: 32, // px-8
        paddingVertical: 16, // py-4
        borderRadius: 12, // rounded-lg
        alignItems: 'center', // items-center
    },
    buttonText: {
        color: '#FFFFFF', // text-white
        fontWeight: 'bold', // font-bold
    },
});

export default SaveExpenseButton;
