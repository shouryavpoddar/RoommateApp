import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AvatarComponent = ({ initials }) => {
    return (
        <View style={styles.avatarContainer}>
            <Text>{initials}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        width: 40, // Equivalent to 'w-10'
        height: 40, // Equivalent to 'h-10'
        borderRadius: 20, // Equivalent to 'rounded-full'
        backgroundColor: '#D1D5DB', // Equivalent to 'bg-gray-300'
        justifyContent: 'center', // Equivalent to 'flex justify-center'
        alignItems: 'center', // Equivalent to 'items-center'
    },
});

export default AvatarComponent;
