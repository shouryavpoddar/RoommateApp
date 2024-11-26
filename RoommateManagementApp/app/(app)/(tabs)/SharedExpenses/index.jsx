import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import ExpensesWiget from "@/PageElements/ExpensesPage/Pages/FriendsPage/PageLayout/Components/ExpensesWidget";
import Layout from "@/PageElements/ExpensesPage/Pages/FriendsPage/PageLayout";
import renderFriend from "@/PageElements/ExpensesPage/Pages/FriendsPage/PageLayout/Components/FriendTile";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";

const FriendsScreen = () => {
    const navigation = useNavigation();
    const router = useRouter();

    // Redux state for current user, friends, and expenses
    const currentUser = useSelector((state) => state.user.id); // Current user's ID
    const friends = useSelector((state) => state.user.roommates); // Friends list
    const expenses = useSelector((state) => state.expenses.expenses); // Expenses list
    const loading = useSelector((state) => state.expenses.loading);
    const error = useSelector((state) => state.expenses.error);

    // Update headerRight button in the parent navigation
    useEffect(() => {
        const parentNavigation = navigation.getParent();
        if (parentNavigation) {
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
        }

        return () => {
            if (parentNavigation) {
                parentNavigation.setOptions({ headerRight: null });
            }
        };
    }, [navigation, router]);

    if (loading) return <Layout><Text>Loading tasks...</Text></Layout>;
    if (error) return <Layout><Text>Error: {error}</Text></Layout>;

    // Filter expenses involving the current user
    const filteredExpenses = expenses.filter(
        (expense) => expense.OwedTo === currentUser || expense.OwedBy === currentUser
    );

    // Map expenses to each friend
    const friendsWithBalances = friends.map((friend) => {
        const friendExpenses = filteredExpenses.filter(
            (expense) =>
                expense.OwedTo === friend.id || expense.OwedBy === friend.id
        );

        const balance = friendExpenses.reduce((total, expense) => {
            if (expense.OwedTo === friend.id) {
                return total - expense.amount; // You owe them
            } else if (expense.OwedBy === friend.id) {
                return total + expense.amount; // They owe you
            }
            return total;
        }, 0);

        return {
            ...friend,
            balance: balance.toFixed(2),
            transactions: friendExpenses.map((expense) => ({
                ...expense,
                type: expense.OwedBy === friend.id ? 'lent' : 'borrowed',
            })),
        };
    }).filter(friend => friend.transactions.length > 0); // Remove friends with no relevant transactions

    const handlePress = (item) => {
        router.push({
            pathname: '/SharedExpenses/GroupScreen',
            params: { name: item.username, friendId: item.id },
        });
    };

    return (
        <Layout testID='expenses-friends-page'>
            <View style={styles.expenseWidgetWrapper}>
                <ExpensesWiget />
            </View>
            <FlatList
                data={friendsWithBalances}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => renderFriend({ item, onPress: handlePress })}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    headerButton: {
        marginRight: 15,
    },
    expenseWidgetWrapper: {
        marginBottom: 15,
    },
});

export default FriendsScreen;
