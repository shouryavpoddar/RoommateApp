import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './Slices/CalendarSlice';

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
        //recentActivity: recentActivityReducer   commented for now b/c still in planning, no real code written
    },
});
