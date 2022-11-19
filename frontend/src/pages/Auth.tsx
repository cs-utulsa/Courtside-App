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
import * as Yup from 'yup';

const authSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email Address')
        .required('Email is required.'),
    password: Yup.string().required('Password is required'),
});

export const Auth = () => {
    const { signIn, authError } = useAuth();

    return (
        <View style={styles.container}>
            <LogoHeader />
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={async (values) =>
                    await signIn(values.email, values.password)
                }
                validationSchema={authSchema}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <View style={styles.form}>
                        {authError && (
                            <View style={styles.authErrorBox}>
                                <Text style={styles.errorText}>
                                    {authError}
                                </Text>
                            </View>
                        )}
                        <TextInput
                            style={[
                                styles.input,
                                errors.email && touched.email
                                    ? styles.inputError
                                    : undefined,
                            ]}
                            placeholder="Email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        {errors.email && touched.email && (
                            <Text style={styles.errorText}>{errors.email}</Text>
                        )}
                        <TextInput
                            style={[
                                styles.input,
                                errors.password && touched.password
                                    ? styles.inputError
                                    : undefined,
                            ]}
                            secureTextEntry={true}
                            placeholder="Password"
                            textContentType="password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                        {errors.password && touched.password && (
                            <Text style={styles.errorText}>
                                {errors.password}
                            </Text>
                        )}
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
        marginTop: 15,
        marginBottom: 2,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
    },
    submit: {
        width: '60%',
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#EE6730',
        marginTop: 10,
    },
    submitText: {
        fontSize: 20,
        textAlign: 'center',
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
    authErrorBox: {
        backgroundColor: '#ffcfcd',
        width: '75%',
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
});
