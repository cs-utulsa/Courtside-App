import React from 'react';

import { Auth } from './../pages/Auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
    );
};
