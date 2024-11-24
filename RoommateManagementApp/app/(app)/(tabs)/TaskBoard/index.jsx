import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { addCategory } from '@/StateManagement/Slices/TaskBoardSlice'; 
import AddCategoryModal from '@/PageElements/TaskBoardPage/PageLayout/Components/AddCategoryModal';

const TaskBoardPage = () => {
    const categories = useSelector((state) => state.taskBoard.categories); // Fetch categories from Redux
    const dispatch = useDispatch();
    const router = useRouter();
    const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = React.useState(false); // Local state for modal visibility

    const handleAddCategory = (newCategoryName) => {
        if (newCategoryName.trim()) {
            dispatch(addCategory({ categoryName: newCategoryName })); // Dispatch Redux action to add a category
        } else {
            alert('Category name cannot be empty!');
        }
        setIsAddCategoryModalVisible(false); // Close the modal after adding
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {categories.length > 0 ? (
                    categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.categoryButton}
                            onPress={() =>
                                router.push({
                                    pathname: 'TaskBoard/TaskCategoryPage',
                                    params: { categoryName: category.name }
                                })
                            }
                        >
                            <Text style={styles.categoryButtonText}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>
                        No categories found. Add a new one!
                    </Text>
                )}
            </ScrollView>

            {/* Text-only buttons */}
            <TouchableOpacity onPress={() => router.push('TaskBoard/AllTasksPage')}>
                <Text style={styles.textButton}>Show My Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsAddCategoryModalVisible(true)}>
                <Text style={styles.textButton}>Add Category</Text>
            </TouchableOpacity>

            {/* Add Category Modal */}
            <AddCategoryModal
                visible={isAddCategoryModalVisible}
                onClose={() => setIsAddCategoryModalVisible(false)}
                onAddCategory={handleAddCategory} // Pass the handler to the modal
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B225F',
        padding: 16,
    },
    scrollView: {
        flexGrow: 1,
    },
    categoryButton: {
        backgroundColor: '#A0D8B3',
        padding: 16,
        marginBottom: 8,
        borderRadius: 8,
    },
    categoryButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        color: '#FFFFFF',
    },
    textButton: {
        textAlign: 'center',
        color: '#A0D8B3',
        fontSize: 16,
        marginVertical: 10,
    },
});

export default TaskBoardPage;
