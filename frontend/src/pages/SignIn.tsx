import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
    LogoHeader,
    ErrorBox,
    EmailInput,
    PasswordInput,
    AuthSubmitButton,
} from '@atoms/index';

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
                    isSubmitting,
                    isValid,
                }) => (
                    <View style={styles.form}>
                        <ErrorBox error={authError} />
                        <EmailInput
                            changeFn={handleChange('email')}
                            blurFn={handleBlur('email')}
                            error={errors.email}
                            touched={touched.email}
                            value={values.email}
                            disabled={isSubmitting}
                        />
                        <PasswordInput
                            changeFn={handleChange('password')}
                            blurFn={handleBlur('password')}
                            error={errors.password}
                            touched={touched.password}
                            value={values.password}
                            disabled={isSubmitting}
                            placeholder="Password"
                        />
                        <AuthSubmitButton
                            loading={loading}
                            submitFn={handleSubmit}
                            disabled={isSubmitting || !isValid}
                            text="Sign In"
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
