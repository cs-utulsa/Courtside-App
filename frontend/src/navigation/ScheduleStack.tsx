import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameScreen, Schedule } from '../pages/index';
import { ScheduleNavigatorParamList } from './../types/Navigation';

const Stack = createNativeStackNavigator<ScheduleNavigatorParamList>();

export const ScheduleStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Schedule"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Schedule" component={Schedule} />
            <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
    );
};
