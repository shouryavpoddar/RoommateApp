import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { editTaskInDB } from '../../../../../StateManagement/Slices/TaskBoardSlice';

const EditTaskModal = ({ visible, onClose, task, category, groupID }) => {
    const [editedTask, setEditedTask] = useState(null);
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setEditedTask(task);
    }, [task]);

    const handleSave = async () => {
        if (!editedTask?.name?.trim()) {
            Alert.alert("Error", "Task name cannot be empty!");
            return;
        }

        if (!category?.name || !groupID) {
            Alert.alert("Error", "Invalid category or group data!");
            return;
        }

        try {
            await dispatch(editTaskInDB({
                groupID,
                date: editedTask.deadline,
                taskId: editedTask.id,
                updatedTask: editedTask
            })).unwrap();
            onClose();
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to edit task.");
        }
    };

    const toggleStatus = () => {
        const newStatus = editedTask.status === 'done' ? 'pending' : 'done';
        setEditedTask({ ...editedTask, status: newStatus });
    };

    const handleDateConfirm = (selectedDate) => {
        const localDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000)
            .toISOString()
            .split('T')[0];
        setEditedTask({ ...editedTask, deadline: localDate });
        setDatePickerVisible(false);
    };

    if (!editedTask) {
        return null;
    }

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#4B225F" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Edit/View Task</Text>
                    <Text style={styles.label}>Task Name:</Text>
                    <TextInput
                        placeholder="Enter Task Name"
                        value={editedTask.name}
                        onChangeText={(text) => setEditedTask({ ...editedTask, name: text })}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Task Description:</Text>
                    <TextInput
                        placeholder="Enter Task Description"
                        value={editedTask.description}
                        onChangeText={(text) => setEditedTask({ ...editedTask, description: text })}
                        style={[styles.input, styles.multilineInput]}
                        multiline
                    />
                    <Text style={styles.label}>Deadline:</Text>
                    <TouchableOpacity onPress={() => setDatePickerVisible(true)} style={styles.input}>
                        <Text style={styles.text}>
                            {editedTask.deadline || 'Select Deadline'}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={() => setDatePickerVisible(false)}
                    />
                    <Text style={styles.label}>Assign To:</Text>
                    <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.input}>
                        <Text style={styles.text}>
                            {editedTask.assignedTo || 'Select Assignee'}
                        </Text>
                    </TouchableOpacity>
                    {isPickerVisible && (
                        <Modal transparent animationType="fade" onRequestClose={() => setPickerVisible(false)}>
                            <View style={styles.pickerModal}>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={editedTask.assignedTo}
                                        onValueChange={(value) => {
                                            setEditedTask({ ...editedTask, assignedTo: value });
                                            setPickerVisible(false);
                                        }}
                                    >
                                        <Picker.Item label="Unassigned" value="" />
                                        <Picker.Item label="You" value="You" />
                                        <Picker.Item label="Teammate 1" value="Teammate 1" />
                                        <Picker.Item label="Teammate 2" value="Teammate 2" />
                                    </Picker>
                                    <TouchableOpacity onPress={() => setPickerVisible(false)} style={styles.closePickerButton}>
                                        <Text style={styles.closePickerText}>Close</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    )}
                    <TouchableOpacity onPress={toggleStatus} style={[styles.statusButton, styles[editedTask.status]]}>
                        <Text style={styles.statusButtonText}>
                            {editedTask.status === 'done' ? 'Mark as Undone' : 'Mark as Done'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
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
    multilineInput: {
        minHeight: 60,
        textAlignVertical: 'top',
    },
    text: {
        color: '#4B225F',
    },
    pickerModal: {
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
    closePickerText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    statusButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 8,
    },
    done: {
        backgroundColor: '#A0D8B3',
    },
    pending: {
        backgroundColor: '#8CC49F',
    },
    statusButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#8A7191',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});

export default EditTaskModal;
