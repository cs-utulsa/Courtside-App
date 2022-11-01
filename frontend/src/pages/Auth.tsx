import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    AuthScreenRouteProp,
    OnboardingNavigationProp,
} from '../navigation/types';

export const Auth = () => {
    const route = useRoute<AuthScreenRouteProp>();
    const { navigate } = useNavigation<OnboardingNavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Courtside</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
            />
            <Pressable
                style={styles.submit}
                onPress={() => navigate('MainNavigation')}
            >
                <Text style={styles.submitText}>
                    {route.params.register ? 'Sign Up' : 'Sign In'}
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
    header: {
        fontSize: 30,
        marginBottom: 20,
        fontStyle: 'italic',
        color: '#EE6730',
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
