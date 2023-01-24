import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeamSelection, Rosters, Player, TeamPlayers } from '../pages/index';
import { RosterNavigatorParamList } from './../types/Navigation';
const Stack = createNativeStackNavigator<RosterNavigatorParamList>();

export const RosterStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Dashboard" component={Rosters} />
            <Stack.Screen name="Selection" component={TeamSelection} />
            <Stack.Screen name="Players" component={TeamPlayers} />
            <Stack.Screen name="Player" component={Player} />
        </Stack.Navigator>
    );
};
