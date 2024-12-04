import React, { useState, useContext } from "react";
import { Text, TextInput, Button, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { CalendarContext } from "../../Context";
import { addTaskToDB } from "@/StateManagement/Slices/CalendarSlice";

const AddEventModal = () => {
    const { selectedDate, setIsAddEventModalVisible } = useContext(CalendarContext);
    const dispatch = useDispatch();

    // Retrieve the logged-in user's groupID and username from Redux
    const groupID = useSelector((state) => state.user.groupID);
    const createdBy = useSelector((state) => state.user.username || state.user.id); // Use username or fallback to user ID
    console.log("Current groupID from Redux:", groupID);
    console.log("Task created by:", createdBy);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const handleSubmit = () => {
        if (!groupID) {
            alert("Group ID is missing. Cannot create event.");
            return;
        }

        console.log("Creating event for groupID:", groupID);

        const newTask = {
            title,
            description,
            startTime,
            endTime,
        };

        // Dispatch the Thunk with the groupID and createdBy field
        dispatch(addTaskToDB({ groupID, date: selectedDate, task: newTask, createdBy }));
        setIsAddEventModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add Event</Text>

            <Text style={styles.label}>Title</Text>
            <TextInput value={title} onChangeText={setTitle} style={styles.input} />

            <Text style={styles.label}>Description</Text>
            <TextInput value={description} onChangeText={setDescription} style={styles.input} />

            <Text style={styles.label}>Start Time</Text>
            <TextInput value={startTime} onChangeText={setStartTime} style={styles.input} />

            <Text style={styles.label}>End Time</Text>
            <TextInput value={endTime} onChangeText={setEndTime} style={styles.input} />

            <Button color={"#2BAC76"} title="Add" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
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

export default AddEventModal;
