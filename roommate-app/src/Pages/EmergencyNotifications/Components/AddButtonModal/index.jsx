import { useState } from 'react'
import { TouchableWithoutFeedback, TouchableOpacity, View, Modal, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEmergencyButton } from '../../../../StateManagement/Slices/EmergencyButtonSlice'
import Ionicons from "react-native-vector-icons/Ionicons";


export default function AddButtonModal({ navigation }) {
    const [isAddButtonModalVisible, setIsAddButtonModalVisible] = useState(false);  //false to start
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [bgColor, setBgColor] = useState('bg-red-500');

    const handleSubmit = () => {
        // Dispatch the new task to Redux
        dispatch(addEmergencyButton({ title: title, message: message, bgColor: bgColor })); 
        console.log(`sent button with title: ${title}, message: ${message}, bgColor: ${bgColor}`)
        resetFields();

        setIsAddButtonModalVisible(false); // Close modal after submitting
    };

    const onClose = () => {
        setIsAddButtonModalVisible(false); 
        resetFields(); 
    }

    const resetFields = () => {
        setTitle('');
        setMessage('');
        setBgColor('bg-red-500');   //temporary default
    }

    // create add button in top nav bar
    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => setIsAddButtonModalVisible(true)} style={{ marginRight: 15 }}>
                <Ionicons name="add-circle-outline" size={30} color="black" />
            </TouchableOpacity>
        ),
    });

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
                <View className="flex-1 justify-center items-center bg-black/50">
                    <TouchableWithoutFeedback>
                        <View className="w-72 p-6 bg-[#EDEFF7] rounded-xl items-center">
                            {/* Modal Content Goes Here */}
                            <Text className="text-xl font-bold mb-4">Add Emergency Button</Text>

                            <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Title</Text>
                            <TextInput
                                value={title}
                                onChangeText={setTitle}
                                className="border border-gray-300 p-2 mb-4 w-full"
                            />

                            <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Description</Text>
                            <TextInput
                                value={message}
                                onChangeText={setMessage}
                                className="border border-gray-300 p-2 mb-4 w-full"
                            />

                            <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Color</Text>
                            <TextInput
                                value={bgColor}
                                onChangeText={setBgColor}
                                className="border border-gray-300 p-2 mb-4 w-full"
                            />

                            <Button title="Add" onPress={handleSubmit} />
                            
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
