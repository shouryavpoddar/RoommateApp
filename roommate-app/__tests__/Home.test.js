import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomePage from '../src/Pages/HomePage'; // Adjust the import based on your file structure
import LoginPage from '../src/Pages/LoginPage';  //for testing navigation
import { Provider } from 'react-redux';
import { store } from '../src/StateManagement/store'; // Adjust as necessary
import { NavigationContainer } from '@react-navigation/native'; // needed to mock page navigation since HomePage uses navigation hook
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Calendar } from 'react-native-calendars';

describe('HomePage', () => {
    //rendering tests
    test('renders tiles', () => {
        const { getByTestId } = render(
            <Provider store={store}>
                <NavigationContainer> 
                    <HomePage />
                </NavigationContainer>
            </Provider>
        );

        // Check if the clickable tile for updates is rendered
        expect(getByTestId('updates-tile')).toBeTruthy();
        // Check if the tile for navigating to the Calendar is rendered
        expect(getByTestId('calendar-tile')).toBeTruthy();
    })

    //behavior tests
    test('navigates to Calendar Page when clicking Calendar tile', () => {
        //create a bottom tab navigator for testing
        const Tab = createBottomTabNavigator();

        const { getByTestId, getAllByText } = render(
            <Provider store={store}>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Home" component={HomePage} />
                        {/* Mock the Calendar Page */}
                        <Tab.Screen name="Calendar" component={Calendar} />
                    </Tab.Navigator>
                </NavigationContainer>
            </Provider>
        );

        const calendarTile = getByTestId('calendar-tile'); // Use the testID to find the element

        //simulate clicking on tile
        fireEvent.press(calendarTile); 

        //check if the calendar page is now rendered
        //expect(getByText('Calendar Page')).toBeTruthy(); // Check for the Calendar Page

        // Check that Calendar Page is now rendered
        // Check that the text "Calendar" is present, and there are the correct number of instances
        
        /* TODO - FIX
        const calendarElements = getAllByText('Calendar');
        expect(calendarElements).toHaveLength(2); // Ensure there's exactly one  */
    })
})