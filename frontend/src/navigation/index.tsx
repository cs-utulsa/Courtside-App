import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
//import { OnboardingNavigator } from './OnboardingStack';
import { MainNavigation } from './MainNavigation';

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

const RootNavigator = () => {
    return (
        <NavigationContainer theme={Theme}>
            {/* <OnboardingNavigator /> */}
            <MainNavigation />
        </NavigationContainer>
    );
};

export default RootNavigator;
