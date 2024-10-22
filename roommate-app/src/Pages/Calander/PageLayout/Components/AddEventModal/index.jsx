import React, {useContext, useState} from 'react';
import {Text, TextInput, Button} from 'react-native';
import {CalendarContext} from "../../../Context";


const AddEventModal = () => {
    const {setIsAddEventModalVisible} = useContext(CalendarContext);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due, setDue] = useState('');

    const onAddEvent = (newEvent) => {
        // // Add new event to the selected date in the tasks
        // setTasks((prevTasks) => ({
        //     ...prevTasks,
        //     [selectedDate]: [...(prevTasks[selectedDate] || []), newEvent]
        // }));
    };

    const handleSubmit = () => {
        const newEvent = {
            title,
            description,
            due,
            created: 'User X', // Static for now; can be dynamic
        };
        onAddEvent(newEvent); // redux dispatch
        setIsAddEventModalVisible(false);
    };

    return (
       <>
           <Text className="text-xl font-bold mb-4">Add Event</Text>

           {/* Title Field */}
           <Text className="text-base text-[#4A154B] text-left font-semibold mb-2  w-full">Title</Text>
           <TextInput
               value={title}
               onChangeText={setTitle}
               className="border border-gray-300 p-2 mb-4 w-full"
           />

           {/* Description Field */}
           <Text className="text-base text-[#4A154B] text-left font-semibold mb-2  w-full">Description</Text>
           <TextInput
               value={description}
               onChangeText={setDescription}
               className="border border-gray-300 p-2 mb-4 w-full"
           />

           {/* Due Time Field */}
           <Text className="text-base text-[#4A154B] text-left font-semibold mb-2 w-full">Due Time</Text>
           <TextInput
               value={due}
               onChangeText={setDue}
               className="border border-gray-300 p-2 mb-4 w-full"
           />

           <Button title="Add" onPress={handleSubmit} />
       </>
    );
};

export default AddEventModal;
