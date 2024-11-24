import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FeatureTile from "@/PageElements/HomePage/Components/FeatureTile";
import {router} from "expo-router";

export default function MainPage() {

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>

                {/* Row 2: Two short tiles side by side */}
                <View style={[styles.row, styles.mb]}>
                    <FeatureTile
                        flex={1}
                        bgColor="#28A745" // green
                        text="Page1"
                        onPress={() => {router.push('StackedTabs/Page1')}}
                    />
                    <FeatureTile
                        flex={1}
                        bgColor="#FF5733" // red
                        text="Page2"
                        onPress={() => {router.push('StackedTabs/Page2')}}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B225F', // background color of the container
    },
    scrollView: {
        padding: 16, // p-4 in Tailwind
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    mb: {
        marginBottom: 12, // mb-3 in Tailwind
    },
});
