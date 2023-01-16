import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ORANGE } from '../../styles/colors';

/**
 * This component displays the logo of the Courtside app.
 */
export const LogoHeader = () => {
    return <Text style={styles.header}>Courtside</Text>;
};

const styles = StyleSheet.create({
    /** Styles for the text in the logo */
    header: {
        fontSize: 40,
        fontFamily: 'BungeeShade',
        color: ORANGE,
        textAlign: 'center',
    },
});
