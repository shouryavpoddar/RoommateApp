import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./src/Components/Tabs";
import HomePage from "./src/Pages/HomePage";
import Tester from "./src/Pages/HomePage/Components/Tester";
import Calendar from "./src/Pages/Calander";
import {Provider} from "react-redux";
import {store} from "./src/StateManagement/store";

export default function App() {

    const pagesList = [
        { name: "Home", component: HomePage },
        { name: "Settings", component: Tester },
        {name: "Calendar", component: Calendar}
    ];

    return (
        <Provider store={store}>
            <Tabs pagesList={pagesList}/>
        </Provider>
    );
}
