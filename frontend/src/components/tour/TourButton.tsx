import React, { FC } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type TourButtonProps = {
    text: string;
    onPress: () => void;
    style?: 'normal' | 'faded';
};

export const TourButton: FC<TourButtonProps> = ({
    text,
    onPress,
    style = 'normal',
}) => {
    return (
        <Pressable onPress={onPress} style={styles.button}>
            <Text
                style={[
                    styles.text,
                    style === 'normal' ? styles.textNormal : styles.textFaded,
                ]}
            >
                {text}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 10,
    },
    text: {
        textTransform: 'uppercase',
    },
    textNormal: {},
    textFaded: {
        color: '#b1b4b1',
    },
});
