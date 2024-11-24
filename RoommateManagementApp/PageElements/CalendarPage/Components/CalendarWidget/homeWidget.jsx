import {Calendar} from "react-native-calendars";
import React from "react";
import {useSelector} from "react-redux";
import { View, StyleSheet } from "react-native";


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

    return (
        //Disable touch events for the calendar
        <View style={styles.container} pointerEvents="none">
            <Calendar
                style={styles.calendar}
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
                hideArrows={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // Allow the container to fill the available space
        width: "100%",
        backgroundColor: '#000',
        overflow: 'hidden', // Ensure it doesn't overflow
        borderRadius: 8, // Match the rounding of the tile
    },
    calendar: {
        flex: 1, // Make the calendar fill the available space
        backgroundColor: '#EDEFF7',
    },
});

export default CalendarWidget;
