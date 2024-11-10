import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { SettingsContext } from '../../Context';

export default function ProfileModal() {
    const { isProfileModalVisible, setIsProfileModalVisible } = useContext(SettingsContext);
    const [name, setName] = useState('');

    const handleSave = () => {
        // Handle save logic
        setIsProfileModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isProfileModalVisible}
            onRequestClose={() => setIsProfileModalVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white p-6 rounded-lg w-11/12 max-w-md">
                    <TouchableOpacity className="absolute top-2 right-2" onPress={() => setIsProfileModalVisible(false)}>
                        <Text className="text-xl font-bold">×</Text>
                    </TouchableOpacity>
                    <Text className="text-xl font-bold mb-4">Edit Profile</Text>
                    <Text className="text-base font-semibold mb-2">Change Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        className="border border-gray-300 p-2 mb-4 w-full"
                    />
                    <Button title="Change Profile Picture" onPress={() => { /* Handle profile picture change */ }} />
                    <Button title="Save" onPress={handleSave} />
                </View>
            </View>
        </Modal>
    );
}
