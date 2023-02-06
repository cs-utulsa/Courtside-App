import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SignUp,
    SignIn,
    ForgotPasswordScreen,
    GetStartedScreen,
} from '../pages/index';
import { AuthNavigatorParamList } from './../types/Navigation';

const Stack = createNativeStackNavigator<AuthNavigatorParamList>();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="GetStarted"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
            />
        </Stack.Navigator>
    );
};
