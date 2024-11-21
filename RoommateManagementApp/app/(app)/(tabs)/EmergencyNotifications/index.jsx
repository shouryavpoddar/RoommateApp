import { ScrollView, View, StyleSheet } from 'react-native';
import ButtonGrid from "@/PageElements/EmergencyNotificationsPage/Components/ButtonGrid";
import AddButtonModal from "@/PageElements/EmergencyNotificationsPage/Components/AddButtonModal";
import EmergencyButtonModal from "@/PageElements/EmergencyNotificationsPage/Components/EmergencyButtonModal";
import {useSelector} from "react-redux";
import {EmergencyContext, EmergencyProvider} from "@/PageElements/EmergencyNotificationsPage/Context";
import {useNavigation, useRouter} from "expo-router";


export default function EmergencyNotifications() {
    const navigation = useNavigation();
    const {buttons} = useSelector(state => state.emergency);

    return (
        <EmergencyProvider>
            <AddButtonModal navigation={navigation}/>
            <EmergencyButtonModal/>
            <ScrollView style={styles.scrollContainer} testID='emergency-notifications-page'>
                <ButtonGrid 
                    buttonData={buttons}
                />  
            </ScrollView>
        </EmergencyProvider>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 16, // Equivalent to 'p-4'
        backgroundColor: '#4a154b', // Equivalent to 'bg-[#4a154b]'
    },
});