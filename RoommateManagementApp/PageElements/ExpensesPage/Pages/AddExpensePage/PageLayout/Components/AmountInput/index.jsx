// src/PageLayout/Components/AmountInput.js
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AmountInput = ({ value, onChangeText }) => (
    <View style={styles.container}>
        <View style={styles.iconWrapper}>
            <Icon name="dollar" size={20} color="#4A154B" />
        </View>
        <TextInput
            style={styles.input}
            placeholder="0.00"
            placeholderTextColor="#9E9E9E"
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // flex-row
        alignItems: 'center', // items-center
        marginTop: 24, // mt-6
        gap: 8, // space-x-2
    },
    iconWrapper: {
        backgroundColor: '#F5F5F5', // bg-gray-100
        padding: 8, // p-2
        borderRadius: 8, // rounded-md
    },
    input: {
        borderBottomWidth: 1, // border-b
        borderBottomColor: '#38A169', // border-green-500
        flex: 1, // flex-1
        fontSize: 24, // text-3xl
        color: '#4A154B', // text-[#4A154B]
    },
});

export default AmountInput;
