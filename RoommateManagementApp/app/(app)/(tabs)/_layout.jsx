import { Tabs } from 'expo-router';
import { Ionicons } from 'react-native-vector-icons'; // Use Ionicons icons

const tabOptions = {
  tabBarStyle: {
    backgroundColor: '#75597B', // Tab bar background color
    borderTopWidth: 0,
  },
  tabBarLabelStyle: {
    color: '#FFFFFF', // Tab label color
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBarActiveTintColor: '#FFFFFF', // Active tab color
  tabBarInactiveTintColor: '#D3D3D3', // Inactive tab color
  headerStyle: {
    backgroundColor: '#75597B', // Header background color
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTintColor: '#FFFFFF', // Header title color
  headerTitleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitleAlign: 'left', // Align header title to the left
};

const tabScreens = [
  { name: 'index', title: 'Home', icon: 'home-outline' },
  { name: 'Settings/index', title: 'Settings', icon: 'settings-outline' },
  { name: 'Calendar/index', title: 'Calendar', icon: 'calendar-outline' },
  { name: 'Chat/index', title: 'Chat', icon: 'chatbubble-outline' },
  { name: 'EmergencyNotifications/index', title: 'Emergency', icon: 'warning-outline' },
  { name: 'SharedExpenses', title: 'Expenses', icon: 'cash-outline' },
  { name: 'TaskBoard', title: 'Task', icon: 'list-outline' },
];

export default function TabLayout() {
  return (
    <Tabs>
      {tabScreens.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => <Ionicons name={icon} size={20} color={color} />,
            ...tabOptions, // Spread the common options here
          }}
        />
      ))}
    </Tabs>
  );
}
