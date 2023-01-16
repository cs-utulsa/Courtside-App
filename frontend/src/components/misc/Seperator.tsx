import React, { FC } from 'react';
import { View } from 'react-native';

type SeperatorProps = {
    /** The height of the seperator in pixels. The height defaults to 10 pixels. */
    height?: number;
};

/**
 * A seperator component to be used with React Native FlatLists and SectionLists to divide their items
 * @example
 * <FlatList ItemSeperatorComponent={<Seperator height={20} />} />
 */
export const Seperator: FC<SeperatorProps> = ({ height = 10 }) => {
    const styles = { height };

    return <View style={styles} />;
};
