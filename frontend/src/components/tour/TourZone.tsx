import { useTour } from '@hooks/useTour';
import React, { FC, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { FullOverlay } from './FullOverlay';

type TourZoneProps = {
    children: ReactNode;
    tourStep: number;
};

export const TourZone: FC<TourZoneProps> = ({ children, tourStep }) => {
    const { step } = useTour();

    if (step !== tourStep) {
        return <>{children}</>;
    }

    return (
        <View style={styles.container}>
            {children}
            <FullOverlay />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
});
