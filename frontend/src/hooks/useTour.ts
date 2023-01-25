import { TourContext } from '@contexts/TourContext';
import { useContext } from 'react';

export const useTour = () => {
    const context = useContext(TourContext);

    if (!context) {
        throw new Error('useTour must be used within a TourProvider');
    }

    return context;
};
