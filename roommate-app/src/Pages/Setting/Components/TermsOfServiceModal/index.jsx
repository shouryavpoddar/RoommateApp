import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TermsOfServiceModal({ isVisible, onClose }) {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-[#EDEFF7] p-6 rounded-xl items-center relative">
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} className="absolute top-4 right-4">
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold mb-4">Terms of Service</Text>
                    <ScrollView className="w-full">
                        <Text className="text-[#4A154B] mb-2 leading-7"> {/* Add leading-7 for extra line spacing */}
                            By using the Roommate Management App, you agree to follow community guidelines, respect others' privacy, and use the app in a manner that is safe and considerate for all users. Users are responsible for managing their shared tasks, finances, and communication within the platform. The app is provided as-is without any guarantees.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
