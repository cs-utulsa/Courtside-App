import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Court from './../../assets/court.svg';
/**
 * This component displays the logo of the Courtside app.
 */
type LogoHeaderProps = {
    icon?: boolean;
};

export const LogoHeader: FC<LogoHeaderProps> = ({ icon = false }) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            {icon && (
                <Court
                    fill={colors.primary}
                    width={250}
                    height={150}
                    style={styles.icon}
                />
            )}

            <Text style={[styles.header, { color: colors.primary }]}>
                Courtside
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    /** Styles for the text in the logo */
    header: {
        fontSize: 35,
        fontFamily: 'BungeeShade',
        textAlign: 'center',
    },

    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },

    icon: { marginVertical: -30 },
});
