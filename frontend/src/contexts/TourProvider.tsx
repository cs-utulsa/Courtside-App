import {
    TourStep,
    SpotlightTourProvider,
} from '@stackbuilders/react-native-spotlight-tour';
import React, { ReactNode, FC } from 'react';

const tourSteps: TourStep[] = [];

type TourProviderProps = {
    children: ReactNode;
};

export const TourProvider: FC<TourProviderProps> = ({ children }) => {
    return (
        <SpotlightTourProvider
            steps={tourSteps}
            overlayColor={'gray'}
            overlayOpacity={0.36}
        >
            {children}
        </SpotlightTourProvider>
    );
};
