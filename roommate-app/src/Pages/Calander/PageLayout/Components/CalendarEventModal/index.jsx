import React, {useContext} from 'react';
import { Text, } from 'react-native';
import {CalendarContext} from "../../../Context";

const CalenderEventModal = () => {
    const {selectedTask: task,} = useContext(CalendarContext);

    return (
        <>
            <Text className="text-[#4A154B] text-xl font-bold mb-4">{task.title}</Text>
            <Text className="text-[#4A154B] mb-2">{task.description}</Text>
            <Text className="text-[#4A154B] mb-4">{task.due}</Text>
        </>
    );
};

export default CalenderEventModal;
