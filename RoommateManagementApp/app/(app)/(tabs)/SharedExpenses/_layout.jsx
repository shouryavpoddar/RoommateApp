import {Tabs, Stack} from "expo-router";
import React, { useEffect } from 'react';
import { fetchExpensesFromDB } from '@/StateManagement/Slices/ExpensesSlice';
import { useDispatch, useSelector } from 'react-redux';



export default function SharedExpensesLayout() {
    const dispatch = useDispatch();
    const groupID = useSelector((state) => state.user.groupID);

    // Fetch tasks when the groupID is available or changes
    useEffect(() => {
        if (groupID) {
            console.log("Fetching expenses for groupID:", groupID);
            dispatch(fetchExpensesFromDB({ groupID }));
        }
        else {
            console.log("Expenses not fetched b/c no group id");
        }
    }, [groupID, dispatch]);


    return (
        <>
            <Stack screenOptions={{ presentation: 'card', headerShown: false }}>
                <Stack.Screen name="index" options={{ title: 'Shared Expenses' }} />
                <Stack.Screen name="AddExpensePage/index" options={{ title: 'Add Expenses' }} />
                <Stack.Screen name="GroupScreen/index" options={{ title: 'Group' }} />
            </Stack>
        </>
    );
}
