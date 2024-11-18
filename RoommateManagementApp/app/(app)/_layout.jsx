import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { auth } from "../../firebase.config"; // Ensure this is correct
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const id = useSelector((state) => state.user.id);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (currentUser) => {
    console.log("onAuthStateChanged", currentUser);
    setUser(currentUser);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return () => unsubscribe();
  }, []);

  if (!user && !initializing) {
    return <Redirect href="/log-in" />;
  }

  if (initializing) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
