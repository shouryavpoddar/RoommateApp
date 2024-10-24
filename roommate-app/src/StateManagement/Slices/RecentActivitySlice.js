import { createSlice } from '@reduxjs/toolkit';
import uuid from "react-native-uuid";

//Initial state with example recent activities 
//      - NOTE activity is not updating dynamically yet, so it will stay like this for now
const initialState = {
    //an entry would probably entail details like: App section (ex calendar, shared expenses), From (user), timestamp, 
                                                 // and what happened (ex added task called "get milk")
};


//idea is that RecentActivity can pull the first like 3 of these to show in the RecentActivity widget
 //clicking on it could show the scrollable list of the most recent in like the past 48 hrs or smthn...
const recentActivitySlice = createSlice({
    name: 'recentActivity',
    initialState,
    reducers: {
        //add activity - an activity item would be added whenever something new happens

        //remove activity - maybe if it times out or smthn - not sure if we want them to be removed...
    }
})