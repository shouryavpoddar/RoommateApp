import { TaskBoardProvider } from "@/PageElements/TaskBoardPage/Context";
import { Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router";

export default function TaskBoardLayout() {
    const { categoryName } = useLocalSearchParams();

    return (
        <TaskBoardProvider>
            <Stack
                screenOptions={{
                    presentation: 'card',
                    headerStyle: { backgroundColor: '#8A7191' }, // Pink header background
                    headerTintColor: '#FFFFFF', // White back arrow and icons
                    headerTitleStyle: {
                        fontWeight: 'bold', // Bold title
                        fontSize: 20, // Title size
                    },
                    headerBackTitleVisible: false, // Hide back title (e.g., "TaskBoardPage")
                    headerTitleAlign: 'center', // Center the header title
                }}
            >
                <Stack.Screen
                    name="index"
                    options={{
                        title: 'Task Board',
                        headerShown: false, // Hide header for Task Board page
                    }}
                />
                <Stack.Screen
                    name="AllTasksPage/index"
                    options={{
                        title: 'All Tasks',
                        headerShown: true, // Show header
                    }}
                />
                <Stack.Screen
                    name="TaskCategoryScreen/index"
                    options={{
                        title: categoryName || 'Category', // Dynamically set title
                        headerStyle: { backgroundColor: '#8A7191' }, // Pink header background
                        headerTintColor: '#FFFFFF', // White back arrow and icons
                        headerTitleStyle: {
                            color: '#FFFFFF', // White title text
                            fontWeight: 'bold',
                            fontSize: 20,
                        },
                        headerBackTitleVisible: false, // Hide back title
                    }}
                />
            </Stack>
        </TaskBoardProvider>
    );
}
