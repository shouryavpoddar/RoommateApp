import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/firebase.config";
import { doc, collection, setDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import uuid from "react-native-uuid";

// Initial state
const initialState = {
    tasks: {}, // Tasks organized by date
    loading: false,
    error: null,
};

// Thunk to fetch tasks for a group
export const fetchTasksFromDB = createAsyncThunk(
    "calendar/fetchTasksFromDB",
    async ({ groupID }, { rejectWithValue }) => {
        try {
            if (!groupID) throw new Error("Group ID is undefined. Cannot fetch calendar events.");

            const tasks = {};
            const calendarRef = collection(db, `groups/${groupID}/calendarEvents`);
            const snapshot = await getDocs(calendarRef);

            snapshot.forEach((doc) => {
                const task = doc.data();
                const date = task.date;
                if (!tasks[date]) tasks[date] = [];
                tasks[date].push({ id: doc.id, ...task });
            });

            return { tasks, groupID };
        } catch (error) {
            console.error("Failed to fetch tasks from DB:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to add a new task
export const addTaskToDB = createAsyncThunk(
    "calendar/addTaskToDB",
    async ({ groupID, date, task }, { rejectWithValue }) => {
        try {
            if (!groupID) throw new Error("Group ID is undefined. Cannot create calendar event.");

            const taskID = uuid.v4();
            const taskData = { ...task, id: taskID, date };

            const calendarRef = collection(db, `groups/${groupID}/calendarEvents`);
            await setDoc(doc(calendarRef, taskID), taskData);

            return { date, task: taskData };
        } catch (error) {
            console.error("Failed to add task to DB:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to edit a task
export const editTaskInDB = createAsyncThunk(
    "calendar/editTaskInDB",
    async ({ groupID, date, taskId, updatedTask }, { rejectWithValue }) => {
        try {
            if (!groupID || !taskId) throw new Error("Group ID or Task ID is missing.");

            const taskRef = doc(db, `groups/${groupID}/calendarEvents/${taskId}`);
            await updateDoc(taskRef, updatedTask);

            return { date, taskId, updatedTask };
        } catch (error) {
            console.error("Failed to edit task in DB:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to delete a task
export const deleteTaskFromDB = createAsyncThunk(
    "calendar/deleteTaskFromDB",
    async ({ groupID, date, taskId }, { rejectWithValue }) => {
        try {
            if (!groupID || !taskId) throw new Error("Group ID or Task ID is missing.");

            const taskRef = doc(db, `groups/${groupID}/calendarEvents/${taskId}`);
            await deleteDoc(taskRef);

            return { date, taskId };
        } catch (error) {
            console.error("Failed to delete task from DB:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Tasks
            .addCase(fetchTasksFromDB.fulfilled, (state, action) => {
                state.tasks = action.payload.tasks;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchTasksFromDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTasksFromDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Task
            .addCase(addTaskToDB.fulfilled, (state, action) => {
                const { date, task } = action.payload;
                if (!state.tasks[date]) state.tasks[date] = [];
                state.tasks[date].push(task);
                state.loading = false;
                state.error = null;
            })
            .addCase(addTaskToDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTaskToDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit Task
            .addCase(editTaskInDB.fulfilled, (state, action) => {
                const { date, taskId, updatedTask } = action.payload;
                const taskIndex = state.tasks[date]?.findIndex((task) => task.id === taskId);
                if (taskIndex !== -1) {
                    state.tasks[date][taskIndex] = {
                        ...state.tasks[date][taskIndex],
                        ...updatedTask,
                    };
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(editTaskInDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(editTaskInDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Task
            .addCase(deleteTaskFromDB.fulfilled, (state, action) => {
                const { date, taskId } = action.payload;
                state.tasks[date] = state.tasks[date]?.filter((task) => task.id !== taskId);
                if (state.tasks[date]?.length === 0) delete state.tasks[date];
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteTaskFromDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTaskFromDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default calendarSlice.reducer;
