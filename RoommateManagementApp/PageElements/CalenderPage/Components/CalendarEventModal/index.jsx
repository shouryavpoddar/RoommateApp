import React, { useContext, useState } from 'react';
import { Text, Button, TextInput, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTask, deleteTask } from "@/StateManagement/Slices/CalendarSlice";
import { CalendarContext } from '../../Context';

const CalenderEventModal = () => {
    const { selectedTask: task, selectedDate, setSelectedTask: setTask } = useContext(CalendarContext);
    const dispatch = useDispatch();

    // State for editing task
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedDue, setEditedDue] = useState(task.due);

    const closeModal = () => {
        setTask(null);
    };

    // Handle updating the task
    const handleEdit = () => {
        const updatedTask = {
            title: editedTitle,
            description: editedDescription,
            due: editedDue,
        };
        dispatch(editTask({ date: selectedDate, taskId: task.id, updatedTask }));
        setIsEditing(false);
        closeModal();
    };

    // Handle deleting the task
    const handleDelete = () => {
        dispatch(deleteTask({ date: selectedDate, taskId: task.id }));
        closeModal();
    };

    return (
        <View style={styles.container}>
            {isEditing ? (
                <View>
                    <Text style={styles.heading}>Edit Event</Text>

                    <Text style={styles.label}>Title</Text>
                    <TextInput
                        value={editedTitle}
                        onChangeText={setEditedTitle}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        value={editedDescription}
                        onChangeText={setEditedDescription}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Due Time</Text>
                    <TextInput
                        value={editedDue}
                        onChangeText={setEditedDue}
                        style={styles.input}
                    />

                    <Button color={"#2BAC76"}   title="Save" onPress={handleEdit} />
                    <View style={{ marginBottom: 16 }} />
                    <Button color={"#2BAC76"}  title="Cancel" onPress={() => setIsEditing(false)} />
                </View>
            ) : (
                <View>
                    <Text style={styles.heading}>{task.title}</Text>
                    <Text style={styles.description}>{task.description}</Text>
                    <Text style={styles.due}>{task.due}</Text>
                    <Button color={"#2BAC76"} title="Edit" onPress={() => setIsEditing(true)} />
                    <View style={{ marginBottom: 16 }} />
                    <Button color={"#2BAC76"} title="Delete" onPress={handleDelete} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2BAC76', // Green
        padding: 16, // p-4
    },
    container: {
        width: '100%',
        padding: 16,
    },
    heading: {
        fontSize: 24, // text-xl
        fontWeight: 'bold', // font-bold
        color: '#4A154B', // Purple
        marginBottom: 16, // mb-4
    },
    label: {
        fontSize: 16, // text-base
        fontWeight: '600', // font-semibold
        color: '#4A154B', // Purple
        marginBottom: 8, // mb-2
    },
    description: {
        fontSize: 16, // Default text
        color: '#4A154B', // Purple
        marginBottom: 8, // mb-2
    },
    due: {
        fontSize: 16,
        color: '#4A154B',
        marginBottom: 16, // mb-4
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB', // Gray border
        padding: 8, // p-2
        marginBottom: 16, // mb-4
        borderRadius: 4, // Rounded corners
        width: '100%',
    },
});

export default CalenderEventModal;
