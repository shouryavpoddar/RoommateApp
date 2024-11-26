import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/firebase.config";
import { doc, collection, setDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import uuid from "react-native-uuid";

// Initial state
const initialState = {
    categories: {}, // Categories with tasks from Firebase
    loading: false,
    error: null,
};

// Thunk to fetch all tasks for a group
export const fetchTasksFromDB = createAsyncThunk(
    "taskBoard/fetchTasksFromDB",
    async ({ groupID }, { rejectWithValue }) => {
        try {
            if (!groupID) throw new Error("Group ID is required to fetch tasks.");

            const categories = {};
            const tasksRef = collection(db, `groups/${groupID}/tasks`);
            const snapshot = await getDocs(tasksRef);

            snapshot.forEach((doc) => {
                const task = doc.data();
                const category = task.category || "Uncategorized";
                if (!categories[category]) categories[category] = [];
                categories[category].push({ id: doc.id, ...task });
            });

            return { categories };
        } catch (error) {
            console.error("Error fetching tasks:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to add a new task
export const addTaskToDB = createAsyncThunk(
    "taskBoard/addTaskToDB",
    async ({ groupID, category, task }, { rejectWithValue }) => {
        try {
            if (!groupID) throw new Error("Group ID is required to add a task.");

            const taskID = uuid.v4();
            const taskData = { ...task, id: taskID, category };

            const tasksRef = collection(db, `groups/${groupID}/tasks`);
            await setDoc(doc(tasksRef, taskID), taskData);

            return { category, task: taskData };
        } catch (error) {
            console.error("Error adding task:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to edit a task
export const editTaskInDB = createAsyncThunk(
    "taskBoard/editTaskInDB",
    async ({ groupID, taskId, updatedTask }, { rejectWithValue }) => {
        try {
            if (!groupID || !taskId) throw new Error("Group ID and Task ID are required to edit a task.");

            const taskRef = doc(db, `groups/${groupID}/tasks/${taskId}`);
            await updateDoc(taskRef, updatedTask);

            return { taskId, updatedTask };
        } catch (error) {
            console.error("Error editing task:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to delete a task
export const deleteTaskFromDB = createAsyncThunk(
    "taskBoard/deleteTaskFromDB",
    async ({ groupID, taskId }, { rejectWithValue }) => {
        try {
            if (!groupID || !taskId) throw new Error("Group ID and Task ID are required to delete a task.");

            const taskRef = doc(db, `groups/${groupID}/tasks/${taskId}`);
            await deleteDoc(taskRef);

            return taskId;
        } catch (error) {
            console.error("Error deleting task:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

const taskBoardSlice = createSlice({
    name: "taskBoard",
    initialState,
    reducers: {
        // Add new category locally
        addCategoryLocally: (state, action) => {
            const { categoryName } = action.payload;
            if (!state.categories[categoryName]) {
                state.categories[categoryName] = [];
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Tasks
            .addCase(fetchTasksFromDB.fulfilled, (state, action) => {
                state.categories = action.payload.categories;
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
                const { category, task } = action.payload;
                if (!state.categories[category]) state.categories[category] = [];
                state.categories[category].push(task);
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
                const { taskId, updatedTask } = action.payload;
                const category = updatedTask.category || "Uncategorized";

                Object.keys(state.categories).forEach((cat) => {
                    const taskIndex = state.categories[cat]?.findIndex((task) => task.id === taskId);
                    if (taskIndex !== -1) {
                        state.categories[cat][taskIndex] = {
                            ...state.categories[cat][taskIndex],
                            ...updatedTask,
                        };
                    }
                });
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
                const taskId = action.payload;

                Object.keys(state.categories).forEach((category) => {
                    state.categories[category] = state.categories[category]?.filter(
                        (task) => task.id !== taskId
                    );
                });
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

export const { addCategoryLocally } = taskBoardSlice.actions;
export default taskBoardSlice.reducer;
