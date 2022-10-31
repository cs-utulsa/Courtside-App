import React, { FC } from 'react';
import { View } from 'react-native';

type SeperatorProps = {
    height?: number;
};

export const Seperator: FC<SeperatorProps> = ({ height = 10 }) => {
    const styles = { height };

    return <View style={styles} />;
};
