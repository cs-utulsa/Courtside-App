import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    TeamSelectionScreen,
    RostersScreen,
    PlayerScreen,
    TeamScreen,
} from '../pages/index';
import { RosterNavigatorParamList } from './../types/Navigation';
const Stack = createNativeStackNavigator<RosterNavigatorParamList>();

export const RosterStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Dashboard" component={RostersScreen} />
            <Stack.Screen name="Selection" component={TeamSelectionScreen} />
            <Stack.Screen name="Players" component={TeamScreen} />
            <Stack.Screen name="Player" component={PlayerScreen} />
        </Stack.Navigator>
    );
};
