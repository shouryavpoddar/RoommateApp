import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from 'react-native-vector-icons';
import CalenderEventModal from './PageLayout/Components/CalendarEventModal';
import AddEventModal from "./PageLayout/Components/AddEventModal";

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const CalenderPage = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(getTodayDate()); // Initially set to today's date
    const [selectedTask, setSelectedTask] = useState(null);
    const [isAddEventModalVisible, setIsAddEventModalVisible] = useState(false); // State to manage add event modal

    // Initial example tasks for specific dates
    const [tasks, setTasks] = useState({
        '2024-10-17': [
            { title: 'PHYS 121 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 11:59 PM', created: "User X" },
            { title: 'PHYS 122 Labs', subtitle: 'Lab #5: COL', description: 'Complete the lab report for COL', due: 'Due at 1:59 PM', created: "User Y" },
        ],
        '2024-10-24': [
            { title: 'PHYS 122 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 1:59 PM', created: "User Y" },
        ],
    });

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    // Setup the + button in the top-right corner using navigation options
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => setIsAddEventModalVisible(true)} style={{ marginRight: 15 }}>
                    <Ionicons name="add-circle-outline" size={30} color="black" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const onCloseModal = () => {
        setSelectedTask(null); // Close the view task modal
    };

    const onAddEvent = (newEvent) => {
        // Add new event to the selected date in the tasks
        setTasks((prevTasks) => ({
            ...prevTasks,
            [selectedDate]: [...(prevTasks[selectedDate] || []), newEvent]
        }));
        setIsAddEventModalVisible(false); // Close the add event modal
    };

    // Prepare markedDates with selected and task-based dots
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
        if (selectedDate) {
            marked[selectedDate] = {
                ...marked[selectedDate], // Preserve existing dots
                selected: true,
                selectedColor: '#2BAC76', // Circle color for selected day
            };
        }

        return marked;
    };

    return (
        <View className="flex-1 bg-[#4A154B] p-4 text-[#4A154B]">
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
                onDayPress={onDayPress}
                markedDates={getMarkedDates()} // Pass marked dates with dots and selection
                markingType={'multi-dot'} // Enable multi-dot marking type
            />
            <ScrollView>
                {tasks[selectedDate] ? (
                    tasks[selectedDate].map((task, index) => (
                        <TouchableOpacity key={index} className="mt-4 bg-[#2BAC76] p-4 rounded-lg"
                                          onPress={() => setSelectedTask(task)} // Open the modal when a task is pressed
                        >
                            <Text className="font-bold text-2xl text-[#4A154B]">{task.title}</Text>
                            <Text className="text-xs text-[#4A154B]">{`${task.created}| ${task.subtitle} | ${task.due}`}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <View className="mt-4 bg-[#2BAC76] p-4 rounded-lg">
                        <Text className="text-[#4A154B]">No tasks for the selected date.</Text>
                    </View>
                )}
            </ScrollView>

            {/* Render the Modals */}
            {selectedTask && <CalenderEventModal task={selectedTask} onClose={onCloseModal} />}

            {isAddEventModalVisible && <AddEventModal onSubmit={onAddEvent} onClose={() => setIsAddEventModalVisible(false)} />}
        </View>
    );
};

export default CalenderPage;
