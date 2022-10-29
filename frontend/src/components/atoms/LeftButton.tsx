import { Pressable, StyleSheet, Text, View } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { FC } from 'react';

type LeftButtonProps = {
    text: string;
    onPress: () => void;
};

export const LeftButton: FC<LeftButtonProps> = ({ text, onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <MaterialIcons name="chevron-left" color="#60DDF7" size={35} />
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#60DDF7',
        fontSize: 25,
        marginStart: -5,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginBottom: 10,
    },
});
