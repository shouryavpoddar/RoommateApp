import React, { useState } from "react";
import { Modal, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View, Text } from "react-native";

const Updates = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const onClose = () => {
        setModalVisible(false);
    };

    const onOpen = () => {
        setModalVisible(true);
    };

    return (
        <>
            <TouchableOpacity onPress={onOpen}>
                <View className="bg-blue-700 w-full p-3 rounded-lg">
                    <Text className="text-white">Click me to see updates</Text>
                </View>
            </TouchableOpacity>

            {modalVisible && (
                <Modal
                    propagateSwipe={true}
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={onClose}
                >
                    <TouchableWithoutFeedback onPress={onClose}>
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <View className="w-72 p-6 bg-gray-200 rounded-xl max-h-[80%]">
                            {/* Remove the inner TouchableWithoutFeedback to ensure scroll events are not intercepted */}
                            <ScrollView showsVerticalScrollIndicator={true}>
                                <TouchableOpacity activeOpacity={1}>
                                    <Text className="font-bold mb-3">Updates:</Text>
                                    <Text>1. Added new feature</Text>
                                    <Text>2. Fixed bug</Text>
                                    <Text>3. Added another feature</Text>
                                    <Text>4. Improved UI</Text>
                                    <Text className="font-bold mb-3">More Updates:</Text>
                                    <Text>1. Added new feature</Text>
                                    <Text>2. Fixed bug</Text>
                                    <Text>3. Added another feature</Text>
                                    <Text>4. Improved UI</Text>
                                    <Text className="font-bold mb-3">Even More Updates:</Text>
                                    <Text>1. Added new feature</Text>
                                    <Text>2. Fixed bug</Text>
                                    <Text>3. Added another feature</Text>
                                    <Text>4. Improved UI</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </>
    );
};

export default Updates;
