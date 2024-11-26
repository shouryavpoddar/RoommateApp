import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/firebase.config';
import { doc, collection, setDoc, deleteDoc, getDocs } from 'firebase/firestore';


export const settleExpense = createAsyncThunk(
    'expenses/settleExpense',
    async ({ expenseId, groupID }, { rejectWithValue, getState }) => {
        try {
            if (!groupID || !expenseId) {
                throw new Error('Group ID or Expense ID is missing.');
            }

            // Access the current state for more context (if needed)
            const state = getState();
            const expense = state.expenses.expenses.find((exp) => exp.id === expenseId);

            if (!expense) {
                throw new Error('Expense not found.');
            }

            // Optional: Modify expense to mark it as settled or remove
            const expenseRef = doc(db, `groups/${groupID}/expenses/${expenseId}`);
            await deleteDoc(expenseRef);

            // Return settled expense ID to update the state
            return { expenseId };
        } catch (error) {
            console.error('Failed to settle expense:', error.message);
            return rejectWithValue(error.message);
        }
    }
);


// Helper Function to Transform Input Data
function transformExpenseInput(input) {
    const transformedData = [];
    const { amount, date, description, paidBy, members, splitPercentages } = input;

    members.forEach((member) => {
        if (member !== paidBy) {
            const memberPercentage = parseFloat(splitPercentages[member]) || 0;
            const splitAmount = amount * (memberPercentage / 100);

            transformedData.push({
                amount: splitAmount,
                date: date,
                description: description,
                OwedTo: paidBy,
                OwedBy: member,
            });
        }
    });

    return transformedData;
}

// Initial state
const initialState = {
    expenses: [],
    loading: false,
    error: null,
};

// Fetch expenses from Firebase
export const fetchExpensesFromDB = createAsyncThunk(
    'expenses/fetchExpensesFromDB',
    async ({ groupID }, { rejectWithValue }) => {
        try {
            const expenses = [];
            const expensesRef = collection(db, `groups/${groupID}/expenses`);
            const snapshot = await getDocs(expensesRef);

            snapshot.forEach((doc) => {
                const expense = doc.data();
                expenses.push({ id: doc.id, ...expense });
            });

            return { expenses };
        } catch (error) {
            console.error('Failed to fetch expenses:', error.message);
            return rejectWithValue(error.message);
        }


    }
);

// Add expense to Firebase
export const addExpenseToDB = createAsyncThunk(
    'expenses/addExpenseToDB',
    async ({ groupID, expense }, { rejectWithValue }) => {
        try {
            if (!groupID) throw new Error('Group ID is undefined. Cannot create expense.');

            // Transform expense before storing
            const transformedExpenses = transformExpenseInput(expense);

            // Store each transformed expense in Firebase
            const expensesRef = collection(db, `groups/${groupID}/expenses`);
            const batch = transformedExpenses.map(async (transformedExpense) => {
                const newExpenseRef = doc(expensesRef);
                await setDoc(newExpenseRef, transformedExpense);
                return { id: newExpenseRef.id, ...transformedExpense };
            });

            const savedExpenses = await Promise.all(batch);
            return { expenses: savedExpenses };
        } catch (error) {
            console.error('Failed to add expense to DB:', error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Delete expense from Firebase
export const deleteExpenseFromDB = createAsyncThunk(
    'expenses/deleteExpenseFromDB',
    async ({ groupID, expenseId }, { rejectWithValue }) => {
        try {
            if (!groupID || !expenseId) throw new Error('Group ID or Expense ID is missing.');

            const expenseRef = doc(db, `groups/${groupID}/expenses/${expenseId}`);
            await deleteDoc(expenseRef);

            return { expenseId };
        } catch (error) {
            console.error('Failed to delete expense:', error.message);
            return rejectWithValue(error.message);
        }
    }
);

// Expenses Slice
const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Expenses
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
            // Add Expense
            .addCase(addExpenseToDB.fulfilled, (state, action) => {
                state.expenses.push(...action.payload.expenses);
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
            // Delete Expense
            .addCase(deleteExpenseFromDB.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter(
                    (expense) => expense.id !== action.payload.expenseId
                );
                state.loading = false;
                state.error = null;
            })
            .addCase(deleteExpenseFromDB.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteExpenseFromDB.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(settleExpense.fulfilled, (state, action) => {
                state.expenses = state.expenses.filter(
                    (expense) => expense.id !== action.payload.expenseId
                );
                state.error = null;
                state.loading = false; // Clear loading state if needed
            })
            .addCase(settleExpense.pending, (state) => {
                state.loading = true;
            })
            .addCase(settleExpense.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false; // Clear loading state if needed
            });
    },
});

export default expensesSlice.reducer;
