import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";

const Tabs = ({ pagesList }) => {
    const Tab = createBottomTabNavigator();
    const { id } = useSelector((state) => state.user); // Grab the user's ID from the Redux store

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
            <Tab.Navigator>
                {pagesList
                    .filter((page) => page.name !== "Login") // Exclude the Login page if the user is logged in
                    .map((page, index) => (
                        <Tab.Screen
                            key={page.name || `page-${index}`} // Ensure each screen has a unique key
                            name={page.name}
                            component={page.component}
                            options={{ tabBarLabel: page.name }} // Optional tab label for better UX
                        />
                    ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Tabs;
