import { useTheme } from '@react-navigation/native';
import React, { FC } from 'react';
import { Text, TextProps, TextStyle } from 'react-native';

export const ThemeText: FC<TextProps & { primary?: boolean }> = (props) => {
    const { colors } = useTheme();

    let color: string;
    if (props.style && (props.style as TextStyle).color) {
        color = (props.style as TextStyle).color as string;
    } else if (props.primary) {
        color = colors.primary;
    } else {
        color = colors.text;
    }

    return (
        <Text
            {...props}
            style={[
                props.style,
                {
                    color,
                },
            ]}
        />
    );
};
