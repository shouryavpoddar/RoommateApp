import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase.config";

// Thunk for user sign-up
export const signUp = createAsyncThunk(
    "user/signUp",
    async ({ uid, email, username, groupID }, { rejectWithValue }) => {
        try {
            // Save user data in Firestore
            await setDoc(doc(db, "users", uid), {
                email,
                username,
                groupID,
            });

            return { uid, email, username, groupID };
        } catch (error) {
            console.error("Failed to sign up:", error);
            return rejectWithValue(error.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        username: null,
        groupID: null,
        error: null,
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        logout: (state) => {
            state.id = null;
            state.username = null;
            state.groupID = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.fulfilled, (state, action) => {
                const { uid, username, groupID } = action.payload;
                state.id = uid;
                state.username = username;
                state.groupID = groupID;
                state.error = null;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { setId, logout } = userSlice.actions;

export default userSlice.reducer;
