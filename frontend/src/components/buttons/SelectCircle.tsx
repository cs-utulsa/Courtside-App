import React, { FC, useState } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { ORANGE } from '../../styles/colors';

type SelectCircleProps = {
    /** Whether or not the button is selected initially */
    initialState?: boolean;
    /** Whether or not the user can change the state of the button. Defaults to false. */
    disabled?: boolean;
    /** The url of the image that should be displayed */
    url?: string;
    /** The size of the button in pixels */
    size: number;
    /** The function that runs when the status of the button changes. This must be defined if the button is not disabled */
    onSelectChanged?: (newStatus: boolean) => void;
};
/**
 * This component is a circle which displays an image. If it is not disabled, it can be selected on or off.
 * If disabled, this component is just a circle which displays an image
 * @example
 * const url = "/path/to/local/image";
 * const size = 100;
 * const onSelectChanged = (newStatus: boolean) => console.log("Is this button on?", newStatus);
 * return <SelectCircle url={url} size={size} onSelectChanged={onSelectChanged} />
 */
export const SelectCircle: FC<SelectCircleProps> = ({
    url,
    size,
    disabled = false,
    initialState = false,
    onSelectChanged = () => {},
}) => {
    const [selected, setSelected] = useState<boolean>(initialState);

    /**
     * Derives the size of the containing circle and the margins based on the size of the component
     * @returns an object with the height, width, borderRadius, and horizontal margin
     */
    const circleSize = () => {
        return {
            height: size - 6,
            width: size - 6,
            borderRadius: size / 2,
            marginHorizontal: 3,
        };
    };

    /**
     * Derive the size of the image from the size of the component
     * @returns an object with the height and width of the image
     * */
    const imgSize = () => {
        return { height: size * 0.6, width: size * 0.6 };
    };

    /**
     * Change the selection state when the button is pressed
     */
    const pressHandler = () => {
        setSelected(!selected);
        onSelectChanged(!selected);
    };

    return (
        <View
            style={[
                styles.circle,
                circleSize(),
                selected ? styles.selected : styles.notSelected,
            ]}
        >
            <Pressable onPress={pressHandler} disabled={disabled}>
                {url && (
                    <Image
                        source={{ uri: url }}
                        style={[styles.img, imgSize()]}
                    />
                )}
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    /** The styles for the View surrounding the button */
    circle: {
        borderRadius: 40,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    /** Styles for the containing View when the button is in the not selected state */
    notSelected: {
        borderColor: '#808080',
    },
    /** Styles for the containing View when the button is in the selected state */
    selected: {
        borderColor: ORANGE,
    },
    /** Styles for the image that is displayed inside the button */
    img: {
        resizeMode: 'contain',
        width: 55,
        height: 55,
    },
});
