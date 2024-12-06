import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasksFromDB } from "../../../../../StateManagement/Slices/TaskBoardSlice";

const TaskBoardWidget = ({ groupID }) => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.taskBoard);

    useEffect(() => {
        if (groupID) {
            dispatch(fetchTasksFromDB({ groupID }));
        }
    }, [groupID, dispatch]);

    if (loading) {
        return <Text style={styles.loading}>Loading tasks...</Text>;
    }

    if (error) {
        return <Text style={styles.error}>Failed to load tasks: {error}</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Upcoming Tasks</Text>
            {Object.keys(categories).length > 0 ? (
                Object.entries(categories).map(([category, tasks]) => (
                    <View key={category} style={styles.category}>
                        <Text style={styles.categoryTitle}>{category}</Text>
                        {tasks.slice(0, 3).map((task) => (
                            <View key={task.id} style={styles.taskItem}>
                                <Text style={styles.taskName}>{task.name}</Text>
                                <Text style={styles.taskDeadline}>{task.deadline || "No deadline"}</Text>
                            </View>
                        ))}
                    </View>
                ))
            ) : (
                <Text style={styles.noTasks}>No tasks available. Hooray!</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#EDEFF7",
        borderRadius: 8,
        width: '100%',
        //margin: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4B225F",
        marginBottom: 12,
    },
    category: {
        marginBottom: 16,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4B225F",
    },
    taskItem: {
        backgroundColor: "#A0D8B3",
        borderRadius: 8,
        padding: 10,
        marginTop: 8,
    },
    taskName: {
        fontSize: 16,
        color: "#4B225F",
    },
    taskDeadline: {
        fontSize: 14,
        color: "#4B225F",
    },
    loading: {
        textAlign: "center",
        fontSize: 16,
        color: "#4B225F",
    },
    error: {
        textAlign: "center",
        fontSize: 16,
        color: "red",
    },
    noTasks: {
        textAlign: "center",
        fontSize: 16,
        color: "#4B225F",
    },
});

export default TaskBoardWidget;
