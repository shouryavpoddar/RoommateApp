import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { settleExpense } from '@/StateManagement/Slices/ExpensesSlice';
import Layout from './PageLayout';
import BalanceHeader from './PageLayout/Components/BalanceHeader';
import ExpenseItem from './PageLayout/Components/ExpenseItem';
import SettleExpenseModalContent from './PageLayout/Components/SettleExpenseModalContent';

const GroupPage = ({ name, friendId }) => {
    const dispatch = useDispatch();
    const groupID = useSelector((state) => state.user.groupID);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    // Current user's ID
    const currentUser = useSelector((state) => state.user.id);

    // Filter expenses involving the selected friend
    const expenses = useSelector((state) =>
        state.expenses.expenses.filter(
            (expense) =>
                (expense.OwedTo === currentUser && expense.OwedBy === friendId) ||
                (expense.OwedTo === friendId && expense.OwedBy === currentUser)
        )
    );

    // Calculate balance with the friend
    const balance = expenses.reduce(
        (acc, expense) => {
            if (expense.OwedTo === currentUser) {
                return acc + expense.amount; // Friend owes current user
            } else if (expense.OwedBy === currentUser) {
                return acc - expense.amount; // Current user owes friend
            }
            return acc;
        },
        0 // Initial value for balance
    );

    const handleExpensePress = (expense) => {
        setSelectedExpense(expense);
        setModalVisible(true);
    };

    const handleSettleExpense = async () => {
        if (!selectedExpense) return;

        try {
            // Dispatch the settleExpense action
            dispatch(settleExpense({ expenseId: selectedExpense.id, groupID: groupID}));

            // Show success message
            Alert.alert("Expense Settled", `The expense "${selectedExpense.description}" has been settled.`);

            // Close modal and reset selected expense
            setModalVisible(false);
            setSelectedExpense(null);
        } catch (error) {
            // Handle error during settle expense
            console.error("Failed to settle expense:", error);
            Alert.alert("Error", "Failed to settle the expense. Please try again.");
        }
    };

    return (
        <Layout>
            <Layout.BalanceSection>
                <BalanceHeader name={name} balance={balance.toFixed(2)} />
            </Layout.BalanceSection>

            <Layout.ScrollSection
                data={expenses}
                renderItem={({ item }) => <ExpenseItem item={item} onPress={handleExpensePress} />}
                keyExtractor={(item) => item.id}
            />

            <Layout.SettleExpenseModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                <SettleExpenseModalContent
                    expense={selectedExpense}
                    onConfirm={handleSettleExpense}
                    onClose={() => setModalVisible(false)}
                />
            </Layout.SettleExpenseModal>
        </Layout>
    );
};

export default GroupPage;
