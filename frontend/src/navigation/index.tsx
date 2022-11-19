import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useAuth } from './../hooks/useAuth';
import { MainNavigation } from './MainNavigation';
import { AuthStack } from './AuthStack';

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

const RootNavigator = () => {
    const { authData } = useAuth();

    if (authData?.token) {
        return (
            <NavigationContainer theme={Theme}>
                <MainNavigation />
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer theme={Theme}>
            <AuthStack />
        </NavigationContainer>
    );
};

export default RootNavigator;
