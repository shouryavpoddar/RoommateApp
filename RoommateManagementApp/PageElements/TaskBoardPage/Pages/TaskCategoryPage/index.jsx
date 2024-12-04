import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { editTaskInCategoryDB } from '@/StateManagement/Slices/TaskBoardSlice';
import AddTaskModal from './../../PageLayout/Components/AddTaskModal';
import EditTaskModal from './../../PageLayout/Components/EditTaskModal';

const TaskCategoryPage = ({ categoryName, groupID }) => {
    const categories = useSelector((state) => state.taskBoard.categories);
    const dispatch = useDispatch();

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [sortedTasks, setSortedTasks] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    // Get tasks for the current category
    const currentTasks = categories[categoryName] || [];

    console.log(currentTasks)
 
    // Sort tasks by default (Pending first, then Done)
    const sortByDefault = (tasks) => {
        const pendingTasks = tasks.filter((task) => task.status !== 'done');
        const doneTasks = tasks.filter((task) => task.status === 'done');
        return [...pendingTasks, ...doneTasks];
    };

    useEffect(() => {
        // Update sorted tasks when currentTasks changes
        setSortedTasks(sortByDefault(currentTasks));
    }, [currentTasks]);

    // Sort tasks by deadline
    const sortByDeadline = () => {
        const tasksWithDeadline = [...sortedTasks].filter((task) => task.deadline);
        const tasksWithoutDeadline = [...sortedTasks].filter((task) => !task.deadline);

        tasksWithDeadline.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        setSortedTasks([...tasksWithDeadline, ...tasksWithoutDeadline]);
        setIsSorted(true);
    };

    // Reset to default sorting
    const unsortTasks = () => {
        setSortedTasks(sortByDefault(currentTasks));
        setIsSorted(false);
    };

    // Handle task editing
    const handleEditTask = async (updatedTask) => {
        if (!groupID) {
            Alert.alert('Error', 'Group ID is undefined. Cannot update task.');
            return;
        }

        try {
            await dispatch(
                editTaskInCategoryDB({
                    groupID,
                    categoryName,
                    taskId: updatedTask.id,
                    updatedTask,
                })
            ).unwrap();
            setIsEditModalVisible(false);
            Alert.alert('Success', 'Task updated successfully.');
        } catch (error) {
            Alert.alert('Error', error.message || 'Failed to update task.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {sortedTasks.length > 0 ? (
                    sortedTasks.map((task) => (
                        <TouchableOpacity
                            key={task.id}
                            style={task.status === 'done' ? styles.doneTask : styles.pendingTask}
                            onPress={() => {
                                setSelectedTask(task);
                                setIsEditModalVisible(true);
                            }}
                        >
                            <View>
                                <Text style={styles.taskName}>{task.name || 'Untitled Task'}</Text>
                                <Text style={styles.taskDetails}>
                                    Assigned to: {task.assignedToName || 'Unassigned'}
                                </Text>
                                <Text style={styles.taskDetails}>
                                    Deadline: {task.deadline || 'No deadline'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noTasksText}>No tasks in this category.</Text>
                )}
            </ScrollView>

            {/* Sort/Unsort Button */}
            <TouchableOpacity
                onPress={isSorted ? unsortTasks : sortByDeadline}
                style={styles.sortButton}
            >
                <Text style={styles.sortButtonText}>
                    {isSorted ? 'Unsort' : 'Sort by Deadline'}
                </Text>
            </TouchableOpacity>

            {/* Add Task Button */}
            <TouchableOpacity
                onPress={() => setIsAddModalVisible(true)}
                style={styles.addButton}
            >
                <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>

            {/* Add Task Modal */}
            <AddTaskModal
                visible={isAddModalVisible}
                categoryName={categoryName}
                onClose={() => setIsAddModalVisible(false)}
            />

            {/* Edit Task Modal */}
            {selectedTask && (
                <EditTaskModal
                    visible={isEditModalVisible}
                    task={selectedTask}
                    categoryName={categoryName}
                    groupID={groupID}
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
    doneTask: {
        backgroundColor: '#A0D8B3',
        padding: 16,
        marginBottom: 8,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    pendingTask: {
        backgroundColor: '#EDEFF7',
        padding: 16,
        marginBottom: 8,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    taskName: {
        color: '#4B225F',
        fontWeight: 'bold',
        fontSize: 16,
    },
    taskDetails: {
        color: '#4B225F',
        fontSize: 14,
    },
    noTasksText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#FFFFFF',
    },
    sortButton: {
        alignSelf: 'center',
        marginTop: 16,
    },
    sortButtonText: {
        color: '#8CC49F',
        fontWeight: 'bold',
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#8CC49F',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginTop: 16,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TaskCategoryPage;
