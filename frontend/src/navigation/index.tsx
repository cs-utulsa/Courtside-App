import React, { useCallback, useState } from 'react';
import {
    createNavigationContainerRef,
    DefaultTheme,
    NavigationContainer,
} from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { MainNavigation } from './MainNavigation';
import { AuthStack } from './AuthStack';
import { VerifyEmailScreen } from '@pages/index';

const Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
    },
};

const ref = createNavigationContainerRef();

const RootNavigator = () => {
    const { authData } = useAuth();
    const [routeName, setRouteName] = useState<string | undefined>();

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
                theme={Theme}
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
        <NavigationContainer theme={Theme}>
            <AuthStack />
        </NavigationContainer>
    );
};

export default RootNavigator;
