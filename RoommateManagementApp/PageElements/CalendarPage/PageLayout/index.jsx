import React, { useContext, useLayoutEffect } from "react";
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { CalendarContext, CalendarProvider } from "../Context";
import {useNavigation} from "expo-router";

const Layout = ({ children, ...restProps }) => {
    return (
        <CalendarProvider>
            <View style={styles.container} {...restProps}>
                {children}
            </View>
        </CalendarProvider>
    );
};

Layout.ScrollSection = ({ children, ...restProps }) => {
    return (
        <ScrollView style={styles.scrollSection} {...restProps}>
            {children}
        </ScrollView>
    );
};

Layout.CalendarSection = ({ children, ...restProps }) => {
    return (
        <View style={styles.calendarSection} {...restProps}>
            {children}
        </View>
    );
};

Layout.ExpandEventModal = ({ children, ...restProps }) => {
    const { selectedTask, setSelectedTask } = useContext(CalendarContext);

    const onClose = () => {
        setSelectedTask(null);
    };

    if (!selectedTask) {
        return null;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

Layout.AddEventModal = ({ children, navigation, ...restProps }) => {
    const { isAddEventModalVisible, setIsAddEventModalVisible } = useContext(CalendarContext);

    const onClose = () => {
        setIsAddEventModalVisible(false);
    };

    useLayoutEffect(() => {
        if (navigation) {
            navigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity onPress={() => setIsAddEventModalVisible(true)} style={styles.addButton}>
                        <Ionicons name="add-circle-outline" size={30} color="black" />
                    </TouchableOpacity>
                ),
            });
        }
    }, [navigation]);

    if (!isAddEventModalVisible) {
        return null;
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={true}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            {children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default Layout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4B225F", // Deep purple background
        padding: 16, // Equivalent to `p-4`
    },
    scrollSection: {
        flex: 1,
    },
    calendarSection: {
        marginBottom: 20, // Equivalent to `mb-5`
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
    },
    modalContent: {
        width: 288, // Equivalent to `w-72`
        padding: 24, // Equivalent to `p-6`
        backgroundColor: "#EDEFF7", // Light gray background
        borderRadius: 20, // Equivalent to `rounded-xl`
        alignItems: "center",
    },
    addButton: {
        marginRight: 15, // Space between the icon and screen edge
    },
});
