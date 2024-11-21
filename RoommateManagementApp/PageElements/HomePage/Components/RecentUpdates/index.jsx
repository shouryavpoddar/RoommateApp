import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Text,
    StyleSheet,
} from "react-native";

const Updates = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const onClose = () => {
        setModalVisible(false);
    };

    const onOpen = () => {
        setModalVisible(true);
    };

    return (
        <>
            <TouchableOpacity style={styles.button} onPress={onOpen}>
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Click me to see updates</Text>
                </View>
            </TouchableOpacity>

            {modalVisible && (
                <Modal
                    propagateSwipe={true}
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={onClose}
                >
                    <TouchableWithoutFeedback onPress={onClose}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalContent}>
                                <ScrollView showsVerticalScrollIndicator={true}>
                                    <TouchableOpacity activeOpacity={1}>
                                        <Text style={styles.sectionHeader}>Updates:</Text>
                                        <Text>1. Added new feature</Text>
                                        <Text>2. Fixed bug</Text>
                                        <Text>3. Added another feature</Text>
                                        <Text>4. Improved UI</Text>
                                        <Text style={styles.sectionHeader}>More Updates:</Text>
                                        <Text>1. Added new feature</Text>
                                        <Text>2. Fixed bug</Text>
                                        <Text>3. Added another feature</Text>
                                        <Text>4. Improved UI</Text>
                                        <Text style={styles.sectionHeader}>Even More Updates:</Text>
                                        <Text>1. Added new feature</Text>
                                        <Text>2. Fixed bug</Text>
                                        <Text>3. Added another feature</Text>
                                        <Text>4. Improved UI</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "100%",
    },
    buttonContent: {
        backgroundColor: "#1E3A8A", // blue-700
        width: "100%",
        padding: 12, // p-3
        alignItems: "center",
        flex: 1
    },
    buttonText: {
        color: "#FFF", // text-white
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center", // flex-1 justify-center
        alignItems: "center", // items-center
        backgroundColor: "rgba(0, 0, 0, 0.5)", // bg-black/50
    },
    modalContent: {
        width: 288, // w-72
        padding: 24, // p-6
        backgroundColor: "#E5E7EB", // gray-200
        borderRadius: 20, // rounded-xl
        maxHeight: "80%", // max-h-[80%]
    },
    sectionHeader: {
        fontWeight: "bold", // font-bold
        marginBottom: 12, // mb-3
    },
});

export default Updates;
