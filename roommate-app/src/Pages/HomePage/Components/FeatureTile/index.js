import { Text, TouchableOpacity } from 'react-native';

const onPress = () => {console.log("you clicked me!")};

export default function FeatureTile({ bgColor, flex, text, onPress}) {
    return (
        <TouchableOpacity className={`h-64 rounded-md flex justify-center items-center mx-1.5 ${bgColor} ${flex}`} onPress={onPress}>
            <Text className="text-white text-xl font-bold">{text}</Text>
        </TouchableOpacity>    
    )
}
