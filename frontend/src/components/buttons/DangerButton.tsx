import React, { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type DangerButtonProps = {
    /** The text describing the action of the button */
    text: string;
    /** Function defining what the button does when pressed */
    onPress: () => void;
};

/**
 * A button colored red with red text expressing that when pressed the user will do a dangerous activity
 */
export const DangerButton: FC<DangerButtonProps> = ({ text, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    /** Styles for the actual button */
    button: {
        width: '85%',
        backgroundColor: '#ffcfcd',
        paddingVertical: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    /** Styles for the text of the button */
    text: {
        textAlign: 'center',
        color: 'red',
        fontSize: 16,
        textTransform: 'uppercase',
    },
});
