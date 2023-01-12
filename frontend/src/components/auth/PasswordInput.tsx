import { TextInput, Text, View } from 'react-native';
import React, { FC } from 'react';

import { InputProps } from '../../types/InputTypes';
import { inputStyles as styles } from '../../styles/inputStyles';

export const PasswordInput: FC<InputProps & { placeholder: string }> = ({
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
