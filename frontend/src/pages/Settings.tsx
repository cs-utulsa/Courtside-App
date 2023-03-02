import {
    DangerButton,
    PrimaryColorSelector,
    Seperator,
    ThemeSelector,
    ThemeText,
} from '@components/index';
import { useAuth } from '@hooks/index';
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

/**
 * This component allows the user to access settings about the app and to log out of the app.
 */
export const Settings = () => {
    const { signOut, clearData } = useAuth();

    return (
        <ScrollView contentContainerStyle={styles.pageContainer}>
            <ThemeText style={styles.heading}>Account Info</ThemeText>
            <ThemeText style={styles.heading}>Appearance</ThemeText>
            <ThemeSelector />
            <PrimaryColorSelector />
            <ThemeText style={styles.heading}>Actions</ThemeText>
            <DangerButton text="Clear Data" onPress={clearData} />
            <DangerButton text="Log Out" onPress={signOut} />
            <Seperator height={40} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 24,
    },
});
