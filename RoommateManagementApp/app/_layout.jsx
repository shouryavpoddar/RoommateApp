import { Slot } from 'expo-router';
import {Provider} from "react-redux";
import {store} from "@/StateManagement/store";
import {messaging} from "@/firebase.config";


// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     console.log('Message handled in the background!', remoteMessage);
// });

messaging.setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // Perform any additional processing you need
});

export default function Root() {
    // Set up the auth context and render our layout inside of it.
    return (
        <Provider store={store}>
            <Slot />
        </Provider>
    );
}
