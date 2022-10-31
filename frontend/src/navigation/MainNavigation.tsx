import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GetStarted, StatSelection } from './../pages';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={GetStarted} />
            <Tab.Screen name="Another" component={StatSelection} />
        </Tab.Navigator>
    );
};
