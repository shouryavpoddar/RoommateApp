import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ExpensesWidget = () => {
    const expenses = useSelector((state) => state.expenses.expenses);
    const currentUser = useSelector((state) => state.user.id); // Current user's ID

    // Filter and calculate total balances
    const totalBalances = expenses.reduce(
        (totals, expense) => {
            if (expense.OwedTo === currentUser) {
                totals.youAreOwed += expense.amount; // Amount owed to the current user
            } else if (expense.OwedBy === currentUser) {
                totals.youOwe += expense.amount; // Amount the current user owes
            }
            return totals;
        },
        { youOwe: 0, youAreOwed: 0 } // Initial totals
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Total Balance</Text>
            <Text style={styles.youOwe}>You owe: ${totalBalances.youOwe.toFixed(2)}</Text>
            <Text style={styles.youAreOwed}>You are owed: ${totalBalances.youAreOwed.toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#E8F7EF',
        borderRadius: 8,
        width: '100%',
        overflow: 'hidden',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A154B',
    },
    youOwe: {
        fontSize: 16,
        color: '#FF0000',
        marginTop: 8,
    },
    youAreOwed: {
        fontSize: 16,
        color: '#2BAC76',
        marginTop: 4,
    },
});

export default ExpensesWidget;
