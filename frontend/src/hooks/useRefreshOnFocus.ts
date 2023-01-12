import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef } from 'react';

const useRefreshOnFocus = async <T>(refetchFn: () => Promise<T>) => {
    const firstTimeRef = useRef(true);

    useFocusEffect(
        useCallback(() => {
            if (firstTimeRef.current) {
                firstTimeRef.current = false;
                return;
            }

            refetchFn();
        }, [refetchFn])
    );
};

export default useRefreshOnFocus;
