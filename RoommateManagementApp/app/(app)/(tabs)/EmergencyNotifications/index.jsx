import { ScrollView, View } from 'react-native';
import ButtonGrid from "@/PageElements/EmergencyNotificationsPage/Components/ButtonGrid";
import AddButtonModal from "@/PageElements/EmergencyNotificationsPage/Components/EmergencyButton";
import EmergencyButtonModal from "@/PageElements/EmergencyNotificationsPage/Components/EmergencyButtonModal";
import {useSelector} from "react-redux";
import {EmergencyContext, EmergencyProvider} from "@/PageElements/EmergencyNotificationsPage/Context";


export default function EmergencyNotifications( {navigation} ) {
    const {buttons} = useSelector(state => state.emergency);

    return (
        <EmergencyProvider>
            <AddButtonModal navigation={navigation}/>
            <EmergencyButtonModal/>
            <ScrollView className="p-4 bg-[#4a154b]" testID='emergency-notifications-page'>
                <ButtonGrid 
                    buttonData={buttons}
                />  
            </ScrollView>
        </EmergencyProvider>
    );
}