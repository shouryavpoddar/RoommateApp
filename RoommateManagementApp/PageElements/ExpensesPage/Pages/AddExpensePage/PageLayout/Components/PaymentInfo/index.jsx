import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

const PaymentInfo = ({ splitType, onPressSplit }) => (
    <View style={styles.container}>
        <Text style={styles.textGray}>Paid by</Text>
        <TouchableOpacity style={styles.touchable}>
            <Text style={styles.touchableText}>you</Text>
        </TouchableOpacity>
        <Text style={styles.textGray}>and split</Text>
        <TouchableOpacity style={styles.touchable} onPress={onPressSplit}>
            <Text style={styles.touchableText}>{splitType}</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // flex-row
        width: '100%', // w-full
        alignItems: 'center', // items-center
        marginTop: 24, // mt-6
        gap: 8, // space-x-2 (Note: gap needs manual implementation)
    },
    textGray: {
        color: '#9E9E9E', // text-gray-500
    },
    touchable: {
        backgroundColor: '#F5F5F5', // bg-gray-100
        paddingHorizontal: 12, // px-3
        paddingVertical: 4, // py-1
        borderRadius: 8, // rounded-md
    },
    touchableText: {
        color: '#4A154B', // text-[#4A154B]
        fontWeight: 'bold', // font-bold
    },
});

export default PaymentInfo;
