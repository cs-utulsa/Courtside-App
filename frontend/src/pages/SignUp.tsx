import * as Yup from 'yup';
import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import React from 'react';

import {
    LogoHeader,
    ErrorBox,
    EmailInput,
    PasswordInput,
    AuthSubmitButton,
    SmallLink,
} from '@atoms/index';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from './../navigation/types';

const authSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid Email Address')
        .required('Email is required.'),
    password: Yup.string().required('Password is required'),
    passwordRetype: Yup.string().test(
        'passwords-match',
        'Passwords must match',
        function (value) {
            return this.parent.password === value;
        }
    ),
});

export const SignUp = () => {
    const { signUp, authError, loading } = useAuth();

    const { navigate } = useNavigation<AuthNavigationProp>();

    return (
        <View style={styles.container}>
            <LogoHeader />
            <Formik
                initialValues={{ email: '', password: '', passwordRetype: '' }}
                onSubmit={async (values) =>
                    await signUp(values.email, values.password)
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
                        <PasswordInput
                            changeFn={handleChange('passwordRetype')}
                            blurFn={handleBlur('passwordRetype')}
                            error={errors.passwordRetype}
                            touched={touched.passwordRetype}
                            value={values.passwordRetype}
                            disabled={isSubmitting}
                            placeholder="Retype Password"
                        />
                        <AuthSubmitButton
                            loading={loading}
                            submitFn={handleSubmit}
                            disabled={isSubmitting || !isValid}
                            text="Sign Up"
                        />
                        <SmallLink
                            onPress={() => navigate('SignIn')}
                            text="Already Have an Account?"
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
