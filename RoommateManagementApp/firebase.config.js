import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import getMessaging from "@react-native-firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDR4zGkotvormMt7wOh88fwqNGPoHxqOxI",
  authDomain: "roomateapp-9ded3.firebaseapp.com",
  projectId: "roomateapp-9ded3",
  storageBucket: "roomateapp-9ded3.appspot.com",
  messagingSenderId: "544040214770",
  appId: "1:544040214770:android:6e8d536c8d76132916f06b",
  databaseURL: "https://roomateapp-9ded3-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const db = getFirestore();
export const messaging = getMessaging();
