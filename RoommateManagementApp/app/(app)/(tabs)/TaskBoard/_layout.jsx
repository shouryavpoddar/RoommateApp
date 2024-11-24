import {Stack} from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function TaskBoardLayout() {
    const { categoryName } = useLocalSearchParams();

    return (
        // TODO: ADD PROVIDER FOR CONTEXT WRAPPING STACK
        <>
            <Stack screenOptions={{ presentation: 'card', headerShown: false, headerTitleAlign: 'center' }}>
                <Stack.Screen name="index" options={{ title: 'Task Board', headerShown: false }} />
                <Stack.Screen name="AllTasksPage/index" options={{ title: 'All Tasks', headerShown: true }} />
                <Stack.Screen name="TaskCategoryPage/index" options={{ title: 'Category', headerShown: true }} />  
            </Stack>
        </>
        //TODO - pass custom category name to TaskCategoryPage
    );
}