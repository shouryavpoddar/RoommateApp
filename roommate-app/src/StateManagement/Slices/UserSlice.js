import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        logout: (state) => {
            state.id = null; // Reset user ID on logout
        }
    }
});

export const { setId, logout } = userSlice.actions;

export default userSlice.reducer;
