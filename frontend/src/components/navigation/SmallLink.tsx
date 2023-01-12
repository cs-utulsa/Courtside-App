import React, { FC } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type SmallLinkProps = {
    onPress: () => void;
    text: string;
};

export const SmallLink: FC<SmallLinkProps> = ({ onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.pressable}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        marginTop: 20,
        padding: 15,
    },
    text: {
        textDecorationLine: 'underline',
        fontSize: 14,
    },
});
