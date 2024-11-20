import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicyModal({ isVisible, onClose }) {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Privacy Policy</Text>
                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.text}>
                            We respect your privacy. The Roommate Management App collects only necessary data to improve user experience, such as task assignments, financial records, and messages. Personal data will not be shared with third parties without your consent. We prioritize data security and provide tools for users to manage their data within the app.
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
