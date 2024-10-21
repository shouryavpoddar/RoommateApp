import React, { useState } from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styled } from 'nativewind';

const CalenderPage = () => {
    const [selectedDate, setSelectedDate] = useState('');

    // Example task for a specific date
    const tasks = {
        '2024-10-17': [{ title: 'PHYS 121 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 11:59 PM', created: "User X" },
            { title: 'PHYS 122 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 13:59', created: "User X" },
            { title: 'PHYS 123 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 13:59', created: "User X" },
            { title: 'PHYS 124 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 13:59', created: "User X" },
        ],
    };

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    return (
        <View className="flex-1 bg-[#4A154B] p-4">
            <Calendar
                style={{ backgroundColor: '#EDEFF7', borderRadius: 10, marginBottom: 10 }}
                theme={{
                    calendarBackground: '#EDEFF7',
                    textSectionTitleColor: '#4A154B',
                    selectedDayBackgroundColor: '#1264A3',
                    selectedDayTextColor: '#FFFFFF',
                    todayTextColor: '#2BAC76',
                    dayTextColor: '#4A154B',
                    arrowColor: '#2BAC76',
                    monthTextColor: '#4A154B',
                    textDisabledColor: '#D0D1D2',
                }} // Light purple color
                onDayPress={onDayPress}
                markedDates={{
                    '2024-10-03': { marked: true, dotColor: '#1264A3' },
                    '2024-10-17': { selected: true, marked: true, selectedColor: '#1264A3', dotColor: '#1264A3' },
                    '2024-10-24': { marked: true, dotColor: '#1264A3' },
                }}
            />
            <ScrollView>
                {tasks[selectedDate] ? (
                    tasks[selectedDate].map((task, index) => (
                        <View  key={index} className="mt-4 bg-[#2BAC76] p-4 rounded-lg">
                        <TouchableOpacity className="mb-4">
                            <Text className="font-bold text-2xl text-black">{task.title}</Text>
                            <Text className="text-xs text-black">{task.created} {task.subtitle} {task.due}</Text>
                            {/*<Text className="text-black"></Text>*/}
                            {/*<Text className="text-black "></Text>*/}
                            <Text className="text-xl">{task.description}</Text>
                        </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <View className="mt-4 bg-[#2BAC76] p-4 rounded-lg">
                    <Text>No tasks for the selected date.</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default CalenderPage;
