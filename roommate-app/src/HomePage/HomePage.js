import { Button, Text, View } from 'react-native';
import FeatureTile from './FeatureTile';
import { useNavigation } from '@react-navigation/native';
import CalendarWidget from "../Pages/Calander/PageLayout/Components/CalendarWidget/homeWidget";

export default function HomePage() {
    const navigation = useNavigation();

    return (
        <View>
            <CalendarWidget/>
        </View>
    );
}
