import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Schedule, StatDashboard, Rosters } from './../pages';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Stats Dashboard" component={StatDashboard} />
            <Tab.Screen name="Schedule" component={Schedule} />
            <Tab.Screen name="Rosters" component={Rosters} />
        </Tab.Navigator>
    );
};
