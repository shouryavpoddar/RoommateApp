import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../../StateManagement/Slices/UserSlice';
import ProfileModal from './Components/ProfileModal';
import PasswordModal from './Components/PasswordModal';
import { SettingsContext, SettingsProvider } from './Context';

function SettingsScreenContent() {
    const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
    const dispatch = useDispatch();
    const { isProfileModalVisible, setIsProfileModalVisible, isPasswordModalVisible, setIsPasswordModalVisible } = useContext(SettingsContext);

    const handleLogout = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Log Out", onPress: () => dispatch(logout()) }
            ]
        );
    };

    return (
        <View className="flex-1 bg-[#4B225F]">
            <ScrollView className="p-4">
                <View className="mb-4 bg-white p-4 rounded-lg shadow">
                    <Text className="text-lg font-semibold mb-2">Account</Text>
                    <TouchableOpacity className="py-2 border-b border-gray-200" onPress={() => setIsProfileModalVisible(true)}>
                        <Text className="text-gray-800">Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-2 border-b border-gray-200" onPress={() => setIsPasswordModalVisible(true)}>
                        <Text className="text-gray-800">Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleLogout} className="py-2">
                        <Text className="text-red-500">Log Out</Text>
                    </TouchableOpacity>
                </View>

                <View className="mb-4 bg-white p-4 rounded-lg shadow">
                    <Text className="text-lg font-semibold mb-2">Notifications</Text>
                    <View className="flex-row justify-between items-center py-2">
                        <Text className="text-gray-800">Enable Notifications</Text>
                        <Switch
                            value={isNotificationsEnabled}
                            onValueChange={() => setNotificationsEnabled(!isNotificationsEnabled)}
                        />
                    </View>
                </View>

                <View className="bg-white p-4 rounded-lg shadow">
                    <Text className="text-lg font-semibold mb-2">About</Text>
                    <TouchableOpacity className="py-2 border-b border-gray-200">
                        <Text className="text-gray-800">Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-2 border-b border-gray-200">
                        <Text className="text-gray-800">Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-2">
                        <Text className="text-gray-800">App Version: 1.0.0</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <ProfileModal />
            <PasswordModal />
        </View>
    );
}

// Wrap SettingsScreenContent in the SettingsProvider
export default function SettingsScreen() {
    return (
        <SettingsProvider>
            <SettingsScreenContent />
        </SettingsProvider>
    );
}
