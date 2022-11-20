import { TextInput, Text, View } from 'react-native';
import React, { FC } from 'react';

import { InputProps } from './types';
import { inputStyles as styles } from './styles';

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
