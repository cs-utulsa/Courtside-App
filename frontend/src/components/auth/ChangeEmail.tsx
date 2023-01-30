import React, { useState } from 'react';
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
import { useAuth } from '@hooks/useAuth';

const emailSchema = yup.string().email();

export const ChangeEmail = () => {
    const { authData, authError, updateEmail } = useAuth();

    const [email, setEmail] = useState<string>(authData?.email!);
    const [error, setError] = useState<string | undefined>(undefined);

    const changed = email !== authData?.email;

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
            {authError && <Text style={styles.errorText}>{authError}</Text>}
            {changed && (
                <DangerButton
                    text="Change Email"
                    onPress={() => updateEmail(email)}
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
