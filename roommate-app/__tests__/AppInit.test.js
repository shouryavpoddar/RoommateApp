import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App'; 

//File for testing that app operates as expected when first opening

//SAMPLE TEST - tests that login page is rendered upon opening the app
//Syntax explanation: test(string description, callback function of code to test)
test('renders correctly', () => {
    //renders the App component and returns several query functions which can be used to find elements in rendered output
    //this allows you to select elements by their text context
    const { getByText } = render(<App />);    //NOTE - we render the entire component tree rooted at this component - so rendering this basically renders the whole app

    //the assertion
    //getByText('text-here') tries to find an element in rendered output that contains the specified text
    //if element is found, it returns that element, otherwise, it throws an error
    //if text was successfully found, it will be truthy, so it will return true
    expect(getByText('Welcome to Roommate App')).toBeTruthy();
});
