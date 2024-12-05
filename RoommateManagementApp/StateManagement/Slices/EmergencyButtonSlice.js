import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebase } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import { doc, collection, setDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from '@/firebase.config';

// Initial state
const initialState = {
    buttons: {
        1: { id: 1, title: 'Predefined Emergency', message: 'Predefined Emergency Message', bgColor: '#FF5733', isPermanent: true },
        2: { id: 2, title: 'Test Emergency', message: 'Test emergency message', bgColor: '#28A745', isPermanent: false },
    }
};

// Thunk to send an emergency notification and store it in Firestore
export const sendEmergencyNotification = createAsyncThunk(
    "emergency/sendEmergencyNotification",
    async ({ groupID, selectedButton, user, timestamp }, { rejectWithValue }) => {
        console.log (groupID);
        try {
            if (!groupID) throw new Error("Group ID is undefined. Cannot send emergency notification.");

            const notificationID = uuid.v4();  // Create a unique notification ID
            const notificationData = {
                buttonTitle: selectedButton.title,
                message: selectedButton.message,
                username: user.username,
                timestamp,
            };

            // Reference to the emergencyNotifications collection for the given groupID
            const notificationsRef = collection(db, `groups/${groupID}/emergencynotifications`);

            // Create a document reference for the notification document
            await setDoc(doc(notificationsRef, notificationID), notificationData);

            // Return notification data for further use, such as updating UI
            return { groupID, notificationData };
        } catch (error) {
            console.error("Failed to send emergency notification:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Slice definition
const emergencyButtonSlice = createSlice({
    name: 'emergency',
    initialState,
    reducers: {
        addEmergencyButton: (state, action) => {
            const { title, message, bgColor } = action.payload;
            const id = uuid.v4();
            state.buttons[id] = { id: id, title: title, message: message, bgColor: bgColor };
        },
        editEmergencyButton: (state, action) => {
            const { buttonId, title, message, color } = action.payload;
            if (state.buttons[buttonId]) {
                state.buttons[buttonId] = { id: buttonId, title: title, message: message, bgColor: color };
            }
        },
        deleteEmergencyButton: (state, action) => {
            const { buttonId } = action.payload;
            if (state.buttons[buttonId]) {
                delete state.buttons[buttonId];
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendEmergencyNotification.fulfilled, (state, action) => {
            console.log('Emergency notification sent successfully:', action.payload);
        });
        builder.addCase(sendEmergencyNotification.rejected, (state, action) => {
            console.error('Failed to send emergency notification:', action.payload);
        });
    }
});

export const { addEmergencyButton, editEmergencyButton, deleteEmergencyButton } = emergencyButtonSlice.actions;

export default emergencyButtonSlice.reducer;
