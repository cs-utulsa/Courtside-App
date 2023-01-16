import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import React, { FC } from 'react';
import { ORANGE } from '../../styles/colors';

type AuthSubmitButtonProps = {
    /** The function that is run when the button is pressed, i.e., the function that is called to submit the auth data */
    submitFn: () => void;
    /** Whether or not the form is in a loading state */
    loading: boolean;
    /** Whether or not the form is in a disabled state, i.e., users cannot interact with the button */
    disabled: boolean;
    /** The text that is displayed on the button */
    text: 'Sign In' | 'Sign Up';
};
/**
 * This component is used for users to submit auth forms.
 */
export const AuthSubmitButton: FC<AuthSubmitButtonProps> = ({
    submitFn,
    loading,
    disabled,
    text,
}) => {
    const handleSubmit = () => {
        if (!disabled) submitFn();
    };

    if (loading) {
        return (
            <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
                <ActivityIndicator color="black" />
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            <Text style={styles.submitText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    /** Styles for the button */
    submit: {
        width: '60%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: ORANGE,
        marginTop: 10,
    },
    /** Styles for the button text */
    submitText: {
        fontSize: 20,
        textAlign: 'center',
    },
});
