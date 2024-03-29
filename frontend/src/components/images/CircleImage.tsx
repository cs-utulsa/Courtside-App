import React, { FC } from 'react';
import {
    View,
    Image,
    StyleSheet,
    StyleProp,
    ViewStyle,
    ImageStyle,
} from 'react-native';
//import { useTheme } from '@react-navigation/native';
type CircleImageProps = {
    /** Url of the image to display */
    url: string;
    /** Size of the component in pixels */
    size: number;
    /** How big the image should be compared to the container; value should be between 0 and 1 */
    imageRatio?: number;
    /** The resizeMode of the image */
    resizeMode?: 'cover' | 'contain';
    /** the color of the border */
    borderColor?: string;
};

/**
 * A circular image with a border around it
 */
export const CircleImage: FC<CircleImageProps> = ({

    url,
    size,
    imageRatio = 0.6,
    resizeMode = 'contain',
    borderColor = 'black',
}) => {
    // calculate the size of the circle
    const circleSize: StyleProp<ViewStyle> = {
        height: size - 6,
        width: size - 6,
        borderRadius: size / 2,
        borderColor,
        marginHorizontal: 3,
    };
    // calculate the size of the image
    const imgStyles: StyleProp<ImageStyle> = {
        height: size * imageRatio,
        width: size * imageRatio,
        resizeMode,
    };

    return (
        <View style={[styles.container, circleSize]}>
            <Image source={{ uri: url }} style={imgStyles} />
        </View>
    );
};

const styles = StyleSheet.create({
    /** styles for the container surrounding the image */
    container: {
        borderRadius: 40,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        overflow: 'hidden',
       // borderColor:'orange',
    },
});
