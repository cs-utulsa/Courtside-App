import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { OnboardingNavigationProp } from '../navigation/types';
import { Button, LogoHeader } from './../components/atoms';

export const GetStarted = () => {
    const { navigate } = useNavigation<OnboardingNavigationProp>();

    return (
        <View style={styles.container}>
            <View>
                <LogoHeader />
                <Text style={styles.header}>Customize Your Fan Experience</Text>
            </View>
            <View>
                <Button
                    text="Get Started"
                    onPress={() => navigate('FavoriteTeams')}
                />
                <Pressable
                    style={styles.alreadyUserBtn}
                    onPress={() => navigate('Auth', { register: false })}
                >
                    <Text style={styles.subtext}>Already a user?</Text>
                </Pressable>
            </View>
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
    alreadyUserBtn: {
        marginTop: 15,
    },
    subtext: {
        fontSize: 20,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});
