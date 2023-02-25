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
import { DARK_THEME, LIGHT_THEME, ORANGE } from '@styles/colors';
import { useColorScheme } from 'react-native';

interface ThemeProviderProps {
    children: ReactNode;
}

type Theme = 'light' | 'dark' | 'system';

type ThemeContextData = {
    theme: Theme;
    primaryColor: string;
    updateTheme: (newTheme: Theme) => void;
    updatePrimaryColor: (newColor: string) => void;
    themeObject: {
        dark: boolean;
        colors: {
            primary: string;
            card: string;
            background: string;
            text: string;
            notification: string;
            border: string;
        };
    };
};

export const ThemeContext = createContext<ThemeContextData>(
    {} as ThemeContextData
);

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('system');
    const [primaryColor, setPrimaryColor] = useState<string>(ORANGE);

    const systemTheme = useColorScheme();

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

    const updatePrimaryColor = useCallback((newColor: string) => {
        setPrimaryColor(newColor);
    }, []);

    const darkTheme = useMemo(() => {
        return {
            ...DARK_THEME,
            colors: { ...DARK_THEME.colors, primary: primaryColor },
        };
    }, [primaryColor]);

    const lightTheme = useMemo(() => {
        return {
            ...LIGHT_THEME,
            colors: { ...LIGHT_THEME.colors, primary: primaryColor },
        };
    }, [primaryColor]);

    const themeObject = useMemo(() => {
        if (theme === 'system') {
            return systemTheme === 'dark' ? darkTheme : lightTheme;
        }

        return theme === 'dark' ? darkTheme : lightTheme;
    }, [theme, lightTheme, darkTheme, systemTheme]);

    const contextData: ThemeContextData = useMemo(() => {
        return {
            theme,
            updateTheme,
            primaryColor,
            updatePrimaryColor,
            themeObject,
        };
    }, [theme, updateTheme, primaryColor, updatePrimaryColor, themeObject]);

    return (
        <ThemeContext.Provider value={contextData}>
            {children}
        </ThemeContext.Provider>
    );
};
