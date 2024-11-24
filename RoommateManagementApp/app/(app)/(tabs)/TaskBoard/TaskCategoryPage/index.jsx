import { View, Text } from "react-native";
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from "react";
//import AddExpenseScreen from "@/PageElements/ExpensesPage/Pages/AddExpensePage";

export default function TaskCategoryPage() {
    const { categoryName } = useLocalSearchParams();
    const navigation = useNavigation();

    useEffect(() => {
        if (categoryName) {
            navigation.setOptions({
                title: categoryName
            })
        }
    })

    return (
        <View>
            <Text>Task Category: {categoryName} Page</Text>
        </View>
    );
}