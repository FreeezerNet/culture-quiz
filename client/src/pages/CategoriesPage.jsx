import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CategoryCard = ({ category, onClick }) => (
    <button
        onClick={() => onClick(category.id)}
        className="card hover:shadow-lg transition-shadow duration-200 text-left relative overflow-hidden"
    >
        <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
            </div>
            <div className="flex-shrink-0 ml-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <img
                        src={category.imageUrl}
                        alt={category.name}
                        className="w-8 h-8 object-contain"
                    />
                </div>
            </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-primary">Commencer le quiz</span>
            <svg
                className="w-5 h-5 text-primary"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M9 5l7 7-7 7" />
            </svg>
        </div>
    </button>
);

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('/api/categories');
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                setError('Erreur lors du chargement des catégories');
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategorySelect = (categoryId) => {
        navigate(`/quiz/${categoryId}`);
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="spinner" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="text-error-color">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background-light py-8">
            <div className="container-mobile md:container-tablet">
                <h1 className="text-center mb-8">Choisissez une catégorie</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onClick={handleCategorySelect}
                        />
                    ))}
                </div>

                {categories.length === 0 && (
                    <div className="text-center text-gray-600 mt-8">
                        Aucune catégorie disponible pour le moment.
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoriesPage;
