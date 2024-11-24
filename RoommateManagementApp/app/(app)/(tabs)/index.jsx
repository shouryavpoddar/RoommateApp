import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FeatureTile from "@/PageElements/HomePage/Components/FeatureTile";
import Updates from "@/PageElements/HomePage/Components/RecentUpdates";
import CalendarWidget from "@/PageElements/CalendarPage/Components/CalendarWidget/homeWidget";
import EmergencyHomeWidget from '@/PageElements/EmergencyNotificationsPage/Components/EmergencyHomeWidget';
import ExpensesWidget from '@/PageElements/ExpensesPage/Pages/FriendsPage/PageLayout/Components/ExpensesWidget'
import {useRouter} from "expo-router";

export default function HomePage() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Row 1: wide container for recent updates */}
                <View style={[styles.row, styles.mb]}>
                    <FeatureTile
                        flex={1}
                        bgColor="#007BFF" // blue
                        text="Recent Updates"
                        TileComponent={Updates}
                        onPress={() => console.log('Should make it so no function pass needed :/')}
                    />
                </View>

                {/* Row 2: Two short tiles side by side */}
                <View style={[styles.row, styles.mb]}>
                    <FeatureTile
                        flex={1}
                        bgColor="#28A745" // green
                        text="Tall Tile 1"
                        TileComponent={EmergencyHomeWidget}
                        onPress={() => {router.navigate('EmergencyNotifications')}}
                    />
                    <FeatureTile
                        flex={1}
                        bgColor="#FF5733" // red
                        text="Tall Tile 2"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
                    />
                </View>

                {/* Row 3: Calendar widget */}
                <View style={[styles.row, styles.mb]}>
                    <FeatureTile
                        flex={1}
                        bgColor="#007BFF" // blue
                        text="Wide Tile - Full Width"
                        TileComponent={CalendarWidget}
                        onPress={() => {router.navigate('Calendar')}}
                    />
                </View>

                {/* Row 4: Expenses widget */}
                <View style={[styles.row, styles.mb]}>
                    <FeatureTile
                        flex={1}
                        bgColor="#007BFF" // blue
                        text="Wide Tile - Full Width"
                        TileComponent={ExpensesWidget}
                        onPress={() => {router.navigate('SharedExpenses')}}
                    />
                </View>

                {/* Row 4: Two tiles, one 2/3 width, the other 1/3 */}
                <View style={[styles.row, styles.mb]}>
                    <FeatureTile
                        flex={2}
                        bgColor="#6F42C1" // purple
                        text="2/3 Width Tile"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
                    />
                    <FeatureTile
                        flex={1}
                        bgColor="#FFC107" // yellow
                        text="1/3 Width Tile"
                        onPress={() => console.log('Change me to navigation to go to a page!')}
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
