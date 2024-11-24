import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const MembersModal = ({ membersData, selectedMembers, toggleMember, onClose }) => (
    <View style={styles.modal}>
        <Text style={styles.title}>Select Members</Text>
        <FlatList
            data={membersData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.memberRow}
                    onPress={() => toggleMember(item)}
                >
                    <Text style={styles.memberName}>{item.name}</Text>
                    {selectedMembers.includes(item.id) && (
                        <Icon name="check" size={20} color="#2BAC76" />
                    )}
                </TouchableOpacity>
            )}
        />
        <TouchableOpacity style={styles.doneButton} onPress={onClose}>
            <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#FFFFFF', // bg-white
        padding: 16, // p-4
        borderRadius: 12, // rounded-lg
        width: '75%', // w-3/4
    },
    title: {
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
    doneButton: {
        backgroundColor: '#2BAC76', // bg-[#2BAC76]
        marginTop: 16, // mt-4
        padding: 8, // p-2
        borderRadius: 12, // rounded-lg
        alignItems: 'center', // items-center
    },
    doneButtonText: {
        color: '#FFFFFF', // text-white
        fontWeight: 'bold', // font-bold
    },
});

export default MembersModal;
