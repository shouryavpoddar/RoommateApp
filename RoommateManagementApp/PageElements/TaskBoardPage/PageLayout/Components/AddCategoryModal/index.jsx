import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { addCategoryToDB } from "../../../../../StateManagement/Slices/TaskBoardSlice";
import { AntDesign } from '@expo/vector-icons';

const AddCategoryModal = ({ visible, onClose }) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const dispatch = useDispatch();
    const groupID = useSelector((state) => state.user.groupID);

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) {
            Alert.alert("Error", "Category name cannot be empty!");
            return;
        }

        try {
            await dispatch(addCategoryToDB({ groupID, categoryName: newCategoryName })).unwrap();
            setNewCategoryName('');
            onClose();
        } catch (error) {
            Alert.alert("Error", error.message || "Failed to add category.");
        }
    };

    const handleClose = () => {
        setNewCategoryName('');
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add New Category</Text>
                        <TouchableOpacity onPress={handleClose}>
                            <AntDesign name="close" size={24} color="#4B225F" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter category name"
                        placeholderTextColor="#4B225F"
                        value={newCategoryName}
                        onChangeText={setNewCategoryName}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
                        <Text style={styles.addButtonText}>Add Category</Text>
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
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4B225F',
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        paddingHorizontal: 10,
        borderColor: '#4B225F',
        borderWidth: 1,
        marginBottom: 20,
        color: '#4B225F',
    },
    addButton: {
        backgroundColor: '#A0D8B3',
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddCategoryModal;
