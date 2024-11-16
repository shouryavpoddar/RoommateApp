import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Animated, StyleSheet } from 'react-native';
import { useDispatch } from "react-redux";
import {Redirect, router} from "expo-router";
import {useNavigation} from "expo-router";
import {setId} from "@/StateManagement/Slices/UserSlice";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [scale] = useState(new Animated.Value(1)); // Animation for button press
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleLogin = () => {
        if (username && password) {
            dispatch(setId(username));
            router.replace('/');
        } else {
            Alert.alert('Error', 'Please enter both username and password.');
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
            <Text style={styles.title}>
                Welcome to Roommate App
            </Text>

            <Text style={styles.label}>
                Username
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <Text style={styles.label}>
                Password
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Animated.View style={[styles.buttonContainer, { transform: [{ scale }] }]}>
                <TouchableOpacity
                    onPress={() => {
                        animateButton();
                        handleLogin();
                    }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity onPress={() => {navigation.navigate('sign-in')}}>
                <Text style={styles.signUpText}>Click here to Sign Up</Text>
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
        shadowColor: '#000', // Shadow for input
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
        shadowColor: '#000', // Shadow for button
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
    signUpText: {
        color: '#4A154B', // Purple
        fontSize: 14, // text-sm
        marginTop: 10,
    },
});

export default LoginPage;
