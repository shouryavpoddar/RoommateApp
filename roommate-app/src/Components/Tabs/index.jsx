import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

const Tabs = ({ pagesList }) => {
    const Tab = createBottomTabNavigator();

    return (
        <NavigationContainer>
            <Tab.Navigator>
                {pagesList.map((page, index) => (
                    <Tab.Screen
                        key={index} // Ensure each screen has a unique key
                        name={page.name}
                        component={page.component}
                    />
                ))}
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Tabs;
