import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import React, { FC } from 'react';
import { ORANGE } from '../../styles/colors';

type AuthSubmitButtonProps = {
    submitFn: () => void;
    loading: boolean;
    disabled: boolean;
    text: 'Sign In' | 'Sign Up';
};

export const AuthSubmitButton: FC<AuthSubmitButtonProps> = ({
    submitFn,
    loading,
    disabled,
    text,
}) => {
    const handleSubmit = () => {
        if (!disabled) submitFn();
    };

    return (
        <TouchableOpacity style={styles.submit} onPress={handleSubmit}>
            {!loading ? (
                <Text style={styles.submitText}>{text}</Text>
            ) : (
                <ActivityIndicator color="black" />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    submit: {
        width: '60%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: ORANGE,
        marginTop: 10,
    },
    submitText: {
        fontSize: 20,
        textAlign: 'center',
    },
});
