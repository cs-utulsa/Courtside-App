import React, { FC, ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type FABProps = {
    children: ReactNode;
    onPress: () => void;
    position?: 'left' | 'right';
    color: string;
};

export const FAB: FC<FABProps> = ({
    children,
    onPress,
    position = 'right',
    color,
}) => {
    let positionStyles = {};

    if (position === 'left') {
        positionStyles = {
            bottom: 15,
            left: 15,
        };
    } else if (position === 'right') {
        positionStyles = {
            bottom: 15,
            right: 15,
        };
    }

    const colorStyles = {
        backgroundColor: color,
    };

    return (
        <Pressable
            style={[styles.btn, positionStyles, colorStyles]}
            onPress={onPress}
            testID="FAB"
        >
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
        alignItems: 'center',
        justifyContent: 'center',
    },
});
