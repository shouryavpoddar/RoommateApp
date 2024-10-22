import React from 'react';
import {Modal, View, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';

const CalenderEventModal = ({ task, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={task !== null}// Handle closing for Android back button
        >
            {/* Detect touch outside the modal */}
            <TouchableWithoutFeedback onPress={onClose}>
            <View style={{ flex: 1 }}>
                {/* Inner content */}
                <View className="flex-1 justify-center items-center bg-black/50">
                    <TouchableWithoutFeedback>
                        <View className="w-fit p-6 bg-[#EDEFF7] rounded-xl items-center">
                            <Text className="text-[#4A154B] text-xl font-bold mb-4">{task.title}</Text>
                            <Text className="text-[#4A154B] mb-2">{task.description}</Text>
                            <Text className="text-[#4A154B] mb-4">{task.due}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default CalenderEventModal;
