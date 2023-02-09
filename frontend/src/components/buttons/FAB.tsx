import { ORANGE } from '@styles/colors';
import React, { FC, ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type FABProps = {
    children: ReactNode;
    onPress: () => void;
};

export const FAB: FC<FABProps> = ({ children, onPress }) => {
    return (
        <Pressable style={styles.btn} onPress={onPress}>
            {children}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btn: {
        position: 'absolute',
        borderRadius: 10,
        width: 60,
        height: 60,
        bottom: 10,
        right: 10,
        backgroundColor: ORANGE,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
