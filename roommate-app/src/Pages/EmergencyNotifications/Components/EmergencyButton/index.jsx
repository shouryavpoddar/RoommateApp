import { Text, TouchableOpacity } from 'react-native';

const onPress = () => {
    console.log("test");
}

export default function EmergencyButton({ bgColor, title, message}) {
    return (
        <TouchableOpacity 
            className={`rounded-full flex justify-center items-center w-40 h-40 shadow-lg mx-2 ${bgColor}`} 
            onPress={() => console.log(`Emergency button ${title} pressed with message: ${message}`)}
        >
            <Text className="text-white text-xl font-bold">{title}</Text>
        </TouchableOpacity>    
    )
}
