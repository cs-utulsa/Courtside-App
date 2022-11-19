import axios from 'axios';
import React, { createContext, FC, ReactNode, useState } from 'react';
import { DEVELOPMENT_API } from '../constants/urls';
interface AuthProviderProps {
    children: ReactNode;
}

type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    error: string | undefined;
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
};

type AuthData = {
    token: string;
    email: string;
};

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [authData, setAuthData] = useState<AuthData>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const signIn = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await axios.post(
                `${DEVELOPMENT_API}/users/login`,
                {
                    email,
                    password,
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            const _authData = response.data;
            setAuthData(_authData);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.log(err);
                console.log(err.status);
                setError(err.response?.data);
            } else {
                setError('Unknown Error Occurred. Try Again Later.');
            }
        }

        setLoading(false);
    };

    const signOut = async () => {
        setAuthData(undefined);
    };

    return (
        <AuthContext.Provider
            value={{ authData, loading, error, signIn, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};
