import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const useSelectedScheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        (async () => {
            const stored = await SecureStore.getItemAsync('theme');

            if (stored && (stored === 'light' || stored === 'dark')) {
                setTheme(stored);
            }
        })();
    }, []);

    const updateTheme = async (newTheme: 'light' | 'dark') => {
        try {
            await SecureStore.setItemAsync('theme', newTheme);
            setTheme(newTheme);
        } catch (err) {
            console.log('Theme cannot be updated');
        }
    };

    return {
        theme,
        updateTheme,
    };
};
