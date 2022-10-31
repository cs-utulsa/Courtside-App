import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
//import { OnboardingNavigator } from './OnboardingStack';
import { OnboardingNavigator } from './OnboardingStack';

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

const RootNavigator = () => {
    return (
        <NavigationContainer theme={Theme}>
            <OnboardingNavigator />
        </NavigationContainer>
    );
};

export default RootNavigator;
