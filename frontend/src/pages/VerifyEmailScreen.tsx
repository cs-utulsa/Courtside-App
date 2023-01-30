import { LogoHeader, PrimaryButton } from '@components/index';
import { useAuth } from '@hooks/useAuth';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const VerifyEmailScreen = () => {
    const { authData, resendEmailVerification } = useAuth();

    return (
        <View style={styles.container}>
            <LogoHeader />
            <Text style={styles.heading}>
                A verification email was sent to {authData?.email}!
            </Text>
            <PrimaryButton
                text="Resend Email"
                onPress={resendEmailVerification}
            />
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
