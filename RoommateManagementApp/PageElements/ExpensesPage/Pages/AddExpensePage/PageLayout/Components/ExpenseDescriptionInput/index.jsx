import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

const ExpenseDescriptionInput = ({ value, onChangeText }) => (
    <View style={styles.container}>
        <View style={styles.iconWrapper}>
            <Icon name="pencil" size={20} color="#4A154B" />
        </View>
        <TextInput
            style={styles.input}
            placeholder="Description"
            placeholderTextColor="#9E9E9E"
            value={value}
            onChangeText={onChangeText}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // flex-row
        alignItems: 'center', // items-center
        gap: 8, // space-x-2
        marginTop: 16, // mt-4
    },
    iconWrapper: {
        backgroundColor: '#E0F7E9', // bg-[#E0F7E9]
        padding: 8, // p-2
        borderRadius: 8, // rounded-md
    },
    input: {
        borderBottomWidth: 1, // border-b
        borderBottomColor: '#D1D5DB', // border-gray-300
        flex: 1, // flex-1
        fontSize: 18, // text-lg
        color: '#4A154B', // text-[#4A154B]
    },
});

export default ExpenseDescriptionInput;
