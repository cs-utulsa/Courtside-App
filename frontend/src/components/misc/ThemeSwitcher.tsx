import { useAuth } from '@hooks/useAuth';
import React, { useState } from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';

export const ThemeSwitcher = () => {
    const { authData, setTheme } = useAuth();
    const [value, setValue] = useState<boolean>(false);

    const updateTheme = async () => {
        setTheme(!value ? 'dark' : 'light');
        setValue(!value);
    };

    return (
        <>
            <Text>{authData?.theme}</Text>
            <View style={styles.container}>
                <Text style={styles.label}>Light</Text>
                <Switch
                    style={styles.switch}
                    value={value}
                    onChange={updateTheme}
                />
                <Text style={styles.label}>Dark</Text>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switch: {
        transform: [{ scale: 1.5 }],
    },
    label: {
        fontSize: 20,
        marginHorizontal: 15,
    },
});
