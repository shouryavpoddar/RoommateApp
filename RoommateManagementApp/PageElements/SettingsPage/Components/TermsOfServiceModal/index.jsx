import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TermsOfServiceModal({ isVisible, onClose }) {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Terms of Service</Text>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.text}>
                            By using the Roommate Management App, you agree to follow community guidelines, respect others' privacy, and use the app in a manner that is safe and considerate for all users. Users are responsible for managing their shared tasks, finances, and communication within the platform. The app is provided as-is without any guarantees.
                        </Text>
                    </ScrollView>
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
    scrollView: {
        width: '100%',
    },
    text: {
        color: '#4A154B',
        lineHeight: 24,
        marginBottom: 8,
    },
});
