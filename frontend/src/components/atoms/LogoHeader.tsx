import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';

type LogoHeaderProps = {
    style?: {};
};
export const LogoHeader: FC<LogoHeaderProps> = ({ style }) => {
    return <Text style={[styles.header, style]}>Courtside</Text>;
};

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontFamily: 'BungeeShade',
        color: '#EE6730',
        textAlign: 'center',
    },
});
