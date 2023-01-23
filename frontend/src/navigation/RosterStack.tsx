import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatSelection, StatDashboard } from '../pages/index';
import { StatsNavigatorParamList } from './../types/Navigation';
import { RosterNavigatorParamList } from './../types/Navigation';
import { RosterSelection } from '@pages/Rosters';
import { Player } from '@pages/Rosters';

import { PlayerSelection } from '@pages/Rosters';
const Stack = createNativeStackNavigator<RosterNavigatorParamList>();

export const RosterStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Dashboard" component={RosterSelection} />
            <Stack.Screen name="Players" component={PlayerSelection} />
            <Stack.Screen name="Player" component={Player} />
        </Stack.Navigator>
    );
};
