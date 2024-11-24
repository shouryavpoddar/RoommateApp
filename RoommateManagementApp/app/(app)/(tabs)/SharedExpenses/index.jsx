import React, { useEffect, useLayoutEffect } from 'react';
import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ExpensesWiget from "@/PageElements/ExpensesPage/Pages/FriendsPage/PageLayout/Components/ExpensesWidget";
import Layout from "@/PageElements/ExpensesPage/Pages/FriendsPage/PageLayout";
import renderFriend from "@/PageElements/ExpensesPage/Pages/FriendsPage/PageLayout/Components/FriendTile";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";

const FriendsScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();
    const friends = useSelector((state) => state.expenses.friends);
    const expenses = useSelector((state) => state.expenses.expenses);

    // Update headerRight button in the parent navigation
    useEffect(() => {
        const parentNavigation = navigation.getParent();  // Get the parent navigation

        if (parentNavigation) {
            console.log("Has Parent Navigation");
            parentNavigation.setOptions({
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => router.push("SharedExpenses/AddExpensePage")}
                        style={styles.headerButton}
                        testID='add-expense-button'
                    >
                        <Ionicons name="add-circle-outline" size={30} color="black" />
                    </TouchableOpacity>
                ),
            });
        } else {
            console.log("No parent navigation");
        }

        // Cleanup headerRight when the component unmounts or updates
        const unsubscribe = () => {
            if (parentNavigation) {
                parentNavigation.setOptions({
                    headerRight: null,
                });
            }
        };

        return unsubscribe;
    }, [navigation, router]);

    // Map expenses to each friend
    const friendsWithBalances = friends.map((friend) => {
        const friendExpenses = expenses.filter((expense) => expense.friendId === friend.id);
        const balance = friendExpenses.reduce(
            (total, expense) => total + (expense.type === 'lent' ? expense.amount : -expense.amount),
            0
        );
        return {
            ...friend,
            balance: balance.toFixed(2),
            transactions: friendExpenses,
        };
    });

    const handlePress = (item) => {
        router.push({
        pathname: '/SharedExpenses/GroupScreen',
        params: { name: item.name, friendId: item.id },
        });
    };

    return (
        <Layout testID='expenses-friends-page'>
            <ExpensesWiget />
            <FlatList
                data={friendsWithBalances}
                keyExtractor={(item) => item.id.toString()} // Ensure unique keys
                renderItem={({ item }) => renderFriend({ item, onPress: handlePress })}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginRight: 15,
    },
});

export default FriendsScreen;
