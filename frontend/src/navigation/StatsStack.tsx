import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatSelection, StatDashboard } from '../pages/index';
import { StatsNavigatorParamList } from './types';

const Stack = createNativeStackNavigator<StatsNavigatorParamList>();

export const StatsStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Dashboard" component={StatDashboard} />
            <Stack.Screen name="Selection" component={StatSelection} />
        </Stack.Navigator>
    );
};
