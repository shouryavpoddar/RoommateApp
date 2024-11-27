import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { addTaskToCategoryDB } from "@/StateManagement/Slices/TaskBoardSlice";

const AddTaskModal = ({ visible, onClose, categoryName }) => {
    const groupID = useSelector((state) => state.user.groupID);
    const roommates = useSelector((state) => state.user.roommates) || [];
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    const dispatch = useDispatch();

    const resetInputs = () => {
        setTaskName("");
        setTaskDescription("");
        setAssignedTo("");
        setDeadline("");
    };

    const handleSave = async () => {
        if (!taskName.trim()) {
            Alert.alert("Error", "Task name cannot be empty!");
            return;
        }

        if (!groupID || !categoryName) {
            Alert.alert("Error", "Invalid group or category data!");
            return;
        }

        const newTask = {
            name: taskName,
            description: taskDescription || "No description provided.",
            assignedTo: assignedTo || "Unassigned",
            deadline: deadline || "No deadline",
        };

        try {
            await dispatch(
                addTaskToCategoryDB({ groupID, categoryName, task: newTask })
            ).unwrap();
            resetInputs();
            onClose();
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to add task.");
        }
    };

    const handleDateConfirm = (selectedDate) => {
        setDeadline(selectedDate.toISOString().split("T")[0]); // YYYY-MM-DD format
        setDatePickerVisible(false);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#4A154B" />
                    </TouchableOpacity>

                    <Text style={styles.title}>Add Task</Text>

                    <Text style={styles.label}>Task Name:</Text>
                    <TextInput
                        placeholder="Enter Task Name"
                        value={taskName}
                        onChangeText={setTaskName}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Task Description:</Text>
                    <TextInput
                        placeholder="Enter Task Description"
                        value={taskDescription}
                        onChangeText={setTaskDescription}
                        style={[styles.input, styles.textArea]}
                        multiline
                        blurOnSubmit
                    />

                    <Text style={styles.label}>Assign To:</Text>
                    <Picker
                        selectedValue={assignedTo}
                        onValueChange={(value) => setAssignedTo(value)}
                        style={styles.input}
                    >
                        <Picker.Item label="Select Assignee" value="" />
                        {roommates.map((roommate) => (
                            <Picker.Item
                                key={roommate.id}
                                label={roommate.username}
                                value={roommate.id}
                            />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Deadline:</Text>
                    <TouchableOpacity
                        onPress={() => setDatePickerVisible(true)}
                        style={styles.input}
                    >
                        <Text style={styles.dropdownText}>
                            {deadline || "Select Deadline"}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={() => setDatePickerVisible(false)}
                    />

                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "#EDEFF7",
        padding: 20,
        borderRadius: 12,
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#4B225F",
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontWeight: "bold",
        color: "#4B225F",
    },
    input: {
        borderWidth: 1,
        borderColor: "#4B225F",
        borderRadius: 8,
        padding: 10,
        marginBottom: 16,
        backgroundColor: "#FFFFFF",
    },
    textArea: {
        height: 80,
    },
    dropdownText: {
        color: "#4B225F",
    },
    saveButton: {
        backgroundColor: "#8A7191",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
    },
});

export default AddTaskModal;
