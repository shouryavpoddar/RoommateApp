import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomePage from './src/Pages/HomePage/HomePage';
import Tester from './src/Pages/HomePage/Tester';


const {Navigator, Screen} = createNativeStackNavigator();


export default function App() {
  
  return (
    /*<View className='flex-1 justify-center items-center bg-blue-300'>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <HomePage></HomePage>
    </View> */
    <NavigationContainer>
      <Navigator initialRouteName="Home"
        screenOptions={{
          headerLeft: () => (
            <View > 
            <Button
              title="Settings"
              color="#000"
              onPress={() => Alert.alert('Button Pressed!')}
            />
          </View>
          ),
          headerTintColor: '#000', // White text for icons
        }}
        >
        <Screen name="Home" component={HomePage} />
        <Screen name="Tester" component={Tester} />
      </Navigator>
    </NavigationContainer>
  );
}
