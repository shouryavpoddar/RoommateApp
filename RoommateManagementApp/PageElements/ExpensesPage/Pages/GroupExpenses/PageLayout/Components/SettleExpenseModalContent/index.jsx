import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SettleExpenseModalContent = ({ expense, onConfirm, onClose }) => (
    <View style={styles.modalContainer}>
        <Text style={styles.title}>Settle Expense</Text>
        <Text style={styles.description}>
            Do you want to settle the expense "{expense?.description}"?
        </Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                <Text style={styles.confirmButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>No</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        padding: 24, // p-6
        borderRadius: 8, // rounded-lg
        width: '75%', // w-3/4
        alignItems: 'center', // items-center
    },
    title: {
        fontSize: 18, // text-lg
        fontWeight: 'bold', // font-bold
        color: '#4A154B',
        marginBottom: 16, // mb-4
    },
    description: {
        color: '#4A4A4A', // text-gray-700
        marginBottom: 16, // mb-4
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // space-x-4
    },
    confirmButton: {
        backgroundColor: '#2BAC76',
        paddingHorizontal: 16, // px-4
        paddingVertical: 8, // py-2
        borderRadius: 4, // rounded-md
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: 'bold', // font-bold
    },
    cancelButton: {
        backgroundColor: '#D1D5DB', // gray-300
        paddingHorizontal: 16, // px-4
        paddingVertical: 8, // py-2
        borderRadius: 4, // rounded-md
    },
    cancelButtonText: {
        color: '#4A4A4A', // text-gray-700
        fontWeight: 'bold', // font-bold
    },
});

export default SettleExpenseModalContent;
