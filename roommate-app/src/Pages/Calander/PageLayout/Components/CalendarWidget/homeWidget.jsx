import {Calendar} from "react-native-calendars";
import React from "react";
import {useSelector} from "react-redux";


const CalendarWidget = ()=>{
    const {tasks} = useSelector(state => state.calendar);

    const getMarkedDates = () => {
        const marked = {};

        // Mark dates with tasks and show up to 4 dots
        Object.keys(tasks).forEach(date => {
            const dots = tasks[date].slice(0, 4).map((_, i) => ({
                key: `dot-${i}`,
                color: '#4A154B', // Dot color for tasks
            }));

            marked[date] = {
                dots, // Add dots for dates with tasks
                ...(marked[date] || {}),
            };
        });

        // Highlight the selected date with a circle but preserve the dots

        return marked;
    };

    return(
        <Calendar
            style={{ backgroundColor: '#EDEFF7', borderRadius: 10, marginBottom: 10 }}
            theme={{
                calendarBackground: '#EDEFF7',
                textSectionTitleColor: '#2BAC76',
                selectedDayBackgroundColor: '#2BAC76',
                selectedDayTextColor: '#FFFFFF',
                todayTextColor: '#2BAC76',
                dayTextColor: '#4A154B',
                arrowColor: '#4A154B',
                monthTextColor: '#4A154B',
                textDisabledColor: '#D0D1D2',
                dotColor: '#4A154B',
                selectedDotColor: '#4A154B',
            }}
            markedDates={getMarkedDates()} // Pass marked dates with dots and selection
            markingType={'multi-dot'} // Enable multi-dot marking type
        />
    )
}

export default CalendarWidget;
