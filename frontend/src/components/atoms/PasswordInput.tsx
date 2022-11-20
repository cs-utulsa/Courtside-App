import { TextInput, Text, View } from 'react-native';
import React, { FC } from 'react';

import { InputProps } from './types';
import { inputStyles as styles } from './styles';

export const PasswordInput: FC<InputProps> = ({
    changeFn,
    blurFn,
    error,
    touched,
    value,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    error && touched ? styles.inputError : undefined,
                ]}
                secureTextEntry={true}
                placeholder="Password"
                textContentType="password"
                onChangeText={changeFn}
                onBlur={blurFn}
                value={value}
            />
            {error && touched && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};
