import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import FeatureTile from "@/PageElements/HomePage/Components/FeatureTile";
import Updates from "@/PageElements/HomePage/Components/RecentUpdates";
import CalendarWidget from "@/PageElements/CalendarPage/Components/CalendarWidget/homeWidget";
import EmergencyHomeWidget from '@/PageElements/EmergencyNotificationsPage/Components/EmergencyHomeWidget';
import ChatHomeWidget from '@/PageElements/ChatPage/Components/ChatHomeWidget'
import ExpensesWidget from '@/PageElements/ExpensesPage/Pages/FriendsPage/PageLayout/Components/ExpensesWidget'
import TaskBoardWidget from '@/PageElements/TaskBoardPage/PageLayout/Components/TaskBoardWidget';
import {useRouter} from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpensesFromDB } from '@/StateManagement/Slices/ExpensesSlice';


export default function HomePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const groupID = useSelector((state) => state.user.groupID);
    const expenses = useSelector((state) => state.expenses.expenses);


    //home page fetching if needed for widgets
    // Fetch tasks when the groupID is available or changes
    useEffect(() => {
        if (groupID && (!expenses || expenses.length === 0)) {
            console.log("Initial fetch of expenses for home page widget with groupID:", groupID);
            dispatch(fetchExpensesFromDB({ groupID }));
        }
        else {
            console.log("Expenses not fetched b/c no group id - home page");
        }
    }, [groupID, dispatch]);



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
                        bgColor="#33FF57" // green
                        text="Chat"
                        TileComponent={ChatHomeWidget}
                        onPress={() => {router.navigate('Chat')}}
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
                <View style={[styles.row, styles.mbLast]}>
                    <FeatureTile
                        flex={1}
                        bgColor="#6F42C1" // purple
                        text="Task Board"
                        TileComponent={TaskBoardWidget}
                        onPress={() => {router.navigate('TaskBoard')}}
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
    mbLast: {
        marginBottom: 40,
    }
});
