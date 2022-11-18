import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { OnboardingNavigator } from './OnboardingStack';
import { useAuth } from '@hooks/useAuth';
import { Text } from 'react-native';
import { MainNavigation } from './MainNavigation';

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

const RootNavigator = () => {
    const { authData, loading } = useAuth();

    if (loading) {
        return <Text>Loading</Text>;
    }

    if (authData?.token) {
        return (
            <NavigationContainer theme={Theme}>
                <MainNavigation />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer theme={Theme}>
            <OnboardingNavigator />
        </NavigationContainer>
    );
};

export default RootNavigator;
