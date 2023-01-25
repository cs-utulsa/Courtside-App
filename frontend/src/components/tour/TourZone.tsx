import { useTour } from '@hooks/useTour';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

type TourZoneProps = {
    children: ReactNode;
    tourStep: number;
};

export const TourZone: FC<TourZoneProps> = ({ children, tourStep }) => {
    const { step } = useTour();

    if (step !== tourStep) {
        return <>{children}</>;
    }

    return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
    container: {},
});
