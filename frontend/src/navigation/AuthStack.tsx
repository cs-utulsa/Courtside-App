import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUp, SignIn } from '../pages/index';
import { AuthNavigatorParamList } from './../types/Navigation';

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SignUp"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
};
