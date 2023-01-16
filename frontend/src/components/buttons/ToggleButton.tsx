import React, { FC, useState } from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { ORANGE } from '../../styles/colors';

type ToggleButtonProps = {
    /** Whether or not the button is toggled initially */
    initial: boolean;
    /** Text displayed in the button */
    text: string;
    /**
     * Function that runs when the button is toggled
     * @param {boolean} on that state the button is changing to (either on or off)
     */
    onToggle: (on: boolean) => void;
};

/**
 * A button that toggles between on and off when you press it.
 * @example
 * const initial={true}
 * const text="Button"
 * const onToggle = (on: boolean) => console.log("Is it on?", on);
 * return <ToggleButton initial={initial} text={text} onToggle={onToggle} />
 */
export const ToggleButton: FC<ToggleButtonProps> = ({
    initial,
    text,
    onToggle,
}) => {
    const [selected, setSelected] = useState<boolean>(initial);

    /**
     * toggles the button on or off when the button is pressed
     */
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
    /** Styles for the button in all states */
    button: {
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: ORANGE,
    },
    /** Styles for the button text in all states */
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    /** Styles for the button when the button is selected */
    btnSelected: {
        backgroundColor: ORANGE,
    },
    /** Styles for the button when the button is  not selected */
    btnNotSelected: {
        backgroundColor: 'white',
    },
    /** Styles for the text when the button is selected */
    selectedText: {
        color: 'white',
    },
    /** Styles for the text when the button is not selected */
    unselectedText: {
        color: ORANGE,
    },
});
