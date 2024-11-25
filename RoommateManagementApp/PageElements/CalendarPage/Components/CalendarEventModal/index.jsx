import React, { useContext, useState } from "react";
import { Text, Button, TextInput, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { editTaskInDB, deleteTaskFromDB } from "@/StateManagement/Slices/CalendarSlice";
import { CalendarContext } from "../../Context";

const CalendarEventModal = ({ groupID }) => {
    const { selectedTask: task, selectedDate, setSelectedTask: setTask } = useContext(CalendarContext);
    const dispatch = useDispatch();

    // State for editing task
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDescription, setEditedDescription] = useState(task.description);
    const [editedStartTime, setEditedStartTime] = useState(task.startTime);
    const [editedEndTime, setEditedEndTime] = useState(task.endTime);

    const closeModal = () => {
        setTask(null);
    };

    // Handle updating the task
    const handleEdit = () => {
        const updatedTask = {
            title: editedTitle,
            description: editedDescription,
            startTime: editedStartTime,
            endTime: editedEndTime,
        };

        dispatch(
            editTaskInDB({
                groupID,
                date: selectedDate,
                taskId: task.id,
                updatedTask,
            })
        );
        setIsEditing(false);
        closeModal();
    };

    // Handle deleting the task
    const handleDelete = () => {
        dispatch(
            deleteTaskFromDB({
                groupID,
                date: selectedDate,
                taskId: task.id,
            })
        );
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

                    <Text style={styles.label}>Start Time</Text>
                    <TextInput
                        value={editedStartTime}
                        onChangeText={setEditedStartTime}
                        style={styles.input}
                        placeholder="e.g., 5:00 PM"
                    />

                    <Text style={styles.label}>End Time</Text>
                    <TextInput
                        value={editedEndTime}
                        onChangeText={setEditedEndTime}
                        style={styles.input}
                        placeholder="e.g., 7:00 PM"
                    />

                    <Button color={"#2BAC76"} title="Save" onPress={handleEdit} />
                    <View style={{ marginBottom: 16 }} />
                    <Button
                        color={"#2BAC76"}
                        title="Cancel"
                        onPress={() => setIsEditing(false)}
                    />
                </View>
            ) : (
                <View>
                    <Text style={styles.heading}>{task.title}</Text>
                    <Text style={styles.description}>{task.description}</Text>
                    <Text style={styles.time}>{`${task.startTime} - ${task.endTime}`}</Text>
                    <Button color={"#2BAC76"} title="Edit" onPress={() => setIsEditing(true)} />
                    <View style={{ marginBottom: 16 }} />
                    <Button color={"#2BAC76"} title="Delete" onPress={handleDelete} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4A154B",
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#4A154B",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: "#4A154B",
        marginBottom: 8,
    },
    time: {
        fontSize: 16,
        color: "#4A154B",
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        padding: 8,
        marginBottom: 16,
        borderRadius: 4,
        width: "100%",
    },
});

export default CalendarEventModal;
