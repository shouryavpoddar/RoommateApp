import {Redirect, Stack} from "expo-router";
import {useSelector} from "react-redux";


export default function RootLayout() {
    const id= useSelector((state) => state.user.id);

    if (!id) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/log-in" />;
    }

  return  (
      <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
      </Stack>
  )
}
