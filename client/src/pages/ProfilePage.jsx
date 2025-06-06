import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

const ProfilePage = () => {
    const { auth, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get(`/api/users/${auth.user.id}`);
                console.log('Réponse du serveur:', response.data); // Pour le débogage
                setUserProfile(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur détaillée:', err); // Pour le débogage
                if (err.response?.status === 401) {
                    logout();
                    navigate('/auth');
                    return;
                }
                setError('Erreur lors du chargement du profil');
                setLoading(false);
            }
        };

        if (auth.user?.id) {
            fetchUserProfile();
        }
    }, [auth.user?.id, logout, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-gray-600">Chargement...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Mon Profil</h2>
                </div>

                <div className="space-y-6">
                    <div className="border-b pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <p className="mt-1 text-lg text-gray-900">{userProfile?.emailId}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                                <p className="mt-1 text-lg text-gray-900">{userProfile?.firstName || 'Non renseigné'}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nom</label>
                                <p className="mt-1 text-lg text-gray-900">{userProfile?.lastName || 'Non renseigné'}</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Quiz complétés</p>
                                <p className="text-2xl font-semibold">{userProfile?.quizCompleted || 0}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Score moyen</p>
                                <p className="text-2xl font-semibold">{userProfile?.averageScore || 0}%</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Meilleur score</p>
                                <p className="text-2xl font-semibold">{userProfile?.bestScore || 0}%</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Temps total</p>
                                <p className="text-2xl font-semibold">{Math.floor((userProfile?.totalTimeSpent || 0) / 60)} min</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
