import React, { FC } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type DirectionButtonProps = {
    /** The direction that the arrow is facing */
    direction: 'left' | 'right';
    /** THe text displayed with the button */
    text: string;
    /** The function that is called when the button is pressed */
    onPress: () => void;
};

/**
 * A button that can display either a left arrow or a right arrow next to some text
 * @example
 * const direction = 'left';
 * const text = 'Going Left!';
 * const onPress = () => navigate("Screen to the left");
 * return <DirectionButton direction={direction} text={text} onPress={onPress} />
 */
export const DirectionButton: FC<DirectionButtonProps> = ({
    direction,
    text,
    onPress,
}) => {
    // specify the name of the icon to display
    const iconName = direction === 'left' ? 'chevron-left' : 'chevron-right';

    return (
        <Pressable
            style={[
                styles.button,
                direction === 'left' ? styles.buttonLeft : styles.buttonRight,
            ]}
            onPress={onPress}
        >
            <Text style={styles.text}>{text}</Text>
            <MaterialIcons name={iconName} color="#60DDF7" size={35} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    /** Styles for the button text */
    text: {
        color: '#60DDF7',
        fontSize: 25,
        marginEnd: -5,
    },
    /** Styles for the button */
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 10,
    },
    /** Styles for when the button's direction is left */
    buttonLeft: {
        justifyContent: 'flex-start',
    },
    /** Styles for when the button's direction is right */
    buttonRight: {
        justifyContent: 'flex-end',
    },
});
