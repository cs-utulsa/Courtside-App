import { TextInput, Text, View } from 'react-native';
import React, { FC } from 'react';

import { InputProps } from '../../types/InputTypes';
import { inputStyles as styles } from '../../styles/inputStyles';

type PasswordInputProps = InputProps & {
    /** The text that will be displayed when the value of the input is an empty string */
    placeholder: string;
};

/**
 * This component is an input that allows a user to enter their password
 */
export const PasswordInput: FC<PasswordInputProps> = ({
    changeFn,
    blurFn,
    error,
    touched,
    value,
    disabled,
    placeholder,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    error && touched ? styles.inputError : undefined,
                ]}
                secureTextEntry={true}
                placeholder={placeholder}
                textContentType="password"
                onChangeText={changeFn}
                onBlur={blurFn}
                value={value}
                editable={!disabled}
            />
            {error && touched && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};
