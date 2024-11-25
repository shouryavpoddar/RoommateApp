import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { CalendarContext } from "../../Context";
import { useSelector } from "react-redux";

const Task = () => {
    const { tasks } = useSelector((state) => state.calendar);
    const { selectedDate, setSelectedTask } = useContext(CalendarContext);

    return (
        <>
            {tasks[selectedDate] ? (
                tasks[selectedDate].map((task, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedTask(task)}
                        style={styles.taskContainer}
                    >
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <Text style={styles.taskDetails}>{`${task.startTime} - ${task.endTime} | ${task.created}`}</Text>
                    </TouchableOpacity>
                ))
            ) : (
                <View style={styles.noTaskContainer}>
                    <Text style={styles.noTaskText}>No tasks for the selected date.</Text>
                </View>
            )}
        </>
    );
};

export default Task;

const styles = StyleSheet.create({
    taskContainer: {
        marginTop: 16, // mt-4
        backgroundColor: "#2BAC76", // Green background
        padding: 16, // p-4
        borderRadius: 12, // rounded-lg
    },
    taskTitle: {
        fontWeight: "bold", // font-bold
        fontSize: 20, // text-2xl
        color: "#4A154B", // Purple text
    },
    taskDetails: {
        fontSize: 12, // text-xs
        color: "#4A154B", // Purple text
    },
    noTaskContainer: {
        marginTop: 16, // mt-4
        backgroundColor: "#2BAC76", // Green background
        padding: 16, // p-4
        borderRadius: 12, // rounded-lg
    },
    noTaskText: {
        color: "#4A154B", // Purple text
    },
});
