import { TextInput, Text, View } from 'react-native';
import React, { FC } from 'react';

import { InputProps } from '../../types/InputTypes';
import { inputStyles as styles } from '../../styles/inputStyles';
import { useTheme } from '@react-navigation/native';

/**
 * This component is an input that allows a user to enter their email.
 * This component should be used within a Formik form for the easiest use.
 */
export const EmailInput: FC<InputProps> = ({
    changeFn,
    blurFn,
    error,
    touched,
    value,
    disabled,
}) => {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <TextInput
                accessibilityHint="email-input"
                style={[
                    styles.input,
                    error && touched ? styles.inputError : undefined,
                    { borderColor: colors.text, color: colors.text },
                ]}
                placeholder="Email"
                placeholderTextColor={colors.text}
                keyboardType="email-address"
                textContentType="emailAddress"
                onChangeText={changeFn}
                onBlur={blurFn}
                value={value}
                editable={!disabled}
            />
            {error && touched && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};
