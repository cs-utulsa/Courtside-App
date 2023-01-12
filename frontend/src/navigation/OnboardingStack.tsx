import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { FavoritePlayers, FavoriteTeams, StatSelection } from './../pages';
import { OnboardingNavigatorParamList } from './../types/Navigation';

const OnboardingStack =
    createNativeStackNavigator<OnboardingNavigatorParamList>();

export const OnboardingNavigator = () => {
    return (
        <OnboardingStack.Navigator
            initialRouteName="FavoriteTeams"
            screenOptions={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        >
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
        </OnboardingStack.Navigator>
    );
};
