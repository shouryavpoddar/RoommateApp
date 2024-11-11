import React from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PrivacyPolicyModal({ isVisible, onClose }) {
    return (
        <Modal visible={isVisible} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className="w-4/5 bg-[#EDEFF7] p-6 rounded-xl items-center relative">
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} className="absolute top-4 right-4">
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold mb-4">Privacy Policy</Text>
                    <ScrollView className="w-full">
                        <Text className="text-[#4A154B] mb-2 leading-7"> {/* Add leading-7 for extra line spacing */}
                            We respect your privacy. The Roommate Management App collects only necessary data to improve user experience, such as task assignments, financial records, and messages. Personal data will not be shared with third parties without your consent. We prioritize data security and provide tools for users to manage their data within the app.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
