import React, { createContext, FC, ReactNode, useState } from 'react';

interface AuthProviderProps {
    children: ReactNode;
}

type AuthContextData = {
    authData?: AuthData;
    loading: boolean;
    signIn(): Promise<void>;
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

    const signIn = async () => {
        setLoading(true);
        const _authData = {
            email: 'benreith3@gmail.com',
            token: 'token',
        };

        setAuthData(_authData);
        setLoading(false);
    };

    const signOut = async () => {
        setAuthData(undefined);
    };

    return (
        <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
