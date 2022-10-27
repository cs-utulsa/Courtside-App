import RootNavigator from '@navigation/index';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function App() {
    return (
        <>
            <RootNavigator />
            <StatusBar style="auto" />
        </>
    );
}
