import React from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

const SplitPercentageModal = ({ selectedMembers, membersData, splitPercentages, setSplitPercentages, onClose }) => (
    <View style={styles.modalContainer}>
        <Text style={styles.headerText}>Set Split Percentages</Text>
        {selectedMembers.map((memberId) => {
            const member = membersData.find((m) => m.id === memberId);
            return (
                <View key={memberId} style={styles.memberRow}>
                    <Text style={styles.memberName}>{member?.name || 'You'}</Text>
                    <TextInput
                        style={styles.percentageInput}
                        placeholder="0"
                        placeholderTextColor="#9E9E9E"
                        keyboardType="numeric"
                        value={splitPercentages[member?.id || 'You']?.toString() || ''}
                        onChangeText={(value) => setSplitPercentages((prev) => ({ ...prev, [member?.id || 'You']: value }))} 
                    />
                    <Text style={styles.percentageText}>%</Text>
                </View>
            );
        })}
        <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: '#FFFFFF', // bg-white
        padding: 16, // p-4
        borderRadius: 12, // rounded-lg
        width: '75%', // w-3/4
    },
    headerText: {
        fontSize: 18, // text-lg
        fontWeight: 'bold', // font-bold
        color: '#4A154B', // text-[#4A154B]
        marginBottom: 16, // mb-4
    },
    memberRow: {
        flexDirection: 'row', // flex-row
        justifyContent: 'space-between', // justify-between
        alignItems: 'center', // items-center
        paddingVertical: 8, // py-2
    },
    memberName: {
        color: '#4A154B', // text-[#4A154B]
    },
    percentageInput: {
        borderWidth: 1, // border
        borderColor: '#D1D1D1', // border-gray-300
        borderRadius: 8, // rounded-md
        paddingHorizontal: 8, // px-2
        paddingVertical: 4, // py-1
        textAlign: 'right', // text-right
        width: 60, // Adjust width to fit the input
    },
    percentageText: {
        color: '#4A154B', // text-[#4A154B]
        marginLeft: 8, // ml-2
    },
    doneButton: {
        backgroundColor: '#2BAC76', // bg-[#2BAC76]
        marginTop: 16, // mt-4
        paddingVertical: 8, // py-2
        paddingHorizontal: 16, // px-4
        borderRadius: 8, // rounded-lg
        alignItems: 'center', // items-center
    },
    doneButtonText: {
        color: '#FFFFFF', // text-white
        fontWeight: 'bold', // font-bold
    },
});

export default SplitPercentageModal;
