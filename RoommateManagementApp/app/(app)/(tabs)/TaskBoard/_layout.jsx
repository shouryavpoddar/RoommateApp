import { TaskBoardProvider } from "@/PageElements/TaskBoardPage/Context";
import {Stack} from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function TaskBoardLayout() {
    const { categoryName } = useLocalSearchParams();

    return (
        <TaskBoardProvider>
            <Stack screenOptions={{ presentation: 'card', headerShown: false, headerTitleAlign: 'center' }}>
                <Stack.Screen name="index" options={{ title: 'Task Board', headerShown: false }} />
                <Stack.Screen name="AllTasksPage/index" options={{ title: 'All Tasks', headerShown: true }} />
                <Stack.Screen name="TaskCategoryScreen/index" options={{ title: 'Category', headerShown: true }} />  
            </Stack>
        </TaskBoardProvider>
    );
}