import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ChatScreen() {
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-[#4B225F]">
            <ScrollView className="flex-1 p-4">
                {/* Roommate's Message Bubble */}
                <View className="flex-row items-end mb-3">
                    <Image
                        className="w-10 h-10 rounded-full mr-2"
                        source={{ uri: 'https://i.pinimg.com/564x/9c/ac/dc/9cacdc207e8997bf90a3daf9c8aaca80.jpg' }}
                    />
                    <View className="max-w-3/4 bg-gray-200 p-3 rounded-lg">
                        <Text className="text-black">Going well! I’ll take care of it tomorrow 😊</Text>
                        <Text className="text-xs text-gray-500 mt-1">12:47 PM</Text>
                    </View>
                </View>

                {/* User's Message Bubble */}
                <View className="flex-row justify-end mb-3">
                    <View className="max-w-3/4 bg-[#8CC49F] p-3 rounded-lg">
                        <Text className="text-white">Hey! How’s the cleaning schedule going?</Text>
                        <Text className="text-xs text-gray-200 mt-1">12:55 PM</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Message Input */}
            <View className="flex-row items-center px-4 py-2 bg-[#8A7191] mb-2 mx-4 rounded-full">
                <TextInput
                    className="flex-1 h-10 px-4 text-white bg-transparent rounded-full"
                    placeholder="Type a message..."
                    placeholderTextColor="#FFFFFF"
                    value={message}
                    onChangeText={setMessage}
                />
                <TouchableOpacity className="ml-2 px-4 py-2 bg-[#4B225F] rounded-full" onPress={() => setMessage('')}>
                    <Text className="text-white font-bold">Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
