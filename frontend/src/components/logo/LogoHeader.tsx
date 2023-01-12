import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { ORANGE } from '../../styles/colors';

export const LogoHeader = () => {
    return <Text style={styles.header}>Courtside</Text>;
};

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontFamily: 'BungeeShade',
        color: ORANGE,
        textAlign: 'center',
    },
});
