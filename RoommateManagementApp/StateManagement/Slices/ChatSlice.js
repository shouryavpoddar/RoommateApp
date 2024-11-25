import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, collection, addDoc, query, getDocs, orderBy } from "firebase/firestore";
import { db } from "@/firebase.config"; // Replace with your Firebase config path

// Thunk to send a chat message
export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ groupID, senderID, text }, { rejectWithValue }) => {
        try {
            // Reference the group's chats subcollection
            const chatCollectionRef = collection(db, "groups", groupID, "chats");

            // Create the message document
            const message = {
                id: `${Date.now()}-${senderID}`, // Unique ID for the message
                senderID,
                text,
                timestamp: new Date(), // Current timestamp
            };

            // Add the message to Firestore
            await addDoc(chatCollectionRef, message);

            console.log("Message sent:", message);
            return message; // Return the message for local state update
        } catch (error) {
            console.error("Failed to send message:", error);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to load chat messages
export const loadMessages = createAsyncThunk(
    "chat/loadMessages",
    async (groupID, { rejectWithValue }) => {
        try {
            // Reference the group's chats subcollection
            const chatCollectionRef = collection(db, "groups", groupID, "chats");

            // Query the chats in order of timestamp
            const chatQuery = query(chatCollectionRef, orderBy("timestamp", "asc"));
            const snapshot = await getDocs(chatQuery);

            // Map Firestore documents into an array
            const messages = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            console.log("Messages loaded:", messages);
            return messages; // Return messages to update the state
        } catch (error) {
            console.error("Failed to load messages:", error);
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    chatHistory: [], // Initialize as an empty array for chats loaded from Firestore
    isLoading: false,
    error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        // Add reducers here if needed, e.g., for local operations
    },
    extraReducers: (builder) => {
        builder
            // Handle sendMessage
            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatHistory.push(action.payload); // Add the new message to the chat history
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Handle loadMessages
            .addCase(loadMessages.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadMessages.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatHistory = action.payload; // Replace the chat history with loaded messages
            })
            .addCase(loadMessages.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default chatSlice.reducer;
