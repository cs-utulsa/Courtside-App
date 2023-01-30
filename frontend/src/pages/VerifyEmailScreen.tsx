import { ErrorBox, LogoHeader, PrimaryButton } from '@components/index';
import { useAuth } from '@hooks/useAuth';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Toast from 'react-native-root-toast';

/**
 * This screen displays when the user has not yet verified their email.
 */
export const VerifyEmailScreen = () => {
    const {
        authData,
        resendEmailVerification,
        signOut,
        authError,
        updateAuthData,
    } = useAuth();

    /**
     * This handler runs when the user clicks on the resend email button.
     *
     * It shows a toast that says the email was sent and then requests the server to send the email.
     */
    const onResendPress = () => {
        Toast.show('Sending verification...', {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
        });
        resendEmailVerification();
    };

    // This effect updates the auth data on the device to see if the user has verified their email yet
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateAuthData();
            console.log('interval');
        }, 3000);

        return () => clearInterval(intervalId);
    });

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
    /** Styles for the page container */
    container: {
        alignItems: 'center',
        marginTop: 150,
    },
    /** Styles for the heading that states where the email was sent. */
    heading: {
        fontSize: 20,
        textAlign: 'center',
    },
});
