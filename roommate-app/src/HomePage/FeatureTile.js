import { Text, TouchableHighlight, View, Image, TouchableOpacity } from 'react-native';

const onPress = () => {console.log("you clicked me!")};

export default function FeatureTile() {
    return (
        <View className='w-20 h-20'> 
            <TouchableOpacity className='flex-1 flex-row bg-white' onPress={onPress}>
                <View className='flex-1'>
                    <Image 
                        source={require("../../assets/favicon.png")}
                        className='w-full h-full'
                        resizeMode='contain'/>
                    <Text className="text-red-600">Workiin!</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}