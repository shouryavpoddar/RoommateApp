import { StyleSheet, View, Text } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ChatHomeWidget() {

    return (
        <View style={styles.tile}>
            <View style={styles.iconContainer}>
                <Ionicons name="chatbubble-outline" size={70} color="#FFF" />
            </View>
            <Text style={styles.title}>Chat</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tile: {
        flex: 1,
        backgroundColor: "#388E3C", // Green background
        alignItems: "center", // Center content horizontally
        justifyContent: "center", // Center content vertically
        width: "100%", // Ensure it fills the available width
    },
    iconContainer: {
        backgroundColor: "#4CAF50", // Slightly lighter green for the icon background
        borderRadius: 50, // Make the icon's background circular
        padding: 20, // Add some padding around the icon
        marginTop: 10,
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
