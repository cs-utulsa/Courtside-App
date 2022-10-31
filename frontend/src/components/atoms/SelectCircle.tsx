import React, { FC, useState } from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';

type SelectCircleProps = {
    disabled?: boolean;
    url?: string;
    size: number;
    onSelectChanged?: (newStatus: boolean) => void;
};

export const SelectCircle: FC<SelectCircleProps> = ({
    url,
    size,
    disabled = false,
    onSelectChanged = () => {},
}) => {
    const [selected, setSelected] = useState<boolean>(false);

    const circleSize = () => {
        return {
            height: size - 6,
            width: size - 6,
            borderRadius: size / 2,
            marginHorizontal: 3,
        };
    };

    const imgSize = () => {
        return { height: size * 0.6, width: size * 0.6 };
    };

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
                <Image source={{ uri: url }} style={[styles.img, imgSize()]} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        borderRadius: 40,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },

    notSelected: {
        borderColor: '#808080',
    },

    selected: {
        borderColor: '#cac235',
    },

    img: {
        resizeMode: 'contain',
        width: 55,
        height: 55,
    },
});
