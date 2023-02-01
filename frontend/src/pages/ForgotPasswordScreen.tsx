import {
    AuthSubmitButton,
    EmailInput,
    ErrorBox,
    LogoHeader,
} from '@components/index';
import { useAuth } from '@hooks/useAuth';
import { Formik } from 'formik';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Yup from 'yup';

const authSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email Address')
        .required('Email is required.'),
});

export const ForgotPasswordScreen = () => {
    const { authError, forgotPassword } = useAuth();

    return (
        <View style={styles.container}>
            <LogoHeader />
            <Text style={styles.heading}>Reset Your Password</Text>
            <Formik
                initialValues={{ email: '' }}
                validationSchema={authSchema}
                onSubmit={async (values) => await forgotPassword(values.email)}
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
                        <EmailInput
                            changeFn={handleChange('email')}
                            blurFn={handleBlur('email')}
                            error={errors.email}
                            touched={touched.email}
                            value={values.email}
                            disabled={isSubmitting}
                        />
                        <ErrorBox error={authError} />
                        <AuthSubmitButton
                            loading={isSubmitting}
                            submitFn={handleSubmit}
                            disabled={isSubmitting || !isValid}
                            text="Send Password Reset Email"
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
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
    },
});
