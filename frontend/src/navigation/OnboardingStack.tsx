import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    GetStarted,
    FavoritePlayers,
    FavoriteTeams,
    StatSelection,
} from './../pages';
import { OnboardingNavigatorParamList } from './types';
import { MainNavigation } from './MainNavigation';

const OnboardingStack =
    createNativeStackNavigator<OnboardingNavigatorParamList>();

export const OnboardingNavigator = () => {
    return (
        <OnboardingStack.Navigator
            initialRouteName="GetStarted"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
            <OnboardingStack.Screen name="GetStarted" component={GetStarted} />
            <OnboardingStack.Screen
                name="FavoriteTeams"
                component={FavoriteTeams}
            />
            <OnboardingStack.Screen
                name="FavoritePlayers"
                component={FavoritePlayers}
            />
            <OnboardingStack.Screen
                name="StatSelection"
                component={StatSelection}
            />
            <OnboardingStack.Screen
                name="MainNavigation"
                component={MainNavigation}
            />
        </OnboardingStack.Navigator>
    );
};
