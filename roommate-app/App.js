import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./src/Components/Tabs";
import HomePage from "./src/HomePage/HomePage";
import Tester from "./src/HomePage/Tester";
import Calender from "./src/Pages/Calander";

export default function App() {

    const pagesList = [
        { name: "Home", component: HomePage },
        { name: "Settings", component: Tester },
        {name: "Calender", component: Calender}
    ];

    return (
        <Tabs pagesList={pagesList}/>
    );
}
