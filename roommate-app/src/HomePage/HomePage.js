import { Button, Text, View } from 'react-native';
import FeatureTile from './FeatureTile';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
    const navigation = useNavigation();

    return (
        <View>
            <FeatureTile/>
            <Button title="Go to test" onPress={() => navigation.navigate('Tester')} />
        </View>
    )
}