import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './Slices/CalendarSlice';
import userReducer from './Slices/UserSlice';
import emergencyReducer from './Slices/EmergencyButtonSlice'
import ExpensesReducer  from "./Slices/ExpensesSlice";
import taskBoardReducer from './Slices/TaskBoardSlice'; // Import TaskBoardSlice

//store configuration
export const store = configureStore({
    reducer: {
        user: userReducer,
        calendar: calendarReducer,
        emergency: emergencyReducer,
        expenses: ExpensesReducer,
        taskBoard: taskBoardReducer,
    },
});
