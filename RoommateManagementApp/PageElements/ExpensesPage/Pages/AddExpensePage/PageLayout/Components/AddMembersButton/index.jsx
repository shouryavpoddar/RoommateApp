// src/PageLayout/Components/AddMembersButton.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddMembersButton = ({ onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Icon name="users" size={20} color="#4A154B" />
        <Text style={styles.text}>Add Members</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E0F7E9',
        marginTop: 24, // mt-6
        paddingHorizontal: 16, // px-4
        paddingVertical: 8, // py-2
        borderRadius: 8, // rounded-md
        flexDirection: 'row', // flex-row
        alignItems: 'center', // items-center
    },
    text: {
        marginLeft: 8, // ml-2
        color: '#4A154B',
        fontWeight: 'bold', // font-bold
    },
});

export default AddMembersButton;
