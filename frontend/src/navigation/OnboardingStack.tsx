import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    GetStarted,
    FavoritePlayers,
    FavoriteTeams,
    StatSelection,
    Schedule,
    Rosters,
    StatDashboard,
} from './../pages';
import { OnboardingNavigatorParamList } from './types';

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
            <OnboardingStack.Screen name="FavoriteTeams" component={FavoriteTeams} />
            <OnboardingStack.Screen name="FavoritePlayers" component={FavoritePlayers} />
            <OnboardingStack.Screen name="StatSelection" component={StatSelection} />
            <OnboardingStack.Screen name="Schedule" component={Schedule} />
            <OnboardingStack.Screen name="Rosters" component={Rosters} />
            <OnboardingStack.Screen name="StatDashboard" component={StatDashboard} />
        </OnboardingStack.Navigator>
    );
};
