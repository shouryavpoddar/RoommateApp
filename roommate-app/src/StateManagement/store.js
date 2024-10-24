import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './Slices/CalendarSlice';
import userReducer from './Slices/UserSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        calendar: calendarReducer,
        //recentActivity: recentActivityReducer   commented for now b/c still in planning, no real code written
    },
});
