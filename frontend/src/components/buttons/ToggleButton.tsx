import React, { FC, useState } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { ORANGE } from '../../styles/colors';

type ToggleButtonProps = {
    initial: boolean;
    text: string;
    onToggle: (on: boolean) => void;
};

export const ToggleButton: FC<ToggleButtonProps> = ({
    initial,
    text,
    onToggle,
}) => {
    const [selected, setSelected] = useState<boolean>(initial);

    const onPress = () => {
        const newValue = !selected;

        setSelected(newValue);
        onToggle(newValue);
    };

    return (
        <Pressable
            onPress={onPress}
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
        borderColor: ORANGE,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    btnSelected: {
        backgroundColor: ORANGE,
    },
    btnNotSelected: {
        backgroundColor: 'white',
    },
    selectedText: {
        color: 'white',
    },
    unselectedText: {
        color: ORANGE,
    },
});
