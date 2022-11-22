/* eslint-disable react/no-unstable-nested-components */
import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Schedule, Rosters, Settings } from './../pages';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { StatsStack } from './StatsStack';

const Tab = createBottomTabNavigator();

type MainNavigationProps = {
    routeName: string | undefined;
};

export const MainNavigation: FC<MainNavigationProps> = ({ routeName }) => {
    const hideBar = routeName === 'Selection';

    return (
        <Tab.Navigator
            initialRouteName="Stats"
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: '#EE6730',
                tabBarInactiveTintColor: 'gray',
                tabBarIconStyle: {
                    transform: [{ scale: 1.3 }],
                },
                tabBarStyle: {
                    height: '9%',
                    paddingBottom: 5,
                    display: hideBar ? 'none' : 'flex',
                },
                tabBarLabelStyle: {
                    transform: [{ scale: 1.1 }],
                },
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Stats') {
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
            <Tab.Screen name="Stats" component={StatsStack} />
            <Tab.Screen name="Schedule" component={Schedule} />
            <Tab.Screen name="Rosters" component={Rosters} />
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};
