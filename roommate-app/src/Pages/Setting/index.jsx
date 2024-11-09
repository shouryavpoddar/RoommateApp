import React from 'react';
import { View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';

export default function SettingsScreen() {
    const [isNotificationsEnabled, setNotificationsEnabled] = React.useState(true);
    const [isDarkThemeEnabled, setDarkThemeEnabled] = React.useState(false);

    return (
        <View className="flex-1 bg-[#4B225F]">
            <ScrollView className="p-4">
                {/* Account Section */}
                <View className="mb-4 bg-white p-4 rounded-lg shadow">
                    <Text className="text-lg font-semibold mb-2">Account</Text>
                    <TouchableOpacity className="py-2 border-b border-gray-200">
                        <Text className="text-gray-800">Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-2 border-b border-gray-200">
                        <Text className="text-gray-800">Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="py-2">
                        <Text className="text-red-500">Log Out</Text>
                    </TouchableOpacity>
                </View>

                {/* Notifications Section */}
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



                {/* About Section */}
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
        </View>
    );
}
