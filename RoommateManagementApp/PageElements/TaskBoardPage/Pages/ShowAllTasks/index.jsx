import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from "expo-router";
import { editTaskInDB } from '../../../../StateManagement/Slices/TaskBoardSlice';
import EditTaskModal from '../../PageLayout/Components/EditTaskModal';

const ShowAllTasks = ({ groupID }) => {
    const categories = useSelector((state) => state.taskBoard.categories); // Fetch categories from Redux
    const dispatch = useDispatch();
    const router = useRouter();

    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [userTasks, setUserTasks] = useState([]);
    const [isSorted, setIsSorted] = useState(false); // Track sorting state

    // Dynamically fetch tasks assigned to "You" whenever categories change
    useEffect(() => {
        const tasks = categories.flatMap((category) =>
            category.tasks
                .filter((task) => task.assignedTo?.toLowerCase() === 'you') // Filter tasks assigned to "You"
                .map((task) => ({ ...task, categoryName: category.name })) // Add category reference
        );
        setUserTasks(sortByDefault(tasks)); // Initialize with default sort
    }, [categories]);

    // Default sorting: Pending first, then Done
    const sortByDefault = (tasks) => {
        const pendingTasks = tasks.filter((task) => task.status !== 'done');
        const doneTasks = tasks.filter((task) => task.status === 'done');
        return [...pendingTasks, ...doneTasks];
    };

    // Sort by Deadline
    const sortByDeadline = () => {
        const tasksWithDeadline = [...userTasks].filter((task) => task.deadline);
        const tasksWithoutDeadline = [...userTasks].filter((task) => !task.deadline);

        // Sort tasks with deadlines in ascending order
        tasksWithDeadline.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        setUserTasks([...tasksWithDeadline, ...tasksWithoutDeadline]); // Append tasks without deadlines at the end
        setIsSorted(true); // Indicate that tasks are sorted
    };

    // Unsort and return to default format
    const unsortTasks = () => {
        setUserTasks(sortByDefault(userTasks)); // Reset to default sorting
        setIsSorted(false); // Indicate that tasks are unsorted
    };

    // Handle editing tasks
    const handleEditTask = async (updatedTask) => {
        if (!groupID) {
            Alert.alert("Error", "Group ID is undefined. Cannot update task.");
            return;
        }

        try {
            await dispatch(editTaskInDB({
                groupID,
                date: updatedTask.deadline,
                taskId: updatedTask.id,
                updatedTask
            })).unwrap();
            setIsEditModalVisible(false);
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to update task.");
        }
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
                                { backgroundColor: task.status === 'done' ? '#A0D8B3' : '#EDEFF7' },
                            ]}
                            onPress={() => {
                                setSelectedTask(task);
                                setIsEditModalVisible(true);
                            }}
                        >
                            <Text style={styles.taskTitle}>{task.name || 'Untitled Task'}</Text>
                            <Text style={styles.taskText}>Description: {task.description || 'No description provided'}</Text>
                            <Text style={styles.taskText}>Deadline: {task.deadline || 'No deadline'}</Text>
                            <Text style={styles.taskText}>Category: {task.categoryName}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noTasksText}>No tasks assigned to you.</Text>
                )}
            </ScrollView>

            {/* Sort/Unsort Text */}
            <TouchableOpacity onPress={isSorted ? unsortTasks : sortByDeadline} style={styles.sortButton}>
                <Text style={styles.sortText}>{isSorted ? 'Unsort' : 'Sort by Deadline'}</Text>
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
                    category={{ name: selectedTask.categoryName }}
                    groupID={groupID} // Pass groupID to modal
                    onClose={() => setIsEditModalVisible(false)}
                    onSave={handleEditTask}
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
