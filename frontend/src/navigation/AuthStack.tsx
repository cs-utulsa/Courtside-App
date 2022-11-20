import React from 'react';

import { SignIn } from '../pages/SignIn';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={SignIn} />
        </Stack.Navigator>
    );
};
