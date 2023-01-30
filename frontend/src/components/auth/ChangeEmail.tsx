import React, { FC, useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from 'react-native';
import { DangerButton } from '../buttons/DangerButton';
import * as yup from 'yup';

type ChangeEmailProps = {
    initialEmail: string;
};

const emailSchema = yup.string().email();

export const ChangeEmail: FC<ChangeEmailProps> = ({ initialEmail }) => {
    const [email, setEmail] = useState<string>(initialEmail);
    const [error, setError] = useState<string | undefined>(undefined);

    const changed = email !== initialEmail;

    const handleChange = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        const text = e.nativeEvent.text;

        if (!emailSchema.isValidSync(text)) {
            setError('Not a valid email');
        } else {
            setError(undefined);
        }

        setEmail(text);
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={email}
                onChange={handleChange}
                keyboardType="email-address"
                style={styles.input}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            {changed && (
                <DangerButton
                    text="Change Email"
                    onPress={() => console.log('Danger')}
                    disabled={!!error}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
    },
    errorText: {
        color: 'red',
    },
    input: {
        borderBottomWidth: 2,
        borderColor: 'black',
        paddingHorizontal: 5,
        fontSize: 18,
        minWidth: 200,
    },
    heading: {
        fontSize: 16,
    },
});
