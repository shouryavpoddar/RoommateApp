import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import auth from "@react-native-firebase/auth"; 
import { useState, useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const id = useSelector((state) => state.user.id);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (user) => {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged); 
    return subscriber;
  }, [initializing]); 

  if (!id) {
    // If the user is not authenticated, redirect to the login page
    return <Redirect href="/log-in" />;
  }

  if (initializing)
    return (
        <View
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
            }}>
            <ActivityIndicator size="large" />
        </View>
    );

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
