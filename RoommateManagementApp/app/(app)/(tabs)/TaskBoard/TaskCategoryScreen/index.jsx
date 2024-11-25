import { View, Text } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from "react";
import TaskCategoryPage from '@/PageElements/TaskBoardPage/Pages/TaskCategoryPage';

export default function TaskCategoryScreen() {
    const { categoryName } = useLocalSearchParams();
    const dispatch = useDispatch();
    const navigation = useNavigation();


    const categories = useSelector((state) => state.taskBoard.categories);
    const category = categories.find(cat => cat.name === categoryName)

    useEffect(() => {
        if (category) {
            console.log(`Category name is ${category.name}`)
            navigation.setOptions({
                title: category.name
            })
        }
        else{
            console.log("No category...")
        }
    })

    return (
        <TaskCategoryPage category={category}/>
    );
}