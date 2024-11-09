import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./src/Components/Tabs";
import HomePage from "./src/Pages/HomePage";
import EmergencyNotifications from "./src/Pages/EmergencyNotifications";
import Setting from "./src/Pages/Setting";
import Calendar from "./src/Pages/Calander";
import {Provider} from "react-redux";
import {store} from "./src/StateManagement/store";
import LoginPage from "./src/Pages/LoginPage";
import Chat from "./src/Pages/Chat";

export default function App() {

    const pagesList = [
        { name: "Home", component: HomePage },
        { name: "Settings", component: Setting},
        {name: "Emergency Notifications", component: EmergencyNotifications},
        {name: "Calendar", component: Calendar},
        {name:"Login", component: LoginPage},
        {name:"Chat", component: Chat}
    ];

    return (
        <Provider store={store}>
            <Tabs pagesList={pagesList}/>
        </Provider>
    );
}
