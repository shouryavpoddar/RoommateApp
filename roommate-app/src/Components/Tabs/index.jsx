import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons'; // Import icons here

const Tabs = ({ pagesList }) => {
    const Tab = createBottomTabNavigator();
    const { id } = useSelector((state) => state.user);

    if (!id) {
        const LoginPage = pagesList.find(page => page.name === "Login").component;
        return (
            <NavigationContainer>
                <LoginPage />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerStyle: {
                        backgroundColor: '#75597B', // Dark purple header background
                        borderBottomWidth: 0,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: '#FFFFFF',
                    headerTitleStyle: { fontSize: 24, fontWeight: 'bold' },
                    headerTitleAlign: 'left',
                    tabBarStyle: {
                        backgroundColor: '#75597B', // Dark purple footer background
                        borderTopWidth: 0,
                    },
                    tabBarLabelStyle: {
                        color: '#FFFFFF', // Footer text in white
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                    tabBarIcon: ({ color }) => {
                        // Set different icons based on route name with a fixed size
                        const iconSize = 20; // Adjust the icon size here
                        if (route.name === 'Home') {
                            return <MaterialIcons name="home" size={iconSize} color={color} />;
                        } else if (route.name === 'Settings') {
                            return <FontAwesome5 name="cog" size={iconSize} color={color} />;
                        } else if (route.name === 'Calendar') {
                            return <Entypo name="calendar" size={iconSize} color={color} />;
                        } else if (route.name === 'Chat') {
                            return <FontAwesome5 name="comments" size={iconSize} color={color} />;
                        }
                        return null;
                    },
                    tabBarActiveTintColor: '#FFFFFF',
                    tabBarInactiveTintColor: '#D3D3D3', // Adjust inactive color if needed
                })}
            >
                {pagesList
                    .filter((page) => page.name !== "Login")
                    .map((page, index) => (
                        <Tab.Screen
                            key={page.name || `page-${index}`}
                            name={page.name}
                            component={page.component}
                            options={{
                                tabBarLabel: page.name,
                            }}
                        />
                    ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Tabs;
