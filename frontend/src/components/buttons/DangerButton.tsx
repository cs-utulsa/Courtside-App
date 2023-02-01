import React, { FC } from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';

type DangerButtonProps = {
    /** The text describing the action of the button */
    text: string;
    /** Function defining what the button does when pressed */
    onPress: () => void;
    /** Whether or not the button is disabled. False by default */
    disabled?: boolean;
};

/**
 * A button colored red with red text expressing that when pressed the user will do a dangerous activity.
 * When the button is pressed an alert will pop up to confirm whether or not the user wants to complete the action.
 */
export const DangerButton: FC<DangerButtonProps> = ({
    text,
    onPress,
    disabled = false,
}) => {
    const createAlert = () => {
        if (disabled) return;

        Alert.alert(
            'Do you want to continue?',
            '',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text,
                    onPress,
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <Pressable
            onPress={createAlert}
            style={[styles.button, disabled && styles.disabled]}
        >
            <Text style={[styles.text, disabled && styles.disabledText]}>
                {text}
            </Text>
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
    disabled: {
        backgroundColor: '#ccc8c9',
    },
    disabledText: {
        color: 'grey',
    },
});
