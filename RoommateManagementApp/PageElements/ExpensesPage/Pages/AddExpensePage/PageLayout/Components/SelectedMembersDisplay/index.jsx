import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const SelectedMembersDisplay = ({ selectedMembers, membersData }) => (
    <View style={styles.selectedMembersDisplay}>
        <Text style={styles.selectedMembersLabel}>With:</Text>
        <View style={styles.selectedMembersContainer}>
            {selectedMembers.map((memberId) => {
                const member = membersData.find((m) => m.id === memberId);
                return (
                    <View key={memberId} style={styles.selectedMember}>
                        <Text style={styles.selectedMemberName}>{member?.name || 'You'}</Text>
                    </View>
                );
            })}
        </View>
    </View>
);

const styles = StyleSheet.create({
    selectedMembersDisplay: {
        marginTop: 16, // mt-4
    },
    selectedMembersLabel: {
        color: '#9E9E9E', // text-gray-500
        fontSize: 14, // Optional: Adjust font size if needed
    },
    selectedMembersContainer: {
        flexDirection: 'row', // flex-row
        flexWrap: 'wrap', // flex-wrap
    },
    selectedMember: {
        backgroundColor: '#F5F5F5', // bg-gray-100
        paddingHorizontal: 12, // px-3
        paddingVertical: 4, // py-1
        borderRadius: 8, // rounded-md
        margin: 4, // m-1
    },
    selectedMemberName: {
        color: '#4A154B', // text-[#4A154B]
        fontWeight: 'bold', // font-bold
    },
});

export default SelectedMembersDisplay;
