import { ScrollView, View } from 'react-native';
import ButtonGrid from './Components/ButtonGrid'
import AddButtonModal from './Components/AddButtonModal';
import EmergencyButtonModal from './Components/EmergencyButtonModal'
import {useSelector} from "react-redux";
import {EmergencyContext, EmergencyProvider} from "./Context";


// const buttons = [
//     { bgColor: 'bg-blue-500', title: 'Button 1', message: 'Emergency message 1'},
//     { bgColor: 'bg-red-500', title: 'Button 2', message: 'Emergency message 2' },
//     { bgColor: 'bg-green-500', title: 'Button 3', message: 'Emergency message 3' },
//     { bgColor: 'bg-yellow-500', title: 'Button 4', message: 'Emergency message 4' },
//   ];

export default function EmergencyNotifications( {navigation} ) {
    const {buttons} = useSelector(state => state.emergency);

    return (
        <EmergencyProvider>
            <AddButtonModal navigation={navigation}/>
            <EmergencyButtonModal/>
            <ScrollView className="p-4 bg-[#4a154b]">
                <ButtonGrid 
                    buttonData={buttons}
                />  
            </ScrollView>
        </EmergencyProvider>
    );
}