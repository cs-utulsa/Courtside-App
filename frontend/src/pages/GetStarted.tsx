import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { OnboardingNavigationProp } from '../navigation/types';
import { Button } from './../components/atoms';

export const GetStarted = () => {
    const { navigate } = useNavigation<OnboardingNavigationProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Customize Your Fan Experience</Text>
            <Button
                text="Get Started"
                onPress={() => navigate('FavoriteTeams')}
            />
            <Pressable onPress={() => navigate('Auth', { register: false })}>
                <Text style={styles.subtext}>Already a user?</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: '25%',
        justifyContent: 'space-around',
        height: '100%',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
    },
    subtext: {
        fontSize: 18,
        textDecorationLine: 'underline',
    },
});
