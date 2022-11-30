import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ORANGE } from '../../styles/colors';

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
        color: ORANGE,
        textAlign: 'center',
    },
});
