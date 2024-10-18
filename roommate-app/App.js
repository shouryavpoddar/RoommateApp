import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./src/Components/Tabs";
import HomePage from "./src/HomePage/HomePage";
import Tester from "./src/HomePage/Tester";

export default function App() {

    const pagesList = [
        { name: "Home", component: HomePage },
        { name: "Settings", component: Tester },
        {}
    ];

    return (
        <Tabs pagesList={pagesList}/>
    );
}
