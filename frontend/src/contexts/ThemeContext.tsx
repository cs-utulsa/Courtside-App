import React, {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';

interface ThemeProviderProps {
    children: ReactNode;
}

type Theme = 'light' | 'dark' | 'system';

type ThemeContextData = {
    theme: Theme;
    updateTheme: (newTheme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextData>(
    {} as ThemeContextData
);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('system');

    useEffect(() => {
        (async () => {
            const stored = await SecureStore.getItemAsync('theme');

            if (
                stored &&
                (stored === 'light' || stored === 'dark' || stored === 'system')
            ) {
                setTheme(stored);
            }
        })();
    }, []);

    const updateTheme = useCallback(async (newTheme: Theme) => {
        await SecureStore.setItemAsync('theme', newTheme).then(() =>
            setTheme(newTheme)
        );
    }, []);

    const contextData: ThemeContextData = useMemo(() => {
        return {
            theme,
            updateTheme,
        };
    }, [theme, updateTheme]);

    return (
        <ThemeContext.Provider value={contextData}>
            {children}
        </ThemeContext.Provider>
    );
};
