import React from 'react';
import { View, Modal, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';

const Layout = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>{children}</View>
    </TouchableWithoutFeedback>
);

Layout.Field = ({ children }) => (
    <View style={styles.field}>{children}</View> // Wrap each field for consistent spacing
);

Layout.ModalContainer = ({ visible, onClose, children }) => (
    <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
    >
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        flex: 1, // flex-1
        padding: 16, // p-4
    },
    field: {
        marginBottom: 16, // mb-4
    },
    modalOverlay: {
        flex: 1, // flex-1
        justifyContent: 'center', // justify-center
        alignItems: 'center', // items-center
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // bg-black/50
    },
});

export default Layout;
