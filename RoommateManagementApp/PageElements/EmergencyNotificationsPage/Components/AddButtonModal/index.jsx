import { useEffect, useLayoutEffect, useState } from 'react'    
import { StyleSheet, TouchableWithoutFeedback, TouchableOpacity, View, Modal, Text, TextInput, Button, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEmergencyButton } from '@/StateManagement/Slices/EmergencyButtonSlice'
import Ionicons from "react-native-vector-icons/Ionicons";


export default function AddButtonModal({ navigation }) {
    const [isAddButtonModalVisible, setIsAddButtonModalVisible] = useState(false);  //false to start
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [bgColor, setBgColor] = useState('#FF5733');

    const handleSubmit = () => {
        // Dispatch the new task to Redux
        if (title.trim() !== '' && message.trim() !== '') {
            dispatch(addEmergencyButton({ title: title, message: message, bgColor: bgColor })); 
            console.log(`sent button with title: ${title}, message: ${message}, bgColor: ${bgColor}`)
            resetFields();
            setIsAddButtonModalVisible(false); // Close modal after submitting
        }
        //if inputs were invalid
        else {
            Alert.alert('Error', 'Please enter a title and description.');
        }
    };

    const onClose = () => {
        setIsAddButtonModalVisible(false); 
        resetFields(); 
    }

    const resetFields = () => {
        setTitle('');
        setMessage('');
        setBgColor('#FF5733');   //temporary default
    }

    // create add button in top nav bar
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setIsAddButtonModalVisible(true)} style={styles.addButton} testID='add-emergency-modal-button'>
                    <Ionicons name="add-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);  // Dependency array ensures this only runs once when the component mounts

    if(!isAddButtonModalVisible){
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
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            {/* Modal Content Goes Here */}
                            <Text style={styles.modalTitle}>Add Emergency Button</Text>

                            <Text style={styles.inputLabel}>Title</Text>
                            <TextInput
                                value={title}
                                placeholder="Enter title here"
                                onChangeText={setTitle}
                                style={styles.textInput}
                            />

                            <Text style={styles.inputLabel}>Description</Text>
                            <TextInput
                                value={message}
                                placeholder="Enter description here"
                                onChangeText={setMessage}
                                style={styles.textInput}
                            />

                            <Text style={styles.inputLabel}>Color</Text>
                            <TextInput
                                value={bgColor}
                                placeholder="Enter color here"
                                onChangeText={setBgColor}
                                style={styles.textInput}
                            />

                            <Button title="Add" onPress={handleSubmit} />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Equivalent to bg-black/50
    },
    modalContainer: {
        width: 288, // Equivalent to w-72 (72 * 4px for scale factor)
        padding: 24, // Equivalent to p-6
        backgroundColor: '#EDEFF7', // Equivalent to bg-[#EDEFF7]
        borderRadius: 16, // Equivalent to rounded-xl
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20, // Equivalent to text-xl
        fontWeight: 'bold', // Equivalent to font-bold
        marginBottom: 16, // Equivalent to mb-4
    },
    inputLabel: {
        fontSize: 14, // Equivalent to text-base
        color: '#4A154B', // Equivalent to text-[#4A154B]
        textAlign: 'left', // Equivalent to text-left
        fontWeight: '600', // Equivalent to font-semibold
        marginBottom: 8, // Equivalent to mb-2
        width: '100%', // Equivalent to w-full
    },
    textInput: {
        width: '100%', // Equivalent to w-full
        padding: 8, // Equivalent to p-2
        borderWidth: 1, // Equivalent to border
        borderColor: '#D1D5DB', // Equivalent to border-gray-300
        marginBottom: 16, // Equivalent to mb-4
        borderRadius: 8, // Optional to make it rounded like Tailwind's rounded-lg
    },
    addButton: {
        marginRight: 15, // Space between the icon and screen edge
    },
});