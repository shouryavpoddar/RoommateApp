import { Button, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import FeatureTile from './FeatureTile';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
    const navigation = useNavigation();

    return (
        <View>
            <Button title="Go to test" onPress={() => navigation.navigate('Tester')} />
            <ScrollView className="p-4 bg-gray-100">
                {/* Row 1: One wide tile spanning full width */}
                <View className="flex-row justify-center mb-3 mx-1.5">
                    <TouchableOpacity className="bg-blue-500 h-64 flex-1 rounded-md flex justify-center items-center">
                        <Text className="text-white text-xl font-bold">Wide Tile - Full Width</Text>
                    </TouchableOpacity>
                </View>

                {/* Row 2: Two tall tiles side by side */}
                <View className="flex-row justify-center mb-3">
                    <TouchableOpacity className="bg-green-500 h-80 flex-1 rounded-md flex justify-center items-center mx-1.5">
                        <Text className="text-white text-xl font-bold">Tall Tile 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-red-500 h-80 flex-1 rounded-md flex justify-center items-center mx-1.5">
                        <Text className="text-white text-xl font-bold">Tall Tile 2</Text>
                    </TouchableOpacity>
                </View>

                {/* Row 3: Two tiles, one 2/3 width, the other 1/3 */}
                <View className="flex-row justify-center mb-3">
                    {/*for some reason the flex-n values are scaling the opposite of what would be expected??? I'm ignoring for now but idk why*/}
                    <TouchableOpacity className="bg-purple-500 h-64 flex-1 rounded-md flex justify-center items-center mx-1.5"> 
                        <Text className="text-white text-xl font-bold">Wide Tile (2/3)</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-yellow-500 h-64 flex-2 rounded-md flex justify-center items-center mx-1.5">
                        <Text className="text-white text-xl font-bold">Small Tile (1/3)</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}