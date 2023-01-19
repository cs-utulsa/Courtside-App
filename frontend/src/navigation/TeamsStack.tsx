import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Rosters, TeamSelection } from '@pages/index';
import { TeamsNavigatorParamList } from './../types/Navigation';

const Stack = createNativeStackNavigator<TeamsNavigatorParamList>();

export const TeamsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Dashboard" component={Rosters} />
            <Stack.Screen name="Selection" component={TeamSelection} />
        </Stack.Navigator>
    );
};
