import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import HomePage from './src/HomePage/HomePage';

export default function App() {
  return (
    <View className='flex-1 justify-center items-center bg-blue-300'>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <HomePage></HomePage>
    </View>
  );
}
