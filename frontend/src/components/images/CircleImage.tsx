import React, { FC } from 'react';
import {
    View,
    Image,
    StyleSheet,
    StyleProp,
    ViewStyle,
    ImageStyle,
} from 'react-native';

type CircleImageProps = {
    url?: string;
    size: number;
};

export const CircleImage: FC<CircleImageProps> = ({ url, size }) => {
    const circleSize: StyleProp<ViewStyle> = {
        height: size - 6,
        width: size - 6,
        borderRadius: size / 2,
        marginHorizontal: 3,
    };

    const imgSize: StyleProp<ImageStyle> = {
        height: size * 0.6,
        width: size * 0.6,
    };

    return (
        <View style={[styles.container, circleSize]}>
            <Image source={{ uri: url }} style={[styles.image, imgSize]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 40,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    image: {
        resizeMode: 'contain',
        width: 55,
        height: 55,
    },
});
