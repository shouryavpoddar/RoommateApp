import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Animated,
    StyleSheet,
} from "react-native";
import { useDispatch } from "react-redux";
import { router } from "expo-router"; // For navigation
import { auth, db } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { signUp } from "@/StateManagement/Slices/UserSlice";

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [groupID, setGroupID] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [scale] = useState(new Animated.Value(1)); // Animation for button press
    const dispatch = useDispatch();

    const handleSignUp = async () => {
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match.");
            return;
        }

        try {
            // Create user with Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;

            // Dispatch the signUp Thunk
            await dispatch(signUp({ uid, email, username, groupID })).unwrap();

            Alert.alert("Success", "Your account has been created successfully!");
            router.push("/log-in");
        } catch (error) {
            console.error("Sign up failed:", error);
            Alert.alert("Sign up failed", error.message);
        }
    };

    const generateGroupID = () => {
        const newGroupID = Math.floor(100000 + Math.random() * 900000).toString();
        setGroupID(newGroupID);
        Alert.alert("Success", `Your new group ID is ${newGroupID}`);
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>

            <Text style={styles.label}>Username</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <Text style={styles.label}>Group ID</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter group ID"
                value={groupID}
                onChangeText={setGroupID}
            />
            <TouchableOpacity onPress={generateGroupID}>
                <Text style={styles.linkText}>Creating a new group? Click here for a group ID</Text>
            </TouchableOpacity>

            <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
                <TouchableOpacity
                    onPress={() => {
                        animateButton();
                        handleSignUp();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity onPress={() => router.push("/log-in")}>
                <Text style={styles.switchText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EDEFF7",
        padding: 20,
    },
    title: {
        fontSize: 32,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 48,
        color: "#4A154B",
        letterSpacing: 2,
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        color: "#4A154B",
        marginBottom: 8,
        alignSelf: "flex-start",
    },
    input: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#4A154B",
        borderRadius: 24,
        paddingHorizontal: 16,
        marginBottom: 20,
        backgroundColor: "#EDEFF7",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonContainer: {
        width: "100%",
        marginBottom: 16,
    },
    button: {
        backgroundColor: "#2BAC76",
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: "#4A154B",
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
    },
    switchText: {
        color: "#4A154B",
        fontSize: 14,
        marginTop: 10,
    },
    linkText: {
        color: "#2BAC76",
        fontSize: 14,
        textDecorationLine: "underline",
        marginBottom: 20,
    },
});

export default SignUpPage;
