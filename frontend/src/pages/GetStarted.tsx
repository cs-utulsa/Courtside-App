import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
});
