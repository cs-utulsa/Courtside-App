import { ORANGE } from '@styles/colors';
import React, { FC } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

type PrimaryButtonProps = {
    /** This function runs whenever the button is pressed */
    onPress: () => void;
    /** The text displayed in the button */
    text: string;
};

/**
 * This component is a large button which stretches across most of the screen
 * @example
 * const text = "Button Text";
 * const onPress = () => console.log("Button pressed!");
 * return <PrimaryButton text={text} onPress={onPress} />
 */
export const PrimaryButton: FC<PrimaryButtonProps> = ({ onPress, text }) => {
    return (
        <View style={styles.container}>
            <Pressable style={styles.btn} onPress={onPress}>
                <Text style={styles.btnText}>{text}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    /** Styles for the View which contains the button */
    container: {
        alignItems: 'center',
        width: '100%',
    },
    /** Styles for the button */
    btn: {
        width: '90%',
        paddingVertical: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
    },
    /** Styles for the text on the button */
    btnText: {
        textAlign: 'center',
        color: ORANGE,
        fontSize: 16,
    },
});
