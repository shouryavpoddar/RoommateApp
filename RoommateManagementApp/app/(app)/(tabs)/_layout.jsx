import {Tabs} from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: 'Home' }} />
            <Tabs.Screen name="Calendar/index" options={{ title: 'Calendar' }} />
            <Tabs.Screen name="Chat/index" options={{ title: 'Chat' }} />
            <Tabs.Screen name="EmergencyNotifications/index" options={{ title: 'Emergency Notifications' }} />
        </Tabs>
    );
}
