import React, { useState, useContext } from 'react';
import { Text, TextInput, Button, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { CalendarContext } from '../../Context';
import { addTask } from '@/StateManagement/Slices/CalendarSlice';

const AddEventModal = () => {
    const { selectedDate, setIsAddEventModalVisible } = useContext(CalendarContext); // Get selectedDate from the context
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due, setDue] = useState('');

    const handleSubmit = () => {
        const newEvent = {
            title,
            description,
            due,
        };

        // Dispatch the new task to Redux
        dispatch(addTask({ date: selectedDate, task: newEvent }));

        setIsAddEventModalVisible(false); // Close modal after submitting
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Event</Text>

            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={styles.input}
            />

            <Text style={styles.label}>Due Time</Text>
            <TextInput
                value={due}
                onChangeText={setDue}
                style={styles.input}
            />

            <Button color={'#2BAC76'} title="Add" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16, // Add some padding to the modal content
    },
    heading: {
        fontSize: 24, // text-xl
        fontWeight: 'bold', // font-bold
        marginBottom: 16, // mb-4
    },
    label: {
        fontSize: 16, // text-base
        fontWeight: '600', // font-semibold
        color: '#4A154B', // Purple color
        marginBottom: 8, // mb-2
    },
    input: {
        borderWidth: 1, // border
        borderColor: '#D1D5DB', // gray-300
        padding: 8, // p-2
        marginBottom: 16, // mb-4
        borderRadius: 4, // rounded corners
        width: '100%',
    },
});

export default AddEventModal;
