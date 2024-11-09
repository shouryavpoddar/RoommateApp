import { Text, TouchableOpacity } from 'react-native';

export default function FeatureTile({ bgColor, flex, text, TileComponent, onPress}) {
    return (
        <TouchableOpacity 
            className={`rounded-md flex justify-center items-center mx-1.5 ${bgColor} ${flex} ${TileComponent ? '' : 'h-48'}`} 
            onPress={onPress}>
            {TileComponent ? <TileComponent /> : <Text className="text-white text-xl font-bold">{text}</Text>}
        </TouchableOpacity>    
    )
}
