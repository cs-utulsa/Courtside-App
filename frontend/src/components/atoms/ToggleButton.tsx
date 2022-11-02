import React, { FC, useState } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';

type ToggleButtonProps = {
    text: string;
};

export const ToggleButton: FC<ToggleButtonProps> = ({ text }) => {
    const [selected, setSelected] = useState<boolean>(false);

    return (
        <Pressable
            onPress={() => setSelected(!selected)}
            style={[
                styles.button,
                selected ? styles.btnSelected : styles.btnNotSelected,
            ]}
        >
            <Text
                style={[
                    styles.buttonText,
                    selected ? styles.selectedText : styles.unselectedText,
                ]}
            >
                {text}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#EE6730',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    btnSelected: {
        backgroundColor: '#EE6730',
    },
    btnNotSelected: {
        backgroundColor: 'white',
    },
    selectedText: {
        color: 'white',
    },
    unselectedText: {
        color: '#EE6730',
    },
});
