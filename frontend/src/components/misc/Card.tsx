import { useTheme } from '@react-navigation/native';
import React, { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

type CardProps = {
    children: ReactNode;
    shadow?: boolean;
};

export const Card: FC<CardProps> = ({ children, shadow = true }) => {
    const { colors } = useTheme();

    return (
        <Shadow
            disabled={!shadow}
            style={[styles.card, { backgroundColor: colors.card }]}
            containerStyle={styles.shadow}
            paintInside
            stretch
            distance={6}
            offset={[0, 3]}
        >
            {children}
        </Shadow>
    );
};

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 10,
        flexGrow: 0,
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 10,
        position: 'relative',
    },
    shadow: {
        alignItems: 'center',
        width: '80%',
        justifyContent: 'center',
        marginVertical: 10,
    },
});
