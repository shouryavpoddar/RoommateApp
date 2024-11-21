import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

export default function FeatureTile({ bgColor, flex, text, TileComponent, onPress }) {
    return (
        <TouchableOpacity
            style={[
                styles.tile,
                { backgroundColor: bgColor || '#000', flex: flex || 1 },
                !TileComponent && styles.defaultHeight,
            ]}
            onPress={onPress}
        >
            {TileComponent ? (
                <TileComponent />
            ) : (
                <Text style={styles.text}>{text}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tile: {
        borderRadius: 8, // rounded-md
        justifyContent: 'center', // justify-center
        alignItems: 'center', // items-center
        marginHorizontal: 6, // mx-1.5
        overflow: 'hidden',
    },
    defaultHeight: {
        height: 192, // h-48 (48 * 4 = 192 in px)
    },
    text: {
        color: '#FFF', // text-white
        fontSize: 18, // text-xl
        fontWeight: 'bold', // font-bold
    },
});
