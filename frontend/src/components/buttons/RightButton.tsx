import { Pressable, StyleSheet, Text } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { FC } from 'react';

type RightButtonProps = {
    text: string;
    onPress: () => void;
};

export const RightButton: FC<RightButtonProps> = ({ text, onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
            <MaterialIcons name="chevron-right" color="#60DDF7" size={35} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    text: {
        color: '#60DDF7',
        fontSize: 25,
        marginEnd: -5,
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 10,
    },
});
