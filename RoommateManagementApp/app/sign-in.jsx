import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Animated, StyleSheet } from 'react-native';
import { useDispatch } from "react-redux";
import {Redirect, router, useNavigation} from "expo-router";
import {setId} from "@/StateManagement/Slices/UserSlice";

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [scale] = useState(new Animated.Value(1)); // Animation for button press
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleSignUp = () => {
        if (username && email && password && confirmPassword) {
            if (password === confirmPassword) {
                handleAuth();
            } else {
                Alert.alert('Error', 'Passwords do not match.');
            }
        } else {
            Alert.alert('Error', 'Please fill all fields.');
        }
    };

    const handleAuth = async () => {
        try {
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            console.log("User signed up:", userCredential.user);
            Alert.alert('Success', 'You have signed up successfully!');
        } catch (error) {
            console.error("Sign up failed:", error.message);
            Alert.alert('Sign up failed', error.message);
        }
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

            <TouchableOpacity onPress={()=>{navigation.navigate('log-in')} }>
                <Text style={styles.switchText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EDEFF7', // Light gray background
        padding: 20,
    },
    title: {
        fontSize: 32, // text-4xl
        textAlign: 'center',
        fontWeight: 'bold', // font-bold
        marginBottom: 48, // mb-12
        color: '#4A154B', // Purple
        letterSpacing: 2, // tracking-wider
    },
    label: {
        fontSize: 18, // text-lg
        fontWeight: '600', // font-semibold
        color: '#4A154B', // Purple
        marginBottom: 8, // mb-1
        alignSelf: 'flex-start', // self-start
    },
    input: {
        width: '100%',
        height: 48, // h-12
        borderWidth: 1,
        borderColor: '#4A154B', // Purple
        borderRadius: 24, // rounded-full
        paddingHorizontal: 16, // px-4
        marginBottom: 20, // mb-5
        backgroundColor: '#EDEFF7', // Light gray
        shadowColor: '#000', // Shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 16, // mb-4
    },
    button: {
        backgroundColor: '#2BAC76', // Green
        paddingVertical: 16, // py-4
        borderRadius: 24, // rounded-full
        alignItems: 'center',
        shadowColor: '#000', // Shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#4A154B', // Purple
        fontSize: 18, // text-lg
        fontWeight: 'bold', // font-bold
        letterSpacing: 1, // tracking-wide
    },
    switchText: {
        color: '#4A154B', // Purple
        fontSize: 14, // text-sm
        marginTop: 10,
    },
});

export default SignUpPage;
