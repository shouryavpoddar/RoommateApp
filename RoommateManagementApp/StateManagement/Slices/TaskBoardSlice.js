import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "@/firebase.config";
import {doc, collection, setDoc, deleteDoc, getDocs, updateDoc, getDoc} from "firebase/firestore";
import uuid from "react-native-uuid";

const initialState = {
    categories: {}, // Categories with tasks fetched from Firebase
    loading: false,
    error: null,
};

// Fetch all categories from the backend
export const fetchCategoriesFromDB = createAsyncThunk(
    "taskBoard/fetchCategoriesFromDB",
    async ({ groupID }, { rejectWithValue }) => {
        try {
            if (!groupID) throw new Error("Group ID is required to fetch categories.");

            const categories = {};
            const categoriesRef = collection(db, `groups/${groupID}/categories`);
            const snapshot = await getDocs(categoriesRef);

            snapshot.forEach((doc) => {
                const categoryData = doc.data();
                const categoryName = categoryData.name;
                categories[categoryName] = categoryData.tasks || [];
            });

            return { categories };
        } catch (error) {
            console.error("Error fetching categories:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Add a new task to a category
export const addTaskToCategoryDB = createAsyncThunk(
    "taskBoard/addTaskToCategoryDB",
    async ({ groupID, categoryName, task }, { rejectWithValue }) => {
        try {
            if (!groupID || !categoryName) throw new Error("Group ID and category name are required.");

            const taskID = uuid.v4();
            const taskData = { ...task, id: taskID };

            const categoryRef = doc(db, `groups/${groupID}/categories/${categoryName}`);
            const categorySnapshot = await getDoc(categoryRef);
            const category = categorySnapshot.exists() ? categorySnapshot.data() : { tasks: [] };

            const updatedTasks = [...category.tasks, taskData];
            await setDoc(categoryRef, { name: categoryName, tasks: updatedTasks });

            return { categoryName, task: taskData };
        } catch (error) {
            console.error("Error adding task to category:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Edit a task in a category
export const editTaskInCategoryDB = createAsyncThunk(
    "taskBoard/editTaskInCategoryDB",
    async ({ groupID, categoryName, taskId, updatedTask }, { rejectWithValue }) => {
        try {
            console.log("Editing task in category:", { groupID, categoryName, taskId, updatedTask });
            if (!groupID || !categoryName || !taskId) {
                throw new Error("Group ID, category name, and task ID are required.");
            }

            const categoryRef = doc(db, `groups/${groupID}/categories/${categoryName}`);
            const categorySnapshot = await getDoc(categoryRef);

            if (!categorySnapshot.exists()) throw new Error("Category does not exist.");

            const category = categorySnapshot.data();
            const updatedTasks = category.tasks.map((task) =>
                task.id === taskId ? { ...task, ...updatedTask } : task
            );

            await setDoc(categoryRef, { name: categoryName, tasks: updatedTasks });

            return { categoryName, taskId, updatedTask };
        } catch (error) {
            console.error("Error editing task in category:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Delete a task from a category
export const deleteTaskFromCategoryDB = createAsyncThunk(
    "taskBoard/deleteTaskFromCategoryDB",
    async ({ groupID, categoryName, taskId }, { rejectWithValue }) => {
        try {
            if (!groupID || !categoryName || !taskId) {
                throw new Error("Group ID, category name, and task ID are required.");
            }

            const categoryRef = doc(db, `groups/${groupID}/categories/${categoryName}`);
            const categorySnapshot = await getDoc(categoryRef);

            if (!categorySnapshot.exists()) throw new Error("Category does not exist.");

            const category = categorySnapshot.data();
            const updatedTasks = category.tasks.filter((task) => task.id !== taskId);

            await setDoc(categoryRef, { name: categoryName, tasks: updatedTasks });

            return { categoryName, taskId };
        } catch (error) {
            console.error("Error deleting task from category:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Add a new category
export const addCategoryToDB = createAsyncThunk(
    "taskBoard/addCategoryToDB",
    async ({ groupID, categoryName }, { rejectWithValue }) => {
        try {
            if (!groupID || !categoryName) throw new Error("Group ID and category name are required.");

            const categoryRef = doc(db, `groups/${groupID}/categories/${categoryName}`);
            const categoryData = { name: categoryName, tasks: [] };

            await setDoc(categoryRef, categoryData);

            return { categoryName };
        } catch (error) {
            console.error("Error adding category:", error.message);
            return rejectWithValue(error.message);
        }
    }
);

const taskBoardSlice = createSlice({
    name: "taskBoard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Categories
            .addCase(fetchCategoriesFromDB.fulfilled, (state, action) => {
                state.categories = action.payload.categories;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchCategoriesFromDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategoriesFromDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Task
            .addCase(addTaskToCategoryDB.fulfilled, (state, action) => {
                const { categoryName, task } = action.payload;
                if (!state.categories[categoryName]) state.categories[categoryName] = [];
                state.categories[categoryName].push(task);
                state.loading = false;
                state.error = null;
            })
            .addCase(addTaskToCategoryDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTaskToCategoryDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Edit Task
            .addCase(editTaskInCategoryDB.fulfilled, (state, action) => {
                const { categoryName, taskId, updatedTask } = action.payload;
                const categoryTasks = state.categories[categoryName] || [];
                const taskIndex = categoryTasks.findIndex((task) => task.id === taskId);
                if (taskIndex !== -1) {
                    categoryTasks[taskIndex] = { ...categoryTasks[taskIndex], ...updatedTask };
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(editTaskInCategoryDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(editTaskInCategoryDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Task
            .addCase(deleteTaskFromCategoryDB.fulfilled, (state, action) => {
                const { categoryName, taskId } = action.payload;
                state.categories[categoryName] = state.categories[categoryName].filter(
                    (task) => task.id !== taskId
                );
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteTaskFromCategoryDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteTaskFromCategoryDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Category
            .addCase(addCategoryToDB.fulfilled, (state, action) => {
                const { categoryName } = action.payload;
                if (!state.categories[categoryName]) {
                    state.categories[categoryName] = [];
                }
                state.loading = false;
                state.error = null;
            })
            .addCase(addCategoryToDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCategoryToDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default taskBoardSlice.reducer;
