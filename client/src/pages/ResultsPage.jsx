import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const {
        pointsGagnes = 0,
        totalPoints = 0,
        scorePercentage = 0,
        bonnesReponses = 0,
        totalQuestions = 0,
        timeSpent = 0
    } = location.state || {};

    useEffect(() => {
        // Rediriger vers la page de connexion si pas de données de résultats
        if (!location.state) {
            navigate('/start');
        }
    }, [location.state, navigate]);

    const getScoreMessage = () => {
        if (scorePercentage >= 80) return "Excellent !";
        if (scorePercentage >= 60) return "Bien joué !";
        if (scorePercentage >= 40) return "Pas mal !";
        return "Continuez à vous entraîner !";
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}min ${remainingSeconds}s`;
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Résultats</h2>

                <div className="mb-8">
                    <div className="text-6xl font-bold text-blue-600 mb-2">
                        {scorePercentage}%
                    </div>
                    <p className="text-xl text-gray-600 mb-1">
                        {pointsGagnes} points gagnés sur {totalPoints} points
                    </p>
                    <p className="text-sm text-gray-500 mb-1">
                        {bonnesReponses} bonnes réponses sur {totalQuestions} questions
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Temps total : {formatTime(timeSpent)}
                    </p>
                </div>

                <p className="text-2xl font-semibold text-gray-800 mb-8">
                    {getScoreMessage()}
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/categories')}
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Choisir une autre catégorie
                    </button>

                    <button
                        onClick={() => navigate('/profile')}
                        className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                        Voir mon profil
                    </button>

                    <button
                        onClick={() => navigate('/start')}
                        className="w-full bg-gray-100 text-gray-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;
