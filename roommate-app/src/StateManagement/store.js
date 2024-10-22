import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './Slices/CalendarSlice';

export const store = configureStore({
    reducer: {
        calendar: calendarReducer,
    },
});
