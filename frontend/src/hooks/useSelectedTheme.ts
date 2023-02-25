import { ThemeContext } from '@contexts/ThemeContext';
import { useContext } from 'react';

export const useSelectedTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useSelectedTheme must be used within an AuthProvider');
    }

    return context;
};
