// src/StateManagement/Slices/ExpensesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/firebase.config';
import { doc, collection, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

// Initial state
const initialState = {
    expenses: [],
    loading: false,
    error: null,
};

// Thunk to fetch expenses for a group from Firebase
export const fetchExpensesFromDB = createAsyncThunk(
    'expenses/fetchExpensesFromDB',
    async ({ groupID }, { rejectWithValue }) => {
        try {
            if (!groupID) throw new Error('Group ID is undefined. Cannot fetch expenses.');

            const expenses = [];
            const expensesRef = collection(db, `groups/${groupID}/expenses`);
            console.log("Expense ref received: ", expensesRef)
            const snapshot = await getDocs(expensesRef);
            console.log("Snapshot received: ", snapshot)
            snapshot.forEach((doc) => {
                console.log("Foreaching - current doc is:", doc)
                const expense = doc.data();
                const transformedExpense = transformExpense(expense)
                console.log("added expense to list", transformExpense)
                expenses.push({ id: doc.id, ...transformedExpense });
            });

            return { expenses, groupID };
        } catch (error) {
            console.error('Failed to fetch expenses from DB:', error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to add expenses to Firebase and update the state
export const addExpenseToDB = createAsyncThunk(
    'expenses/addExpenseToDB',
    async ({ groupID, expense }, { rejectWithValue }) => {
        try {
            if (!groupID) throw new Error('Group ID is undefined. Cannot create expense.');

            console.log("Passed group id check")
            // Prepare the expenses reference in Firebase
            const expensesRef = collection(db, `groups/${groupID}/expenses`);

            console.log("passed collection access")
            // Store the expense in Firebase, where Firestore will generate a unique ID for the document
            const newExpenseRef = doc(expensesRef);

            console.log("got new expense ref")
            await setDoc(newExpenseRef, expense); // Add the expense data to Firestore

            console.log("set doc")
            // Return the expense data along with the groupID to update the state
            return { expense, groupID };
        } catch (error) {
            console.error('Failed to add expense to DB:', error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to delete an expense from Firebase and update the state
export const deleteExpenseFromDB = createAsyncThunk(
    'expenses/deleteExpenseFromDB',
    async ({ groupID, expenseId }, { rejectWithValue, dispatch }) => {
        try {
            if (!groupID || !expenseId) throw new Error('Group ID or Expense ID is missing.');

            // Delete the expense from Firebase
            const expenseRef = doc(db, `groups/${groupID}/expenses/${expenseId}`);
            await deleteDoc(expenseRef);

            // Return the expense ID to update the state
            return { expenseId, groupID };
        } catch (error) {
            console.error('Failed to delete expense from DB:', error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Slice with expense management logic
const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Expenses from DB
            .addCase(fetchExpensesFromDB.fulfilled, (state, action) => {
                state.expenses = action.payload.expenses;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchExpensesFromDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchExpensesFromDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Expense to DB
            .addCase(addExpenseToDB.fulfilled, (state, action) => {
                state.expenses.push(action.payload.newExpenses); // Add new expenses to state
                state.loading = false;
                state.error = null;
            })
            .addCase(addExpenseToDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(addExpenseToDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Delete Expense from DB
            .addCase(deleteExpenseFromDB.fulfilled, (state, action) => {
                const { expenseId } = action.payload;
                state.expenses = state.expenses.filter((expense) => expense.id !== expenseId); // Remove deleted expense from state
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteExpenseFromDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteExpenseFromDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Helper function to transform expenses for friends
function transformExpense(expense) {
    console.log("transforming expense", expense)
    const friendIds = expense.members.filter((member) => member !== 'You'); // Exclude "You"

    return friendIds.map((friendId, index) => {
        // Retrieve the percentage for this friend
        const friendPercentage = parseFloat(expense.splitPercentages[friendId]);

        // Calculate the split amount for this friend
        const splitAmount = expense.amount * (friendPercentage / 100);

        return {
            friendId: friendId,
            date: expense.date,
            description: expense.description,
            amount: splitAmount,
            type: 'lent',
        };
    });
}

export default expensesSlice.reducer;






// addExpense: (state, action) => {
//     const baseId = `${Date.now()}`; // Generate a unique base ID for each batch
//     const newExpenses = transformExpense({ ...action.payload, id: baseId });
//     state.expenses.push(...newExpenses);
// },
// settleExpense: (state, action) => {
//     const { expenseId } = action.payload;
//     state.expenses = state.expenses.filter(expense => expense.id !== expenseId);
// },