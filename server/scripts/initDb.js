const db = require('../models');
const Category = db.category;
const Question = db.question;
const Answer = db.answer;

const initDb = async () => {
    try {
        // Catégories avec leurs questions et réponses
        const categories = [
            {
                name: "Culture Générale",
                description: "Questions variées sur différents sujets de culture générale",
                imageUrl: "https://example.com/culture.jpg",
                questions: [
                    {
                        text: "Quelle est la capitale de la France ?",
                        difficulty: "facile",
                        points: 5,
                        answers: [
                            { text: "Paris", isCorrect: true, explanation: "Paris est la capitale de la France depuis très longtemps" },
                            { text: "Lyon", isCorrect: false },
                            { text: "Marseille", isCorrect: false },
                            { text: "Bordeaux", isCorrect: false }
                        ]
                    },
                    {
                        text: "Qui a peint la Joconde ?",
                        difficulty: "facile",
                        points: 5,
                        answers: [
                            { text: "Michel-Ange", isCorrect: false },
                            { text: "Léonard de Vinci", isCorrect: true, explanation: "La Joconde a été peinte par Léonard de Vinci entre 1503 et 1506" },
                            { text: "Raphaël", isCorrect: false },
                            { text: "Van Gogh", isCorrect: false }
                        ]
                    }
                ]
            },
            {
                name: "Sciences",
                description: "Questions sur les sciences naturelles et physiques",
                imageUrl: "https://example.com/science.jpg",
                questions: [
                    {
                        text: "Quelle est la formule chimique de l'eau ?",
                        difficulty: "facile",
                        points: 5,
                        answers: [
                            { text: "CO2", isCorrect: false },
                            { text: "H2O", isCorrect: true, explanation: "H2O représente deux atomes d'hydrogène et un atome d'oxygène" },
                            { text: "O2", isCorrect: false },
                            { text: "N2", isCorrect: false }
                        ]
                    },
                    {
                        text: "Quelle est la planète la plus proche du Soleil ?",
                        difficulty: "moyen",
                        points: 10,
                        answers: [
                            { text: "Venus", isCorrect: false },
                            { text: "Mars", isCorrect: false },
                            { text: "Mercure", isCorrect: true, explanation: "Mercure est la première planète du système solaire" },
                            { text: "Jupiter", isCorrect: false }
                        ]
                    }
                ]
            },
            {
                name: "Histoire",
                description: "Questions sur l'histoire mondiale",
                imageUrl: "https://example.com/history.jpg",
                questions: [
                    {
                        text: "En quelle année a eu lieu la Révolution française ?",
                        difficulty: "moyen",
                        points: 10,
                        answers: [
                            { text: "1789", isCorrect: true, explanation: "La Révolution française a débuté en 1789 avec la prise de la Bastille" },
                            { text: "1799", isCorrect: false },
                            { text: "1769", isCorrect: false },
                            { text: "1809", isCorrect: false }
                        ]
                    },
                    {
                        text: "Qui était le premier empereur romain ?",
                        difficulty: "difficile",
                        points: 15,
                        answers: [
                            { text: "Jules César", isCorrect: false },
                            { text: "Auguste", isCorrect: true, explanation: "Auguste (Octave) est devenu le premier empereur romain en 27 av. J.-C." },
                            { text: "Néron", isCorrect: false },
                            { text: "Caligula", isCorrect: false }
                        ]
                    }
                ]
            }
        ];

        // Création des catégories avec leurs questions et réponses
        for (const categoryData of categories) {
            const { questions, ...categoryInfo } = categoryData;
            const category = await Category.create(categoryInfo);

            for (const questionData of questions) {
                const { answers, ...questionInfo } = questionData;
                const question = await Question.create({
                    ...questionInfo,
                    categoryId: category.id
                });

                for (const answerData of answers) {
                    await Answer.create({
                        ...answerData,
                        questionId: question.id
                    });
                }
            }
        }

        console.log('Base de données initialisée avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
    }
};

// Exécuter l'initialisation
initDb();
