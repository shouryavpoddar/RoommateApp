import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Animated } from 'react-native';
import { useDispatch } from "react-redux";
import { setId } from "../../StateManagement/Slices/UserSlice";

const SignUpPage = ({ onSwitch }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [scale] = useState(new Animated.Value(1)); // Animation for button press
    const dispatch = useDispatch();

    const handleSignUp = () => {
        if (username && email && password && confirmPassword) {
            if (password === confirmPassword) {
                dispatch(setId(username)); // Assuming successful signup, setting user ID
                Alert.alert('Success', 'You have signed up successfully!');
                onSwitch(); // Navigate back to LoginPage after successful signup
            } else {
                Alert.alert('Error', 'Passwords do not match.');
            }
        } else {
            Alert.alert('Error', 'Please fill all fields.');
        }
    };

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(scale, { toValue: 0.95, duration: 100, useNativeDriver: true }),
            Animated.timing(scale, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
    };

    return (
        <View className="flex-1 justify-center items-center bg-[#EDEFF7] p-5">
            <Text className="text-4xl text-center font-bold mb-12 text-[#4A154B] tracking-wider">
                Create an Account
            </Text>

            <Text className="text-lg font-semibold text-[#4A154B] mb-1 self-start">
                Username
            </Text>
            <TextInput
                className="w-full h-12 border border-[#4A154B] rounded-full px-4 mb-5 bg-[#EDEFF7] shadow"
                placeholder="Enter your username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <Text className="text-lg font-semibold text-[#4A154B] mb-1 self-start">
                Email
            </Text>
            <TextInput
                className="w-full h-12 border border-[#4A154B] rounded-full px-4 mb-5 bg-[#EDEFF7] shadow"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text className="text-lg font-semibold text-[#4A154B] mb-1 self-start">
                Password
            </Text>
            <TextInput
                className="w-full h-12 border border-[#4A154B] rounded-full px-4 mb-5 bg-[#EDEFF7] shadow"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Text className="text-lg font-semibold text-[#4A154B] mb-1 self-start">
                Confirm Password
            </Text>
            <TextInput
                className="w-full h-12 border border-[#4A154B] rounded-full px-4 mb-5 bg-[#EDEFF7] shadow"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
            />

            <Animated.View className="w-full mb-4" style={{ transform: [{ scale }] }}>
                <TouchableOpacity
                    onPress={() => {
                        animateButton();
                        handleSignUp();
                    }}
                    className="bg-[#2BAC76] py-4 rounded-full items-center shadow-lg"
                >
                    <Text className="text-[#4A154B] text-lg font-bold tracking-wide">
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity onPress={onSwitch}>
                <Text className="text-[#4A154B] text-sm">Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignUpPage;
