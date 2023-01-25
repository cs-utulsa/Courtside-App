import { useAuth } from '@hooks/useAuth';
import React, {
    useState,
    useCallback,
    useMemo,
    createContext,
    FC,
    ReactNode,
} from 'react';

interface TourProviderProps {
    children: ReactNode;
}

type TourContextData = {
    tourActive: boolean;
    step: number | undefined;
    start: () => void;
};

export const TourContext = createContext<TourContextData>(
    {} as TourContextData
);

export const TourProvider: FC<TourProviderProps> = ({ children }) => {
    const { authData } = useAuth();
    const [tourActive, setTourActive] = useState<boolean>(false);
    const [step, setStep] = useState<number | undefined>(1);

    const start = useCallback(() => {
        if (authData && !authData.tutorial) {
            setStep(1);
            setTourActive(true);
        }
    }, [authData]);

    const contextData: TourContextData = useMemo(() => {
        return {
            tourActive,
            step,
            start,
        };
    }, [tourActive, step, start]);

    return (
        <TourContext.Provider value={contextData}>
            {children}
        </TourContext.Provider>
    );
};
