import { useAuth } from '@hooks/index';
import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';

/**
 * This component allows the user to access settings about the app and to log out of the app.
 */
export const Settings = () => {
    const { signOut } = useAuth();

    return (
        <View style={styles.pageContainer}>
            <Pressable onPress={signOut} style={styles.logOutButton}>
                <Text style={styles.logOutText}>Log Out</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logOutButton: {
        width: '85%',
        backgroundColor: '#ffcfcd',
        paddingVertical: 15,
        borderRadius: 10,
    },
    logOutText: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
        textTransform: 'uppercase',
    },
});
