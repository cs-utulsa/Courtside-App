import React from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import { LogoHeader } from '@atoms/index';
import { useAuth } from '@hooks/useAuth';
import { Formik } from 'formik';

export const Auth = () => {
    const { signIn, error } = useAuth();
    return (
        <View style={styles.container}>
            <LogoHeader />
            {error && <Text>{error}</Text>}
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) =>
                    await signIn(values.email, values.password)
                }
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder="Password"
                            textContentType="password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        <TouchableOpacity
                            style={styles.submit}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={styles.submitText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 2,
        borderRadius: 10,
        width: '75%',
        marginBottom: 15,
    },
    submit: {
        width: '60%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#EE6730',
    },
    submitText: {
        fontSize: 20,
        textAlign: 'center',
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
});
