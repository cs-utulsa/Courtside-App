import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
// import { useRoute } from '@react-navigation/native';
// import {
//     AuthScreenRouteProp,
// } from '../navigation/types';
import { LogoHeader } from '@atoms/index';
import { useAuth } from '@hooks/useAuth';

export const Auth = () => {
    //const route = useRoute<AuthScreenRouteProp>();
    // const { navigate } = useNavigation<OnboardingNavigationProp>();
    const { signIn } = useAuth();
    return (
        <View style={styles.container}>
            <LogoHeader />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                textContentType="password"
            />
            <Pressable
                style={styles.submit}
                // onPress={() => navigate('MainNavigation')}
                onPress={signIn}
            >
                <Text style={styles.submitText}>
                    Sign In
                    {/* {route.params.register ? 'Sign Up' : 'Sign In'} */}
                </Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 2,
        borderRadius: 10,
        width: '75%',
        marginBottom: 15,
    },
    submit: {
        width: '60%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#EE6730',
    },
    submitText: {
        fontSize: 20,
        textAlign: 'center',
    },
});
