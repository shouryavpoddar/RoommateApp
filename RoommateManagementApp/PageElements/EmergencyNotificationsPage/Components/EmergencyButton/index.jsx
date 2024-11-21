import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useContext } from 'react'
import { EmergencyContext } from '../../Context';


export default function EmergencyButton({ bgColor, title, message, buttonObject, isPermanent}) {
    const {setSelectedButton} = useContext(EmergencyContext);

    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: bgColor }]} // Dynamically set bgColor
            onPress={() => {
                console.log("Set selected button!");
                setSelectedButton(buttonObject); // open edit modal when button is selected
            }}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 9999, // Equivalent to rounded-full in Tailwind
        justifyContent: 'center', // Equivalent to flex and justify-center
        alignItems: 'center', // Equivalent to items-center
        width: 160, // Equivalent to w-40
        height: 160, // Equivalent to h-40
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Shadow offset
        shadowOpacity: 0.1, // Shadow opacity
        shadowRadius: 4, // Shadow radius
        marginHorizontal: 8, // Equivalent to mx-2
    },
    buttonText: {
        color: 'white', // Equivalent to text-white
        fontSize: 20, // Equivalent to text-xl
        textAlign: 'center',
        fontWeight: 'bold', // Equivalent to font-bold
    },
});