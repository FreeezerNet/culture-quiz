import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';

// Import des icônes
import {
    StarIcon,
    TrophyIcon,
    BoltIcon,
    AcademicCapIcon
} from '@heroicons/react/24/solid';

const TIMER_DURATION = 30;
const ANSWER_DISPLAY_DURATION = 2000; // 2 secondes pour afficher la réponse

const getDifficultyIcon = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'facile':
            return <StarIcon className="pill-icon" />;
        case 'moyen':
            return <BoltIcon className="pill-icon" />;
        case 'difficile':
            return <TrophyIcon className="pill-icon" />;
        default:
            return <StarIcon className="pill-icon" />;
    }
};

const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
        case 'facile':
            return 'pill-difficulty-facile';
        case 'moyen':
            return 'pill-difficulty-moyen';
        case 'difficile':
            return 'pill-difficulty-difficile';
        default:
            return 'pill-difficulty-facile';
    }
};

const QuizPage = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const { auth, logout } = useContext(AuthContext);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(TIMER_DURATION);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [timeSpent, setTimeSpent] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isAnswerProcessed, setIsAnswerProcessed] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const answerTimeoutRef = useRef(null);

    // Références pour suivre les valeurs actuelles
    const correctAnswersRef = useRef(0);
    const userAnswersRef = useRef([]);

    // Mettre à jour les refs quand les états changent
    useEffect(() => {
        correctAnswersRef.current = correctAnswers;
        userAnswersRef.current = userAnswers;
    }, [correctAnswers, userAnswers]);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await api.get(`/api/quiz/category/${categoryId}/questions`);
                console.log('Questions reçues:', response.data);
                setQuestions(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Erreur détaillée:', err);
                if (err.response?.status === 401) {
                    logout();
                    navigate('/auth');
                    return;
                }
                setError('Erreur lors du chargement des questions');
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [categoryId, logout, navigate]);

    useEffect(() => {
        if (loading || questions.length === 0) return;

        const timerInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    handleNextQuestion();
                    return TIMER_DURATION;
                }
                return prevTimer - 1;
            });
            setTimeSpent((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [loading, questions, currentQuestionIndex]);

    useEffect(() => {
        return () => {
            if (answerTimeoutRef.current) {
                clearTimeout(answerTimeoutRef.current);
            }
        };
    }, []);

    const processAnswer = useCallback((answer) => {
        if (selectedAnswer !== null || isAnswerProcessed) {
            console.log('Réponse déjà traitée ou en cours de traitement');
            return;
        }

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = answer.isCorrect;
        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        console.log('Traitement de la réponse:', {
            questionId: currentQuestion.id,
            answerId: answer.id,
            isCorrect,
            isLastQuestion
        });

        // Marquer la réponse comme traitée et l'afficher
        setIsAnswerProcessed(true);
        setSelectedAnswer(answer);
        setShowAnswer(true);

        // Enregistrer la réponse de l'utilisateur
        setUserAnswers(prev => {
            const newAnswers = [...prev, {
                questionId: currentQuestion.id,
                answerId: answer.id,
                isCorrect: isCorrect
            }];

            // Si c'est la dernière question et que toutes les réponses sont présentes
            if (isLastQuestion && newAnswers.length === questions.length) {
                // Attendre plus longtemps pour la dernière question
                answerTimeoutRef.current = setTimeout(() => {
                    submitQuiz(newAnswers);
                }, ANSWER_DISPLAY_DURATION);
            }

            return newAnswers;
        });

        // Mettre à jour le nombre de bonnes réponses
        if (isCorrect) {
            setCorrectAnswers(prev => prev + 1);
        }

        // Si ce n'est pas la dernière question, passer à la suivante après le délai
        if (!isLastQuestion) {
            answerTimeoutRef.current = setTimeout(() => {
                handleNextQuestion();
            }, ANSWER_DISPLAY_DURATION);
        }
    }, [currentQuestionIndex, questions, selectedAnswer, isAnswerProcessed]);

    const handleAnswerSelect = (answer) => {
        processAnswer(answer);
    };

    const handleNextQuestion = useCallback(() => {
        if (currentQuestionIndex >= questions.length - 1) {
            return;
        }

        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerProcessed(false);
        setShowAnswer(false);
        setTimer(TIMER_DURATION);
    }, [currentQuestionIndex, questions.length]);

    const submitQuiz = async (finalAnswers = userAnswersRef.current) => {
        try {
            const finalCorrectAnswers = correctAnswersRef.current;
            console.log('Soumission du quiz:', {
                answers: finalAnswers,
                correctAnswers: finalCorrectAnswers,
                totalQuestions: questions.length
            });

            // Vérifier que toutes les questions ont été répondues
            if (finalAnswers.length !== questions.length) {
                console.error('Nombre de réponses incorrect:', {
                    received: finalAnswers.length,
                    expected: questions.length,
                    answers: finalAnswers
                });
                return;
            }

            const response = await api.post('/api/quiz/submit', {
                userId: auth.user.id,
                categoryId: parseInt(categoryId),
                answers: finalAnswers,
                timeSpent
            });

            console.log('Réponse du serveur:', response.data);

            // Navigation vers la page de résultats avec les nouvelles propriétés
            navigate('/results', {
                state: {
                    pointsGagnes: response.data.pointsGagnes,
                    totalPoints: response.data.totalPoints,
                    scorePercentage: response.data.scorePercentage,
                    bonnesReponses: response.data.bonnesReponses,
                    totalQuestions: response.data.totalQuestions,
                    timeSpent: response.data.timeSpent
                }
            });
        } catch (err) {
            console.error('Erreur lors de la soumission du quiz:', err);
            if (err.response?.status === 401) {
                logout();
                navigate('/auth');
                return;
            }
            setError('Erreur lors de la soumission du quiz');
        }
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

    const currentQuestion = questions[currentQuestionIndex];

    if (!currentQuestion) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="text-2xl text-gray-600">Chargement des questions...</div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background-light py-6">
            <div className="container-mobile md:container-tablet">
                {/* Progress and Timer */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                            Question {currentQuestionIndex + 1}/{questions.length}
                        </span>
                        <span className="text-sm text-gray-600">
                            Bonnes réponses: {correctAnswers}/{userAnswers.length}
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${(timer / TIMER_DURATION) * 100}%` }}
                        />
                    </div>
                    <div className="text-center mt-2 text-sm text-gray-600">
                        {timer} secondes
                    </div>
                </div>

                {/* Question Card */}
                <div className="card mb-6">
                    <div className="flex items-center justify-between mb-4 gap-2">
                        <div className={`pill-difficulty ${getDifficultyClass(currentQuestion.difficulty)}`}>
                            {getDifficultyIcon(currentQuestion.difficulty)}
                            {currentQuestion.difficulty}
                        </div>
                        <div className="pill-points">
                            <AcademicCapIcon className="pill-icon" />
                            {currentQuestion.points} points
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
                </div>

                {/* Answer Options */}
                <div className="space-y-3">
                    {currentQuestion.answers.map((answer) => (
                        <button
                            key={answer.id}
                            onClick={() => handleAnswerSelect(answer)}
                            className={`quiz-option w-full transition-colors duration-300 ${!showAnswer
                                ? ''
                                : selectedAnswer === answer
                                    ? answer.isCorrect
                                        ? 'quiz-option-correct'
                                        : 'quiz-option-incorrect'
                                    : ''
                                }`}
                            disabled={selectedAnswer !== null || isAnswerProcessed}
                        >
                            <div className="flex items-center">
                                <span className="flex-grow">{answer.text}</span>
                                {selectedAnswer === answer && showAnswer && (
                                    <span className="ml-2">
                                        {answer.isCorrect ? '✓' : '✗'}
                                    </span>
                                )}
                            </div>
                            {selectedAnswer === answer && !answer.isCorrect && showAnswer && answer.explanation && (
                                <p className="mt-2 text-sm text-gray-600">
                                    {answer.explanation}
                                </p>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizPage;
