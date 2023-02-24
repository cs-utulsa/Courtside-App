import React, { useCallback, useState } from 'react';
import {
    createNavigationContainerRef,
    NavigationContainer,
} from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { MainNavigation } from './MainNavigation';
import { AuthStack } from './AuthStack';
import { VerifyEmailScreen } from '@pages/index';
import { useSelectedScheme } from '@hooks/useSelectedScheme';
import { DARK_THEME, LIGHT_THEME } from '@styles/colors';

const ref = createNavigationContainerRef();

const RootNavigator = () => {
    const { authData } = useAuth();
    const [routeName, setRouteName] = useState<string | undefined>();

    const { theme } = useSelectedScheme();

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
                theme={theme === 'dark' ? DARK_THEME : LIGHT_THEME}
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
            theme={theme === 'dark' ? DARK_THEME : LIGHT_THEME}
        >
            <AuthStack />
        </NavigationContainer>
    );
};

export default RootNavigator;
