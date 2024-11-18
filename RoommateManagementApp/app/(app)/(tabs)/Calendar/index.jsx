import CalendarWidget from "@/PageElements/CalendarPage/Components/CalendarWidget";
import Tasks from "@/PageElements/CalendarPage/Components/Tasks";
import {useState} from "react";
import Layout from "@/PageElements/CalendarPage/PageLayout";
import CalendarEventModal from "@/PageElements/CalendarPage/Components/CalendarEventModal";
import AddEventModal from "@/PageElements/CalendarPage/Components/AddEventModal";
import {useNavigation, useRouter} from "expo-router";


const CalendarPage = () => {
    const navigation = useNavigation();
    const router = useRouter()
    // Initial example tasks for specific dates
    const [tasks, setTasks] = useState({
        '2024-10-17': [
            { title: 'PHYS 121 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 11:59 PM', created: "User X" },
            { title: 'PHYS 122 Labs', subtitle: 'Lab #5: COL', description: 'Complete the lab report for COL', due: 'Due at 1:59 PM', created: "User Y" },
        ],
        '2024-10-24': [
            { title: 'PHYS 122 Labs', subtitle: 'Lab #4: COL', description: 'Complete the lab report for COL', due: 'Due at 1:59 PM', created: "User Y" },
        ],
    });


    return (
        <Layout>
            <Layout.CalendarSection>
                <CalendarWidget/>
            </Layout.CalendarSection>


            <Layout.ScrollSection>
               <Tasks tasks={tasks} />
            </Layout.ScrollSection>

            <Layout.ExpandEventModal>
                <CalendarEventModal/>
            </Layout.ExpandEventModal>

            <Layout.AddEventModal navigation={navigation}>
                <AddEventModal/>
            </Layout.AddEventModal>
        </Layout>
    );
};

export default CalendarPage;
