import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    ScrollView,
    Alert,
    StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '@/StateManagement/Slices/UserSlice';
import ProfileModal from '@/PageElements/SettingsPage/Components/ProfileModal';
import PasswordModal from '@/PageElements/SettingsPage/Components/PasswordModal';
import TermsOfServiceModal from '@/PageElements/SettingsPage/Components/TermsOfServiceModal';
import PrivacyPolicyModal from '@/PageElements/SettingsPage/Components/PrivacyPolicyModal';
import { SettingsContext, SettingsProvider } from '@/PageElements/SettingsPage/Context';
import {router} from "expo-router";
import {auth} from "../../../firebase.config";

export function SettingsScreenContent() {
    const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
    const dispatch = useDispatch();
    const { isProfileModalVisible, setIsProfileModalVisible, isPasswordModalVisible, setIsPasswordModalVisible } = useContext(SettingsContext);

    const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
    const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);

    // const [loading, setLoading] = useState(false);

    const logoutUser = async () => {
        // setLoading(true); // Set loading to true when logout starts
        try {
            await auth.signOut(); // Sign out the current user
            dispatch(logout()); // Clear user ID in Redux state
            router.navigate("/log-in"); // Navigate to login page
        } catch (e) {
            // Alert.alert('Logout failed', e.message);
        }
        // } finally {
        //     setLoading(false); // Reset loading to false when logout completes
        // }
    };

    const handleLogout = () => {
        //for now while working on web browser and can't see alert, making it log out automatically without asking - TODO fix
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Log Out", onPress: () => logoutUser() }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <TouchableOpacity
                        style={[styles.listItem, styles.divider]}
                        onPress={() => setIsProfileModalVisible(true)}
                    >
                        <Text style={styles.listText}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.listItem, styles.divider]}
                        onPress={() => setIsPasswordModalVisible(true)}
                    >
                        <Text style={styles.listText}>Change Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Log Out</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    <View style={styles.notificationItem}>
                        <Text style={styles.listText}>Enable Notifications</Text>
                        <Switch
                            testID="notifications-switch"
                            value={isNotificationsEnabled}
                            onValueChange={() => setNotificationsEnabled(!isNotificationsEnabled)}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>
                    <TouchableOpacity
                        style={[styles.listItem, styles.divider]}
                        onPress={() => setIsTermsModalVisible(true)}
                    >
                        <Text style={styles.listText}>Terms of Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.listItem, styles.divider]}
                        onPress={() => setIsPrivacyModalVisible(true)}
                    >
                        <Text style={styles.listText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.listItem}>
                        <Text style={styles.listText}>App Version: 1.0.0</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ProfileModal
                isVisible={isProfileModalVisible}
                onClose={() => setIsProfileModalVisible(false)}
            />
            <PasswordModal
                isVisible={isPasswordModalVisible}
                onClose={() => setIsPasswordModalVisible(false)}
            />
            <TermsOfServiceModal
                isVisible={isTermsModalVisible}
                onClose={() => setIsTermsModalVisible(false)}
            />
            <PrivacyPolicyModal
                isVisible={isPrivacyModalVisible}
                onClose={() => setIsPrivacyModalVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4B225F',
    },
    scrollContainer: {
        padding: 16,
    },
    section: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    listItem: {
        paddingVertical: 12,
    },
    listText: {
        fontSize: 16,
        color: '#333333',
    },
    logoutText: {
        fontSize: 16,
        color: '#FF3B30',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    notificationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
});
