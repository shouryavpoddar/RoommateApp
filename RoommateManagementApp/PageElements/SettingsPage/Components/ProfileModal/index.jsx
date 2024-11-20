import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileModal({ isVisible, onClose = () => {} }) {
    const [currentName, setCurrentName] = useState('John Doe'); // Default name
    const [name, setName] = useState(currentName); // Editable name field

    const handleSave = () => {
        if (name === currentName) {
            Alert.alert("Error", "Please change the name before saving.");
        } else {
            setCurrentName(name);
            Alert.alert("Saved", "Your profile has been updated.");
            onClose(); // Close the modal after saving
        }
    };

    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Edit Profile</Text>
                    <Text style={styles.subTitle}>Your name is: {currentName}</Text>

                    <Text style={styles.label}>Change Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                        placeholder="Enter your name"
                    />

                    <TouchableOpacity style={styles.profilePictureButton}>
                        <Text style={styles.buttonText}>Change Profile Picture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                        <Text style={styles.buttonText}>Save</Text>
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
    subTitle: {
        fontSize: 16,
        color: '#4A154B',
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
    profilePictureButton: {
        backgroundColor: '#8CC49F',
        padding: 12,
        borderRadius: 6,
        marginBottom: 16,
        width: '100%',
        alignItems: 'center',
    },
    saveButton: {
        backgroundColor: '#4B225F',
        padding: 12,
        borderRadius: 6,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
