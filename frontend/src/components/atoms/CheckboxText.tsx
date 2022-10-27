import { Pressable, StyleSheet, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { FC, useState } from 'react';

type CheckboxTextProps = {
    text: string;
};

export const CheckboxText: FC<CheckboxTextProps> = ({ text }) => {
    const [selected, setSelected] = useState<boolean>(false);

    const pressHandler = () => {
        setSelected(!selected);
    };

    return (
        <Pressable style={styles.item} onPress={pressHandler}>
            <Checkbox style={styles.checkbox} value={selected} />
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        borderWidth: 2,
        borderRadius: 10,
    },
    checkbox: {
        marginRight: 10,
    },
    text: {
        fontSize: 16,
    },
});
