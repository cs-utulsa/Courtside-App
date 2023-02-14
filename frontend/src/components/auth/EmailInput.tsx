import { TextInput, Text, View } from 'react-native';
import React, { FC } from 'react';

import { InputProps } from '../../types/InputTypes';
import { inputStyles as styles } from '../../styles/inputStyles';

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
    return (
        <View style={styles.container}>
            <TextInput
                accessibilityHint="email-input"
                style={[
                    styles.input,
                    error && touched ? styles.inputError : undefined,
                ]}
                placeholder="Email"
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
