import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './header.css'

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    // Ne pas afficher le header sur la page d'authentification
    if (location.pathname === '/auth') {
        return null;
    }

    return (
        <header className="bg-white shadow-sm">
            <nav className="container-mobile md:container-tablet py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="text-xl font-bold text-primary">
                        Culture Quiz
                    </Link>

                    {/* Menu burger pour mobile */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Menu desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="nav-link">
                                    Profil
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline"
                                >
                                    Déconnexion
                                </button>
                            </>
                        ) : (
                            <Link to="/auth" className="btn btn-primary">
                                Connexion
                            </Link>
                        )}
                    </div>
                </div>

                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t">
                        <div className="flex flex-col space-y-4">
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/profile"
                                        className="nav-link text-center"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Profil
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="btn btn-outline w-full"
                                    >
                                        Déconnexion
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/auth"
                                    className="btn btn-primary w-full text-center"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Connexion
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
