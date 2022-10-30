import { Pressable, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome, FontAwesome5  } from '@expo/vector-icons';
import React, { FC } from 'react';

type NavButton = {
    type: 'schedule' | 'teams' | 'stats' | 'settings';
    onPress: () => void;
};

export const NavButton: FC<NavButton> = ({ type, onPress }) => {
    if (type === 'schedule') {
        return (
            <Pressable onPress={onPress}>
                <FontAwesome name='calendar-o' color='black' size={45} />
            </Pressable>
        )
    } else if (type === 'teams') {
        return (
            <Pressable onPress={onPress}>
                <FontAwesome5 name='basketball-ball' color='black' size={45} />
            </Pressable>
        )
    } else if (type === 'stats') {
        return (
            <Pressable onPress={onPress}>
                <Ionicons name='stats-chart-sharp' color='black' size={45} />
            </Pressable>
        )
    } else if (type === 'settings') {
        return (
            <Pressable onPress={onPress}>
                <Ionicons name='settings-sharp' color='black' size={45} />
            </Pressable>
        )
    }
    return null;
};
