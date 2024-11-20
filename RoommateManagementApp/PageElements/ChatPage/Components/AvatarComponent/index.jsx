import React from 'react';
import { View, Text } from 'react-native';

const AvatarComponent = ({ initials }) => {
    return (
        <View className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <Text>{initials}</Text>
        </View>
    );
};

export default AvatarComponent;