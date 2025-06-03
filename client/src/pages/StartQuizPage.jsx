import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const StartQuizPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50">
            <div className="text-center px-4">
                <div className="mb-8">
                    <img
                        src={logo}
                        alt="Culture Quiz Logo"
                        className="mx-auto w-32 h-32 mb-4"
                    />
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Culture Quiz</h1>
                    <p className="text-xl text-gray-600">
                        Testez vos connaissances en culture générale !
                    </p>
                </div>
                <button
                    onClick={() => navigate('/categories')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-xl shadow-lg transform transition hover:scale-105"
                >
                    Commencer le Quiz
                </button>
            </div>
        </div>
    );
};

export default StartQuizPage;
