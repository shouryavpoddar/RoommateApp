// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/StateManagement/store';
import Tabs from "./src/Components/Tabs";
import HomePage from "./src/Pages/HomePage";
import Setting from "./src/Pages/Setting";
import Calendar from "./src/Pages/Calander";
import LoginPage from "./src/Pages/LoginPage";
import Chat from "./src/Pages/Chat";
import SignUpPage from "./src/Pages/SignUpPage";

export default function App() {
    const pagesList = [
        { name: "Home", component: HomePage },
        { name: "Settings", component: Setting },
        { name: "Calendar", component: Calendar },
        { name: "Login", component: LoginPage },
        { name: "Chat", component: Chat },
    ];

    return (
        <Provider store={store}>
            <Tabs pagesList={pagesList} />
        </Provider>
    );
}
