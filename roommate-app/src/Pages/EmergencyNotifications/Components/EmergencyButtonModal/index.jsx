import { useEffect, useContext, useState } from 'react'    
import { Text, TextInput, Button, Modal, TouchableWithoutFeedback, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { editEmergencyButton, deleteEmergencyButton } from '../../../../StateManagement/Slices/EmergencyButtonSlice'
import { EmergencyContext } from '../../Context';

export default function EmergencyButtonModal() {
    const { selectedButton, setSelectedButton } = useContext(EmergencyContext);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedMessage, setEditedMessage] = useState('');
    const [editedBgColor, setEditedBgColor] = useState('');

    // only attempt setting title, message, and bgColor if there is a selected button
    useEffect(() => {
        if (selectedButton) {
            setEditedTitle(selectedButton.title || '');
            setEditedMessage(selectedButton.message || '');
            setEditedBgColor(selectedButton.bgColor || '');
        }
    }, [selectedButton]);

    const closeModal = () => {
        setSelectedButton(null);
    }

    // Handle updating the button
    const handleEdit = () => {
        dispatch(editEmergencyButton({ buttonId: selectedButton.id, title: editedTitle, message: editedMessage, color: editedBgColor }));
        setIsEditing(false);
        closeModal()
    };

    //Handle sending notification
    const handleNotification = () => {
        Alert.alert(`Emergency button ${selectedButton.title} pressed with message: ${selectedButton.message}`)
    }

    // Handle deleting the task
    const handleDelete = () => {
        dispatch(deleteEmergencyButton({ buttonId: selectedButton.id }));
        closeModal()
    };

    if (!selectedButton) {
        return null
    }

    return (
        // visible={!!selectedButton}  makes this only visible when there is a selected button
        <Modal
            animationType="fade"
            transparent={true}
            visible={!!selectedButton}  
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View className="flex-1 justify-center items-center bg-black/50">
                    <TouchableWithoutFeedback>
                        <View className="w-72 p-6 bg-[#EDEFF7] rounded-xl items-center">
                            

                        {isEditing ? (
                            <>
                                <Text className="text-xl font-bold mb-4">Edit Emergency Button</Text>

                                <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Title</Text>
                                <TextInput
                                    value={editedTitle}
                                    onChangeText={setEditedTitle}
                                    className="border border-gray-300 p-2 mb-4 w-full"
                                />
                                
                                <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Message</Text>
                                <TextInput
                                    value={editedMessage}
                                    onChangeText={setEditedMessage}
                                    className="border border-gray-300 p-2 mb-4 w-full"
                                />

                                <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Background Color</Text>
                                <TextInput
                                    value={editedBgColor}
                                    onChangeText={setEditedBgColor}
                                    className="border border-gray-300 p-2 mb-4 w-full"
                                />
                                <Button title="Save" onPress={handleEdit} />
                                <Button title="Cancel" onPress={() => setIsEditing(false)} />
                            </>
                        ) : (
                            <>
                                <Text className="text-[#4A154B] text-xl font-bold mb-4">{selectedButton.title}</Text>
                                <Text className="text-[#4A154B] mb-2">{selectedButton.message}</Text>
                                <Button title="Send Emergency Notification" 
                                    onPress={handleNotification} 
                                />
                                <Button title="Edit" onPress={() => setIsEditing(true)} />
                                <Button title="Delete" onPress={handleDelete} />
                            </>
                        )}


                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}