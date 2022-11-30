import React, { FC } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { ORANGE } from '../../styles/colors';

type ButtonProps = {
    text: string;
    onPress: () => void;
    disabled?: boolean;
};
export const Button: FC<ButtonProps> = ({
    text,
    disabled = false,
    onPress,
}) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={[styles.button, disabled && styles.disabled]}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: ORANGE,
        width: '65%',
    },

    text: {
        fontSize: 30,
        textAlign: 'center',
        color: 'black',
    },

    disabled: {
        opacity: 0.3,
    },
});
