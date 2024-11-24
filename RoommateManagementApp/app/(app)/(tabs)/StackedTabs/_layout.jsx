import {Tabs, Stack} from "expo-router";

export default function TestStackedLayout() {
    return (
        <>
            <Stack screenOptions={{ presentation: 'card', headerShown: false }}>
                <Stack.Screen name="index" options={{ title: 'MainPage' }} />
                <Stack.Screen name="Page1/index" options={{ title: 'Page1' }} />
                <Stack.Screen name="Page2/index" options={{ title: 'Page1' }} />
            </Stack>
        </>
    );
}
