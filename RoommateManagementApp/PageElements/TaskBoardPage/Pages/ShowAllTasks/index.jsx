import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import EditTaskModal from '../../PageLayout/Components/EditTaskModal';

const ShowAllTasks = ({ groupID }) => {
    const categories = useSelector((state) => state.taskBoard.categories);
    const roommates = useSelector((state) => state.user.roommates) || []; // List of roommates with IDs and usernames
    const currentUser = useSelector((state) => state.user.id); // Get the current user's ID
    const router = useRouter();

    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [userTasks, setUserTasks] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    function findCategoryNameForTask(categories, taskId) {
        for (const [categoryName, tasks] of Object.entries(categories)) {
            const taskExists = tasks.some((task) => task.id === taskId);
            if (taskExists) return categoryName;
        }
        return null;
    }

    // Dynamically fetch tasks assigned to the current user whenever categories change
    useEffect(() => {
        const tasks = Object.entries(categories).flatMap(([categoryName, tasks]) =>
            tasks
                .filter((task) => task.assignedTo === currentUser) // Filter tasks assigned to the current user
                .map((task) => ({
                    ...task,
                    categoryName, // Add category reference
                    assignedToName: roommates.find((rm) => rm.id === task.assignedTo)?.username || "Unassigned",
                }))
        );
        setUserTasks(sortByDefault(tasks)); // Initialize with default sort
    }, [categories, currentUser, roommates]);

    // Default sorting: Pending tasks first, then Done
    const sortByDefault = (tasks) => {
        const pendingTasks = tasks.filter((task) => task.status !== "done");
        const doneTasks = tasks.filter((task) => task.status === "done");
        return [...pendingTasks, ...doneTasks];
    };

    // Sort tasks by Deadline
    const sortByDeadline = () => {
        const tasksWithDeadline = [...userTasks].filter((task) => task.deadline);
        const tasksWithoutDeadline = [...userTasks].filter((task) => !task.deadline);

        tasksWithDeadline.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        setUserTasks([...tasksWithDeadline, ...tasksWithoutDeadline]);
        setIsSorted(true);
    };

    // Reset tasks to the default sorting
    const unsortTasks = () => {
        setUserTasks(sortByDefault(userTasks));
        setIsSorted(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {userTasks.length > 0 ? (
                    userTasks.map((task) => (
                        <TouchableOpacity
                            key={task.id}
                            style={[
                                styles.taskCard,
                                { backgroundColor: task.status === "done" ? "#A0D8B3" : "#EDEFF7" },
                            ]}
                            onPress={() => {
                                setSelectedTask(task);
                                setIsEditModalVisible(true);
                            }}
                        >
                            <Text style={styles.taskTitle}>{task.name || "Untitled Task"}</Text>
                            <Text style={styles.taskText}>
                                Description: {task.description || "No description provided"}
                            </Text>
                            <Text style={styles.taskText}>
                                Assigned to: {task.assignedToName || "Unassigned"}
                            </Text>
                            <Text style={styles.taskText}>
                                Deadline: {task.deadline || "No deadline"}
                            </Text>
                            <Text style={styles.taskText}>Category: {task.categoryName}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noTasksText}>No tasks assigned to you.</Text>
                )}
            </ScrollView>

            {/* Sort/Unsort Text */}
            <TouchableOpacity onPress={isSorted ? unsortTasks : sortByDeadline} style={styles.sortButton}>
                <Text style={styles.sortText}>{isSorted ? "Unsort" : "Sort by Deadline"}</Text>
            </TouchableOpacity>

            {/* Back Button */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            {/* Edit Task Modal */}
            {selectedTask && (
                <EditTaskModal
                    visible={isEditModalVisible}
                    task={selectedTask}
                    categoryName={findCategoryNameForTask(categories, selectedTask.id)}
                    groupID={groupID}
                    onClose={() => setIsEditModalVisible(false)}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B225F',
        padding: 16,
    },
    taskCard: {
        padding: 16,
        marginBottom: 8,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    taskTitle: {
        color: '#4B225F',
        fontWeight: 'bold',
        fontSize: 16,
    },
    taskText: {
        color: '#4B225F',
        fontSize: 14,
    },
    noTasksText: {
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
    sortButton: {
        alignSelf: 'center',
        marginTop: 16,
    },
    sortText: {
        color: '#8CC49F',
        fontWeight: 'bold',
        fontSize: 16,
    },
    backButton: {
        backgroundColor: '#8CC49F',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    backButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ShowAllTasks;
