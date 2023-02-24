import React, { useCallback, useState } from 'react';
import {
    createNavigationContainerRef,
    NavigationContainer,
} from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { MainNavigation } from './MainNavigation';
import { AuthStack } from './AuthStack';
import { VerifyEmailScreen } from '@pages/index';
import { useSelectedTheme } from '@hooks/useSelectedTheme';
import { DARK_THEME, LIGHT_THEME } from '@styles/colors';
import { ColorSchemeName, useColorScheme } from 'react-native';

const ref = createNavigationContainerRef();

const RootNavigator = () => {
    const { authData } = useAuth();
    const [routeName, setRouteName] = useState<string | undefined>();

    const { theme } = useSelectedTheme();
    const systemTheme = useColorScheme();

    let appliedTheme: ColorSchemeName;
    if (theme === 'system') appliedTheme = systemTheme;
    else appliedTheme = theme;

    const handleNavReady = useCallback(() => {
        setRouteName(ref.getCurrentRoute()?.name);
    }, []);

    const handleNavStateChange = useCallback(async () => {
        const currentRouteName = ref.getCurrentRoute()?.name;
        setRouteName(currentRouteName);
    }, []);

    if (authData?.token && authData?.emailVerified) {
        return (
            <NavigationContainer
                theme={appliedTheme === 'dark' ? DARK_THEME : LIGHT_THEME}
                ref={ref}
                onReady={handleNavReady}
                onStateChange={handleNavStateChange}
            >
                <MainNavigation routeName={routeName} />
            </NavigationContainer>
        );
    } else if (authData?.token && !authData?.emailVerified) {
        return <VerifyEmailScreen />;
    }

    return (
        <NavigationContainer
            theme={appliedTheme === 'dark' ? DARK_THEME : LIGHT_THEME}
        >
            <AuthStack />
        </NavigationContainer>
    );
};

export default RootNavigator;
