import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, addDoc, query, getDocs, orderBy,onSnapshot } from "firebase/firestore";
import { db } from "@/firebase.config"; // Replace with your Firebase config path

export const subscribeToMessages = createAsyncThunk(
    "chat/subscribeToMessages",
    (groupID, { dispatch, rejectWithValue }) => {
        try {
            const chatCollectionRef = collection(db, "groups", groupID, "chats");
            const chatQuery = query(chatCollectionRef, orderBy("timestamp", "asc"));

            // Set up the real-time listener
            const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
                const messages = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Dispatch an action to update chat history
                dispatch(chatSlice.actions.updateChatHistory(messages));
            });

            // Return the unsubscribe function to stop listening if needed
            return unsubscribe;
        } catch (error) {
            console.error("Failed to subscribe to messages:", error);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to send a chat message
export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ groupID, senderID, text }, { rejectWithValue }) => {
        try {
            // Reference the group's chats subcollection
            const chatCollectionRef = collection(db, "groups", groupID, "chats");

            // Create the message document
            const message = {
                id: `${Date.now()}-${senderID}`,
                senderID,
                text,
                timestamp: new Date(),
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
            const chatCollectionRef = collection(db, "groups", groupID, "chats");

            const chatQuery = query(chatCollectionRef, orderBy("timestamp", "asc"));
            const snapshot = await getDocs(chatQuery);

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
        updateChatHistory: (state, action) => {
            state.chatHistory = action.payload;// Replace the chat history with the latest messages
        },
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
