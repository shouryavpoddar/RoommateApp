import {Tabs, Stack} from "expo-router";

export default function TabLayout() {
    return (
        <>
            <Tabs>
                <Tabs.Screen name="index" options={{ title: 'Home' }} />
                <Tabs.Screen name="Settings/index" options={{ title: 'Settings'}} />
                <Tabs.Screen name="Calendar/index" options={{ title: 'Calendar' }} />
                <Tabs.Screen name="Chat/index" options={{ title: 'Chat' }} />
                <Tabs.Screen name="EmergencyNotifications/index" options={{ title: 'Emergency Notifications' }} />
                <Tabs.Screen name="SharedExpenses" options={{ title: 'Shared Expenses' }} />
                <Tabs.Screen name="TaskBoard" options={{ title: 'Task Board' }} />
            </Tabs>
        </>
    );
}
