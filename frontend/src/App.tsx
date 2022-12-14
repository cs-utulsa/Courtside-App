import RootNavigator from '@navigation/index';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ICONS } from './constants';
import { registerRootComponent } from 'expo';
import { AuthProvider } from '@contexts/AuthContext';

function cacheImages(images: string[]) {
    return images.map((image: string) => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Asset.fromModule(image).downloadAsync();
        }
    });
}

export default function App() {
    const [assetsReady, setAssetsReady] = useState<boolean>(false);

    const [fontsReady] = useFonts({
        BungeeShade: require('./assets/fonts/BungeeShade-Regular.ttf'),
    });

    useEffect(() => {
        const loadResources = async () => {
            try {
                SplashScreen.preventAutoHideAsync();

                const imageAssets = cacheImages(
                    ICONS.map((icon: any) => icon.logo)
                );

                await Promise.all([...imageAssets]);
            } catch (err) {
                console.warn(err);
            } finally {
                setAssetsReady(true);
                SplashScreen.hideAsync();
            }
        };

        loadResources();
    }, []);

    if (!assetsReady || !fontsReady) {
        return null;
    }

    return (
        <>
            <AuthProvider>
                <RootNavigator />
            </AuthProvider>
            <StatusBar style="auto" />
        </>
    );
}

registerRootComponent(App);
