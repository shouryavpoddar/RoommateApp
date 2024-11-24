import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '@/StateManagement/Slices/TaskBoardSlice'; 

const AddTaskModal = ({ visible, onClose, category }) => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [deadline, setDeadline] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false); // For the new date picker
    const [isPickerVisible, setPickerVisible] = useState(false); // For dropdown visibility

    const dispatch = useDispatch();

    const handleSave = () => {
        if (!taskName.trim()) {
            Alert.alert('Error', 'Task name cannot be empty!');
            return;
        }

        if (!category || !category.name) {
            Alert.alert('Error', 'Invalid category data!');
            return;
        }

        const newTask = {
            id: Date.now().toString(),
            name: taskName,
            description: taskDescription || 'No description provided.',
            assignedTo: assignedTo || 'Unassigned',
            deadline: deadline || 'No deadline',
            status: 'pending',
        };

        // Dispatch action to add the task
        dispatch(addTask({ categoryName: category.name, task: newTask }));

        resetInputs();
        onClose();
    };

    const resetInputs = () => {
        setTaskName('');
        setTaskDescription('');
        setAssignedTo('');
        setDeadline('');
    };

    const handleClose = () => {
        resetInputs();
        requestAnimationFrame(onClose); // Ensure modal closes immediately
    };

    const handleDateConfirm = (selectedDate) => {
        setDeadline(selectedDate.toISOString().split('T')[0]);
        setDatePickerVisible(false);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    {/* Title */}
                    <Text style={styles.title}>Add Task</Text>

                    {/* Task Name Input */}
                    <Text style={styles.label}>Task Name:</Text>
                    <TextInput
                        placeholder="Enter Task Name"
                        value={taskName}
                        onChangeText={setTaskName}
                        style={styles.input}
                    />

                    {/* Task Description Input */}
                    <Text style={styles.label}>Task Description:</Text>
                    <TextInput
                        placeholder="Enter Task Description"
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                        style={[styles.input, styles.textArea]}
                        multiline
                        blurOnSubmit={true}
                    />

                    {/* Assign To Dropdown */}
                    <Text style={styles.label}>Assign To:</Text>
                    <TouchableOpacity
                        onPress={() => setPickerVisible(true)}
                        style={styles.input}
                    >
                        <Text style={styles.dropdownText}>
                            {assignedTo || 'Select Assignee'}
                        </Text>
                    </TouchableOpacity>

                    {/* Picker Modal */}
                    {isPickerVisible && (
                        <Modal
                            transparent
                            animationType="fade"
                            onRequestClose={() => setPickerVisible(false)}
                        >
                            <View style={styles.pickerModalOverlay}>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={assignedTo}
                                        onValueChange={(value) => {
                                            setAssignedTo(value);
                                            setPickerVisible(false);
                                        }}
                                    >
                                        <Picker.Item label="Unassigned" value="" />
                                        <Picker.Item label="You" value="You" />
                                        <Picker.Item label="Teammate 1" value="Teammate 1" />
                                        <Picker.Item label="Teammate 2" value="Teammate 2" />
                                    </Picker>
                                    <TouchableOpacity
                                        onPress={() => setPickerVisible(false)}
                                        style={styles.closePickerButton}
                                    >
                                        <Text style={styles.closePickerButtonText}>
                                            Close
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    )}

                    {/* Deadline Date Picker */}
                    <Text style={styles.label}>Deadline:</Text>
                    <TouchableOpacity
                        onPress={() => setDatePickerVisible(true)}
                        style={styles.input}
                    >
                        <Text style={styles.dropdownText}>
                            {deadline || 'Select Deadline'}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={() => setDatePickerVisible(false)}
                    />

                    {/* Save Button */}
                    <TouchableOpacity
                        onPress={handleSave}
                        style={styles.saveButton}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#EDEFF7',
        padding: 20,
        borderRadius: 12,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4B225F',
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontWeight: 'bold',
        color: '#4B225F',
    },
    input: {
        borderWidth: 1,
        borderColor: '#4B225F',
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        backgroundColor: '#FFFFFF',
    },
    textArea: {
        height: 80,
    },
    dropdownText: {
        color: '#4B225F',
    },
    pickerModalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    pickerContainer: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
    },
    closePickerButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#8A7191',
        borderRadius: 8,
        alignItems: 'center',
    },
    closePickerButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#8A7191',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default AddTaskModal;
