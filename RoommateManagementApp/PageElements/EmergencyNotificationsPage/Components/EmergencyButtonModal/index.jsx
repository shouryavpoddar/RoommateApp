import { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, Button, Modal, TouchableWithoutFeedback, View, Alert, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editEmergencyButton, deleteEmergencyButton } from '@/StateManagement/Slices/EmergencyButtonSlice';
import { EmergencyContext } from '../../Context';
import { sendEmergencyNotification } from '@/StateManagement/Slices/EmergencyButtonSlice';

export default function EmergencyButtonModal() {
    const user = useSelector((state) => state.user); 
    const groupID = useSelector((state) => state.user.groupID);
    const { selectedButton, setSelectedButton } = useContext(EmergencyContext);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedMessage, setEditedMessage] = useState('');
    const [editedBgColor, setEditedBgColor] = useState('');

    useEffect(() => {
        if (selectedButton) {
            setEditedTitle(selectedButton.title || '');
            setEditedMessage(selectedButton.message || '');
            setEditedBgColor(selectedButton.bgColor || '');
        }
    }, [selectedButton]);

    const closeModal = () => {
        setSelectedButton(null);
        setIsEditing(false);
    };

    const handleEdit = () => {
        if (editedTitle.trim() !== '' && editedMessage.trim() !== '') {
            dispatch(editEmergencyButton({ buttonId: selectedButton.id, title: editedTitle, message: editedMessage, bgColor: editedBgColor }));
            setIsEditing(false);
            closeModal();
        } else {
            Alert.alert('Error', 'Title and description must not be empty.');
        }
    };

    const handleNotification = () => {
        console.log(user);
        if (!user || !user.id) {
            Alert.alert('Error', 'User not authenticated!');
            return;
        }

        // Send emergency notification to Firestore
        dispatch(sendEmergencyNotification({
            groupID,
            selectedButton,
            user: user,
            timestamp: new Date().toISOString(), // Add timestamp if needed
        }));

        closeModal();
    };

    const handleDelete = () => {
        dispatch(deleteEmergencyButton({ buttonId: selectedButton.id }));
        closeModal();
    };

    if (!selectedButton) {
        return null;
    }

    return (
        <Modal animationType="fade" transparent={true} visible={!!selectedButton} onRequestClose={closeModal}>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContainer}>
                            {isEditing ? (
                                <>
                                    <Text style={styles.title}>Edit Emergency Button</Text>

                                    <Text style={styles.label}>Title</Text>
                                    <TextInput value={editedTitle} placeholder="Enter title here" onChangeText={setEditedTitle} style={styles.input} />

                                    <Text style={styles.label}>Message</Text>
                                    <TextInput value={editedMessage} placeholder="Enter message here" onChangeText={setEditedMessage} style={styles.input} />

                                    <Text style={styles.label}>Background Color</Text>
                                    <TextInput value={editedBgColor} placeholder="Enter color here" onChangeText={setEditedBgColor} style={styles.input} />

                                    <Pressable style={styles.saveButton} onPress={handleEdit}>
                                        <Text style={styles.buttonText}>Save</Text>
                                    </Pressable>
                                    <Pressable style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </Pressable>
                                </>
                            ) : (
                                <>
                                    <Text style={styles.selectedTitle}>{selectedButton.title}</Text>
                                    <Text style={styles.selectedMessage}>{`Notification Message: \n${selectedButton.message}`}</Text>
                                    <Pressable style={styles.notificationButton} onPress={handleNotification}>
                                        <Text style={styles.buttonText}>Send Emergency Notification</Text>
                                    </Pressable>

                                    {!selectedButton.isPermanent && (
                                        <>
                                            <Pressable onPress={() => setIsEditing(true)} style={styles.editButton}>
                                                <Text style={styles.buttonText}>Edit</Text>
                                            </Pressable>

                                            <Pressable onPress={handleDelete} style={styles.deleteButton}>
                                                <Text style={styles.buttonText}>Delete</Text>
                                            </Pressable>
                                        </>
                                    )}
                                </>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Equivalent to bg-black/50
    },
    modalContainer: {
        width: 288, // Equivalent to w-72
        padding: 24, // Equivalent to p-6
        backgroundColor: '#EDEFF7',
        borderRadius: 16, // Equivalent to rounded-xl
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16, // Equivalent to mb-4
    },
    label: {
        fontSize: 14,
        color: '#4A154B',
        textAlign: 'left',
        fontWeight: '600',
        marginBottom: 8, // Equivalent to mb-2
        width: '100%',
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#D1D5DB', // Equivalent to border-gray-300
        padding: 8, // Equivalent to p-2
        marginBottom: 16, // Equivalent to mb-4
    },
    saveButton: {
        backgroundColor: '#8CC49F',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12, // Equivalent to mb-3
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#8CC49F',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12, // Equivalent to mb-3
        width: '100%',
    },
    notificationButton: {
        backgroundColor: '#8A7191',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12, // Equivalent to mb-3
        width: '100%',
    },
    editButton: {
        backgroundColor: '#8CC49F',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12, // Equivalent to mb-3
        width: '100%',
    },
    deleteButton: {
        backgroundColor: '#F87171', // Equivalent to bg-red-500
        borderRadius: 8,
        padding: 16,
        marginBottom: 12, // Equivalent to mb-3
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    selectedTitle: {
        color: '#4A154B',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8, // Equivalent to mb-2
    },
    selectedMessage: {
        color: '#4A154B',
        textAlign: 'center',
        marginBottom: 16, // Equivalent to mb-4
    },
});