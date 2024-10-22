import React, { useState } from 'react';
import {Modal, View, Text, TextInput, Button, TouchableWithoutFeedback} from 'react-native';

const AddEventModal = ({ onSubmit, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due, setDue] = useState('');

    const handleSubmit = () => {
        const newEvent = {
            title,
            description,
            due,
            created: 'User X', // Static for now; can be dynamic
        };
        onSubmit(newEvent);
    };

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
                        <Text className="text-xl font-bold mb-4">Add Event</Text>

                        {/* Title Field */}
                        <Text className="text-base text-[#4A154B] text-left font-semibold mb-2  w-full">Title</Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />

                        {/* Description Field */}
                        <Text className="text-base text-[#4A154B] text-left font-semibold mb-2  w-full">Description</Text>
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />

                        {/* Due Time Field */}
                        <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Due Time</Text>
                        <TextInput
                            value={due}
                            onChangeText={setDue}
                            className="border border-gray-300 p-2 mb-4 w-full"
                        />

                        <Button title="Add" onPress={handleSubmit} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
            </TouchableWithoutFeedback>
        </Modal>

    );
};

export default AddEventModal;
