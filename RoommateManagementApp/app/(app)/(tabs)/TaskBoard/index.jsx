import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategoriesFromDB, addCategoryToDB } from '@/StateManagement/Slices/TaskBoardSlice';
import AddCategoryModal from '@/PageElements/TaskBoardPage/PageLayout/Components/AddCategoryModal';

const TaskBoardPage = () => {
    const categories = useSelector((state) => state.taskBoard.categories); // Fetch categories from Redux
    const loading = useSelector((state) => state.taskBoard.loading); // Loading state
    const error = useSelector((state) => state.taskBoard.error); // Error state
    const groupID = useSelector((state) => state.user.groupID); // Fetch group ID from Redux
    const dispatch = useDispatch();
    const router = useRouter();
    const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false); // Local state for modal visibility

    // Fetch tasks from the backend when the component mounts
    useEffect(() => {
        if (groupID) {
            dispatch(fetchCategoriesFromDB({ groupID }));
        }
    }, [groupID, dispatch]);

    const handleAddCategory = async (newCategoryName) => {
        if (!newCategoryName.trim()) {
            alert('Category name cannot be empty!');
            return;
        }

        if (!groupID) {
            alert('Group ID is missing. Cannot add category.');
            return;
        }

        try {
            await dispatch(addCategoryToDB({ groupID, categoryName: newCategoryName })).unwrap();
            alert(`Category "${newCategoryName}" has been added.`);
        } catch (error) {
            console.error('Error adding category:', error);
            alert('Failed to add category. Please try again.');
        } finally {
            setIsAddCategoryModalVisible(false); // Close the modal
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#A0D8B3" />
                <Text style={styles.loaderText}>Loading tasks...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {Object.keys(categories).length > 0 ? (
                    Object.keys(categories).map((categoryName) => (
                        <TouchableOpacity
                            key={categoryName}
                            style={styles.categoryButton}
                            onPress={() =>
                                router.push({
                                    pathname: 'TaskBoard/TaskCategoryScreen',
                                    params: { categoryName },
                                })
                            }
                        >
                            <Text style={styles.categoryButtonText}>{categoryName}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.emptyMessage}>
                        No categories found. Add a new one!
                    </Text>
                )}
            </ScrollView>

            <TouchableOpacity onPress={() => router.push('TaskBoard/AllTasksPage')}>
                <Text style={styles.textButton}>Show My Tasks</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsAddCategoryModalVisible(true)}>
                <Text style={styles.textButton}>Add Category</Text>
            </TouchableOpacity>

            <AddCategoryModal
                visible={isAddCategoryModalVisible}
                onClose={() => setIsAddCategoryModalVisible(false)}
                onAddCategory={handleAddCategory}
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderText: {
        marginTop: 10,
        color: '#A0D8B3',
        fontSize: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: '#FF0000',
        fontSize: 16,
    },
});

export default TaskBoardPage;
