import React from 'react';
import { View, Modal, TouchableWithoutFeedback, FlatList, StyleSheet } from 'react-native';

const Layout = ({ children, ...restProps }) => {
    return (
        <View style={styles.layout} {...restProps}>
            {children}
        </View>
    );
};

Layout.BalanceSection = ({ children, ...restProps }) => (
    <View style={styles.balanceSection} {...restProps}>
        {children}
    </View>
);

Layout.ScrollSection = ({ children, ...restProps }) => (
    <FlatList
        style={styles.scrollSection}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        {...restProps}
    >
        {children}
    </FlatList>
);

Layout.SettleExpenseModal = ({ visible, children, onClose }) => (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
            <View style={styles.modalBackdrop}>
                <TouchableWithoutFeedback>
                    {children}
                </TouchableWithoutFeedback>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
);

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#4A154B',
        padding: 16,
    },
    balanceSection: {
        marginBottom: 20,
    },
    scrollSection: {
        flex: 1,
    },
    separator: {
        height: 12,
    },
    modalBackdrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default Layout;
