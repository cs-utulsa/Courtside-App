import React, { FC } from 'react';
import { Pressable } from 'react-native';

type TourButtonProps = {
    text: string;
    onPress: () => void;
};

export const TourButton: FC<TourButtonProps> = ({ text, onPress }) => {
    return <Pressable onPress={onPress}>{text}</Pressable>;
};
