import React, { FC } from 'react';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Schedule, Settings } from './../pages';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { StatsStack } from './StatsStack';
import { RosterStack } from './RosterStack';
import { ORANGE } from '../styles/colors';
<<<<<<< HEAD
import { TeamsStack } from './TeamsStack';
import { RouteProp, ParamListBase } from '@react-navigation/native';
=======
import { RosterSelection } from '@pages/Rosters';
>>>>>>> rosterpage

const Tab = createBottomTabNavigator();

const screenOptions = (routeName: string | undefined) => {
    const hideBar = routeName === 'Selection';

    return ({
        route,
    }: {
        route: RouteProp<ParamListBase, string>;
        navigation: any;
    }) => ({
        tabBarActiveTintColor: ORANGE,
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
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
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
                    <FontAwesome name="calendar-o" color={color} size={size} />
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
                    <Ionicons name="settings-sharp" color={color} size={size} />
                );
            }
        },
    });
};

type MainNavigationProps = {
    routeName: string | undefined;
};

export const MainNavigation: FC<MainNavigationProps> = ({ routeName }) => {
    const options = screenOptions(routeName) as BottomTabNavigationOptions;

    return (
        <Tab.Navigator initialRouteName="Stats" screenOptions={options}>
            <Tab.Screen name="Stats" component={StatsStack} />
            <Tab.Screen name="Schedule" component={Schedule} />
<<<<<<< HEAD
            <Tab.Screen name="Rosters" component={TeamsStack} />
=======
            <Tab.Screen name="Rosters" component={RosterStack} />
>>>>>>> rosterpage
            <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
    );
};
