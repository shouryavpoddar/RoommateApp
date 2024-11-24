import {Tabs, Stack} from "expo-router";

export default function SharedExpensesLayout() {
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
