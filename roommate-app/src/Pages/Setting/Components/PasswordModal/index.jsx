import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity } from 'react-native';
import { SettingsContext } from '../../Context';

export default function PasswordModal() {
    const { isPasswordModalVisible, setIsPasswordModalVisible } = useContext(SettingsContext);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSave = () => {
        if (password === confirmPassword) {
            // Handle password change logic
            setIsPasswordModalVisible(false);
        } else {
            alert('Passwords do not match');
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isPasswordModalVisible}
            onRequestClose={() => setIsPasswordModalVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <View className="bg-white p-6 rounded-lg w-11/12 max-w-md">
                    <TouchableOpacity className="absolute top-2 right-2" onPress={() => setIsPasswordModalVisible(false)}>
                        <Text className="text-xl font-bold">×</Text>
                    </TouchableOpacity>
                    <Text className="text-xl font-bold mb-4">Change Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="New Password"
                        className="border border-gray-300 p-2 mb-4 w-full"
                        secureTextEntry
                    />
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm Password"
                        className="border border-gray-300 p-2 mb-4 w-full"
                        secureTextEntry
                    />
                    <Button title="Save" onPress={handleSave} />
                </View>
            </View>
        </Modal>
    );
}
