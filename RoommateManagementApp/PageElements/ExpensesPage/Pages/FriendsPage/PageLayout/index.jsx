import { View, StyleSheet } from "react-native";
import React from "react";

const Layout = ({ children, ...restProps }) => {
    return (
        <View style={styles.layout} {...restProps}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        backgroundColor: '#4A154B',
        padding: 16,
    },
});

export default Layout;
