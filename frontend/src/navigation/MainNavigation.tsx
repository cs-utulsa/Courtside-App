import React, { FC } from 'react';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Settings } from '@pages/index';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { StatsStack } from './StatsStack';
import { RosterStack } from './RosterStack';
import { ParamListBase, RouteProp, useTheme } from '@react-navigation/native';
import { ScheduleStack } from './ScheduleStack';
import { SwitchLeagues } from '@components/index';

const Tab = createBottomTabNavigator();

const screenOptions = (routeName: string | undefined, iconColor: string) => {
    const hideBar = routeName === 'Selection';

    return ({
        route,
    }: {
        route: RouteProp<ParamListBase, string>;
        navigation: any;
    }) => ({
        tabBarActiveTintColor: iconColor,
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
            } else if (route.name === 'Games') {
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

const individualScreenOptions: BottomTabNavigationOptions = {
    headerRight: () => <SwitchLeagues />,
};

type MainNavigationProps = {
    routeName: string | undefined;
};

export const MainNavigation: FC<MainNavigationProps> = ({ routeName }) => {
    const { colors } = useTheme();
    const options = screenOptions(
        routeName,
        colors.primary
    ) as BottomTabNavigationOptions;

    return (
        <Tab.Navigator initialRouteName="Stats" screenOptions={options}>
            <Tab.Screen
                name="Stats"
                component={StatsStack}
                options={individualScreenOptions}
            />
            <Tab.Screen
                name="Games"
                component={ScheduleStack}
                options={individualScreenOptions}
            />
            <Tab.Screen
                name="Rosters"
                component={RosterStack}
                options={individualScreenOptions}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={individualScreenOptions}
            />
        </Tab.Navigator>
    );
};
