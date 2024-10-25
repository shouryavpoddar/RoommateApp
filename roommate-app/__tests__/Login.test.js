import React from 'react';
import { Text} from 'react-native';
import { render, screen, fireEvent } from '@testing-library/react-native';
import LoginPage from '../src/Pages/LoginPage';
import HomePage from '../src/Pages/HomePage'
import { Provider } from 'react-redux';
import { store } from '../src/StateManagement/store'
import { NavigationContainer } from '@react-navigation/native';
import { createStore } from 'redux';
import Tabs from '../src/Components/Tabs';
import { initialState, rootReducer } from '../src/StateManagement/store'; // Import your initial state and rootReducer


//A file for testing the functionality of the login page

//describe is used to create a block of tests for organization purposes - can describe multiple things in one file
describe('LoginPage', () => {
    //Rendering Tests - test renders correctly with username and password input fields, login button
    test('renders LoginPage with input fields and login button', () => {
        render(
            //make sure to provide the store context to the page when rendering
            <Provider store={store}> 
                <LoginPage />
            </Provider> 
        );
        expect(screen.getByPlaceholderText("Enter your username")).toBeTruthy();    //NOTE - finding element based on its EXACT placeholder text
        expect(screen.getByPlaceholderText("Enter your password")).toBeTruthy();
        expect(screen.getByText("Login")).toBeTruthy();
    })


    // Mock a Redux store for testing
    const mockStore = (overrides) => {
        return createStore((state = initialState, action) => {
            return {
                ...state,
                ...overrides, // Override the initial state for the test
            };
        });
    };

    //Input Tests - test that login button works under correct conditions
    test('navigates to HomePage when login pressed if inputs filled', () => {
        const testStore = mockStore({ user: { id: null } }); // Simulate not logged in

        const { getByPlaceholderText, getByText, queryByText } = render(
            <Provider store={store}>
                <Tabs pagesList={[{ name: "Login", component: LoginPage }, { name: "Home", component: HomePage }]} />
            </Provider>
        );

        const usernameInput = screen.getByPlaceholderText("Enter your username");
        const passwordInput = screen.getByPlaceholderText("Enter your password");
        const loginButton = screen.getByText("Login"); // Use getByText to find the button

        //simulate entering username and password
        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'password123');

        //simulate pressing the login button
        fireEvent.press(loginButton);

        //Assert that LoginPage is no longer rendered
        expect(screen.queryByText('Login')).toBeNull(); // Ensure Login button is gone
        expect(screen.queryByPlaceholderText('Enter your username')).toBeNull(); // Ensure username input is gone
        expect(screen.queryByPlaceholderText('Enter your password')).toBeNull(); // Ensure password input is gone

        // Check that Home Page is now rendered
        // Check that the text "Home" is present, and there are the correct number of instances
        const homeElements = screen.getAllByText('Home');
        expect(homeElements).toHaveLength(2); // Ensure there's exactly one
    })
})
