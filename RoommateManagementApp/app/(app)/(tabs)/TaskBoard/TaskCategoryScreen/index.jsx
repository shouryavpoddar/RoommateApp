import { View, Text } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from "react";
import TaskCategoryPage from '@/PageElements/TaskBoardPage/Pages/TaskCategoryPage';

export default function TaskCategoryScreen() {
    const { categoryName } = useLocalSearchParams(); // Extract category name from route params
    const navigation = useNavigation();
    const categories = useSelector((state) => state.taskBoard.categories); // Fetch categories from Redux
    const groupID = useSelector((state) => state.user.groupID); // Fetch group ID

    const categoryTasks = categories[categoryName] || []; // Get tasks for the category

    useEffect(() => {
        if (categoryName) {
            console.log(`Category name is ${categoryName}`);
            navigation.setOptions({
                title: categoryName, // Update navigation title
            });
        } else {
            console.log("No category selected...");
        }
    }, [categoryName, navigation]);

    return (
        <TaskCategoryPage
            categoryName={categoryName}
            groupID={groupID}
            tasks={categoryTasks}
        />
    );
}
