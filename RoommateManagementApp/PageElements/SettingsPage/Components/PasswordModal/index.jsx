import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PasswordModal({ isVisible, onClose = () => {} }) {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert("Error", "Please enter and confirm your new password.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        Alert.alert("Saved", "Your password has been updated.");
        setNewPassword('');
        setConfirmPassword('');
        onClose(); // Close the modal after saving
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Change Password</Text>

                    <Text style={styles.label}>New Password</Text>
                    <TextInput
                        value={newPassword}
                        placeholder='Enter new password'
                        onChangeText={setNewPassword}
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        value={confirmPassword}
                        placeholder='Confirm new password'
                        onChangeText={setConfirmPassword}
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal: {
        width: '80%',
        backgroundColor: '#EDEFF7',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        position: 'relative',
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: '#4A154B',
        fontWeight: '600',
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 6,
        padding: 8,
        marginBottom: 16,
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#4B225F',
        padding: 12,
        borderRadius: 6,
        width: '100%',
        alignItems: 'center',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
