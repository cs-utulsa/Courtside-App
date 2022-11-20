import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EmailInput, ErrorBox, LogoHeader } from '@atoms/index';
import { useAuth } from '@hooks/useAuth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthSubmitButton } from '@atoms/AuthSubmitButton';
import { PasswordInput } from '@atoms/PasswordInput';

const authSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email Address')
        .required('Email is required.'),
    password: Yup.string().required('Password is required'),
});

export const SignIn = () => {
    const { signIn, authError, loading } = useAuth();

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
                        <ErrorBox error={authError} />
                        <EmailInput
                            changeFn={handleChange('email')}
                            blurFn={handleBlur('email')}
                            error={errors.email}
                            touched={touched.email}
                            value={values.email}
                        />
                        <PasswordInput
                            changeFn={handleChange('password')}
                            blurFn={handleBlur('password')}
                            error={errors.password}
                            touched={touched.password}
                            value={values.password}
                        />
                        <AuthSubmitButton
                            loading={loading}
                            submitFn={handleSubmit}
                        />
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
    form: {
        width: '100%',
        alignItems: 'center',
    },
});
