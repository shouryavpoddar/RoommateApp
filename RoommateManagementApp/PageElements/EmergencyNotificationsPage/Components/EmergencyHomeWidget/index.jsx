import { StyleSheet, TouchableWithoutFeedback, TouchableOpacity, View, Modal, Text, TextInput, Button, Alert } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function EmergencyHomeWidget() {

    return (
        <View style={styles.tile}>
            <View style={styles.iconContainer}>
                <Ionicons name="warning-outline" size={70} color="#FFF" />
            </View>
            <Text style={styles.title}>Emergency Alerts</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        backgroundColor: "#D32F2F", // Red background
        alignItems: "center", // Center content horizontally
        justifyContent: "center", // Center content vertically
        width: "100%", // Ensure it fills the available width
    },
    iconContainer: {
        backgroundColor: "#FF4C4C", // Slightly lighter red for the icon background
        borderRadius: 50, // Make the icon's background circular
        padding: 20, // Add some padding around the icon
        marginBottom: 10, // Space between icon and text
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 4 }, // Vertical shadow offset
        shadowOpacity: 0.2, // Shadow intensity
        shadowRadius: 5, // Blur radius of the shadow
        elevation: 5, // Android shadow
    },
    title: {
        color: "#FFF", // White text
        fontSize: 18,
        fontWeight: "bold",
    },
});