import { ErrorBox, LogoHeader, PrimaryButton } from '@components/index';
import { useAuth } from '@hooks/useAuth';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-root-toast';

export const VerifyEmailScreen = () => {
    const { authData, resendEmailVerification, signOut, authError } = useAuth();

    const onResendPress = () => {
        Toast.show('Sending verification...', {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
        });
        resendEmailVerification();
    };

    return (
        <View style={styles.container}>
            <LogoHeader />
            {authError ? (
                <ErrorBox error={authError} />
            ) : (
                <Text style={styles.heading}>
                    A verification email was sent to {authData?.email}!
                </Text>
            )}

            <PrimaryButton text="Resend Email" onPress={onResendPress} />
            <PrimaryButton text="Return to Login" onPress={signOut} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 150,
    },
    heading: {
        fontSize: 20,
        textAlign: 'center',
    },
});
