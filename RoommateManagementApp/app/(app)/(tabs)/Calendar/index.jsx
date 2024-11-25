import { useEffect } from "react"; // Import useEffect for side effects
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { fetchTasksFromDB } from "@/StateManagement/Slices/CalendarSlice"; // Import the Thunk action
import CalendarWidget from "@/PageElements/CalendarPage/Components/CalendarWidget";
import Tasks from "@/PageElements/CalendarPage/Components/Tasks";
import Layout from "@/PageElements/CalendarPage/PageLayout";
import CalendarEventModal from "@/PageElements/CalendarPage/Components/CalendarEventModal";
import AddEventModal from "@/PageElements/CalendarPage/Components/AddEventModal";
import { useNavigation } from "expo-router";
import { Text } from "react-native";

const CalendarPage = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Redux state for group ID and tasks
    const groupID = useSelector((state) => state.user.groupID);
    const tasks = useSelector((state) => state.calendar.tasks);
    const loading = useSelector((state) => state.calendar.loading);
    const error = useSelector((state) => state.calendar.error);

    // Fetch tasks when the groupID is available or changes
    useEffect(() => {
        if (groupID) {
            console.log("Fetching tasks for groupID:", groupID);
            dispatch(fetchTasksFromDB({ groupID }));
        }
    }, [groupID, dispatch]);

    if (loading) return <Layout><Text>Loading tasks...</Text></Layout>;
    if (error) return <Layout><Text>Error: {error}</Text></Layout>;

    return (
        <Layout>
            <Layout.CalendarSection>
                <CalendarWidget />
            </Layout.CalendarSection>

            <Layout.ScrollSection>
                {/* Pass tasks fetched from Redux to the Tasks component */}
                <Tasks tasks={tasks} />
            </Layout.ScrollSection>

            <Layout.ExpandEventModal>
                <CalendarEventModal groupID={groupID} />
            </Layout.ExpandEventModal>

            <Layout.AddEventModal navigation={navigation}>
                <AddEventModal />
            </Layout.AddEventModal>
        </Layout>
    );
};

export default CalendarPage;
