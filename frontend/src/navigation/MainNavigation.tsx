/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Schedule, StatDashboard, Rosters, Settings } from './../pages';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const MainNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Stats Dashboard') {
                        return (
                            <Ionicons
                                name="stats-chart-sharp"
                                color={color}
                                size={size}
                            />
                        );
                    } else if (route.name === 'Schedule') {
                        return (
                            <FontAwesome
                                name="calendar-o"
                                color={color}
                                size={size}
                            />
                        );
                    } else if (route.name === 'Rosters') {
                        return (
                            <FontAwesome5
                                name="basketball-ball"
                                color={color}
                                size={size}
                            />
                        );
                    } else if (route.name === 'Settings') {
                        return (
                            <Ionicons
                                name="settings-sharp"
                                color={color}
                                size={size}
                            />
                        );
                    }
                },
            })}
        >
            <Tab.Screen name="Stats Dashboard" component={StatDashboard} />
            <Tab.Screen name="Schedule" component={Schedule} />
            <Tab.Screen name="Rosters" component={Rosters} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};
