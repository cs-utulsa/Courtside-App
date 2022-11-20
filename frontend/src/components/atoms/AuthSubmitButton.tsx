import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import React, { FC } from 'react';

type AuthSubmitButtonProps = {
    submitFn: () => void;
    loading: boolean;
};

export const AuthSubmitButton: FC<AuthSubmitButtonProps> = ({
    submitFn,
    loading,
}) => {
    return (
        <TouchableOpacity style={styles.submit} onPress={() => submitFn()}>
            {!loading ? (
                <Text style={styles.submitText}>Sign In</Text>
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
        backgroundColor: '#EE6730',
        marginTop: 10,
    },
    submitText: {
        fontSize: 20,
        textAlign: 'center',
    },
});
