import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
    }
    return {
        ...context,
        isAuthenticated: !!context.auth.user
    };
}

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ user: null, token: null, loading: true });

    const refreshToken = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await api.post('/api/auth/refresh-token', {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { accessToken, ...userData } = response.data;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(userData));

            setAuth({
                user: userData,
                token: accessToken,
                loading: false
            });
        } catch (error) {
            console.error('Erreur de rafraîchissement du token:', error);
            logout();
        }
    };

    useEffect(() => {
        const initAuth = () => {
            const token = localStorage.getItem('token');
            let user = null;

            try {
                const userStr = localStorage.getItem('user');
                if (userStr) {
                    user = JSON.parse(userStr);
                }
            } catch (e) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                console.warn('Données utilisateur invalides, nettoyage effectué');
            }

            setAuth({ user, token, loading: false });
        };

        initAuth();

        // Rafraîchir le token toutes les 45 minutes
        const tokenRefreshInterval = setInterval(refreshToken, 45 * 60 * 1000);

        return () => clearInterval(tokenRefreshInterval);
    }, []);

    const login = async ({ email, password }) => {
        try {
            const res = await api.post('/api/auth/signin', { email, password });
            const { accessToken, ...userData } = res.data;

            localStorage.setItem('token', accessToken);
            localStorage.setItem('user', JSON.stringify(userData));

            setAuth({
                user: userData,
                token: accessToken,
                loading: false
            });

            // Programmer le premier rafraîchissement
            setTimeout(refreshToken, 45 * 60 * 1000);
        } catch (error) {
            console.error('Erreur de connexion:', error);
            throw error;
        }
    };

    const signup = async ({ firstName, lastName, email, password }) => {
        try {
            await api.post('/api/auth/signup', { firstName, lastName, email, password });
        } catch (error) {
            console.error('Erreur d\'inscription:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth({ user: null, token: null, loading: false });
    };

    if (auth.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ auth, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
