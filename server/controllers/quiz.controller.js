const db = require("../models");
const Question = db.question;
const Answer = db.answer;
const Category = db.category;

// Récupérer toutes les questions d'une catégorie
exports.getQuestionsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Vérifier si la catégorie existe
        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).send({
                message: "Catégorie non trouvée."
            });
        }

        // Récupérer les questions avec toutes leurs réponses
        const questions = await Question.findAll({
            where: { categoryId: categoryId },
            attributes: ['id', 'text', 'difficulty', 'points'],
            include: [{
                model: Answer,
                attributes: ['id', 'text', 'isCorrect', 'explanation']
            }],
            order: [
                ['difficulty', 'ASC'],
                ['id', 'ASC']
            ]
        });

        // Formater les questions pour le client
        const formattedQuestions = questions.map(question => {
            const q = question.toJSON();

            // Séparer les bonnes et mauvaises réponses
            const correctAnswer = q.answers.find(a => a.isCorrect);
            const wrongAnswers = q.answers.filter(a => !a.isCorrect);

            // Mélanger les mauvaises réponses et en prendre 3
            const shuffledWrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 3);

            // Combiner la bonne réponse avec les 3 mauvaises et mélanger
            q.answers = [...shuffledWrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);

            return q;
        });

        res.send(formattedQuestions);
    } catch (err) {
        console.error('Erreur lors de la récupération des questions:', err);
        res.status(500).send({
            message: "Une erreur est survenue lors de la récupération des questions."
        });
    }
};

// Soumettre les réponses et calculer le score
exports.submitQuiz = async (req, res) => {
    try {
        const { userId, categoryId, answers, timeSpent } = req.body;

        console.log('=== DÉBUT SOUMISSION QUIZ ===');
        console.log('Données reçues:', {
            userId,
            categoryId,
            answers: JSON.stringify(answers, null, 2),
            timeSpent
        });

        // Vérifier si un quiz a déjà été soumis pour cette combinaison userId/categoryId dans les dernières 5 secondes
        const recentQuiz = await db.quizHistory.findOne({
            where: {
                userId,
                categoryId,
                completedAt: {
                    [db.Sequelize.Op.gte]: new Date(Date.now() - 5000)
                }
            }
        });

        if (recentQuiz) {
            console.log('Quiz déjà soumis récemment, envoi des résultats existants');
            return res.status(200).send({
                pointsGagnes: recentQuiz.pointsGagnes,
                totalPoints: recentQuiz.totalPoints,
                scorePercentage: recentQuiz.score,
                bonnesReponses: recentQuiz.correctAnswers,
                totalQuestions: recentQuiz.totalQuestions,
                timeSpent: recentQuiz.timeSpent
            });
        }

        // Récupérer toutes les questions du quiz avec leurs points
        const questions = await Question.findAll({
            where: { categoryId: categoryId },
            attributes: ['id', 'points', 'difficulty'],
            include: [{
                model: Answer,
                attributes: ['id', 'isCorrect']
            }]
        });

        console.log('Questions récupérées de la BDD:', JSON.stringify(questions.map(q => ({
            id: q.id,
            points: q.points,
            difficulty: q.difficulty,
            answers: q.answers.map(a => ({ id: a.id, isCorrect: a.isCorrect }))
        })), null, 2));

        if (answers.length !== questions.length) {
            console.error('Nombre de réponses incorrect:', {
                reçues: answers.length,
                attendues: questions.length
            });
            return res.status(400).send({
                message: "Toutes les questions doivent être répondues"
            });
        }

        // Calcul des points
        let pointsGagnes = 0;
        let totalPoints = 0;
        let bonnesReponses = 0;

        console.log('=== DÉBUT CALCUL DES POINTS ===');
        questions.forEach(question => {
            console.log(`\nTraitement de la question ${question.id}:`);
            console.log('- Points de la question:', question.points);

            const questionPoints = parseInt(question.points) || 1;
            totalPoints += questionPoints;
            console.log('- Points après conversion:', questionPoints);
            console.log('- Total des points accumulé:', totalPoints);

            const userAnswer = answers.find(a => a.questionId === question.id);
            console.log('- Réponse de l\'utilisateur:', userAnswer);

            if (userAnswer) {
                const correctAnswer = question.answers.find(a => a.isCorrect);
                console.log('- Bonne réponse:', correctAnswer);

                if (correctAnswer && userAnswer.answerId === correctAnswer.id) {
                    pointsGagnes += questionPoints;
                    bonnesReponses++;
                    console.log('- Réponse correcte! Points gagnés:', questionPoints);
                } else {
                    console.log('- Réponse incorrecte');
                }
            }
        });

        console.log('\n=== RÉSUMÉ DU CALCUL ===');
        console.log({
            pointsGagnes,
            totalPoints,
            bonnesReponses,
            totalQuestions: questions.length
        });

        // Pourcentage basé sur les points
        const scorePercentage = totalPoints > 0 ? Math.round((pointsGagnes / totalPoints) * 100) : 0;
        console.log('Score en pourcentage:', scorePercentage);

        // Enregistrer l'historique
        const quizHistory = await db.quizHistory.create({
            userId,
            categoryId,
            score: scorePercentage,
            totalQuestions: questions.length,
            correctAnswers: bonnesReponses,
            timeSpent,
            pointsGagnes,
            totalPoints
        });

        console.log('Historique créé:', quizHistory.toJSON());

        // Mettre à jour les statistiques de l'utilisateur
        const user = await db.user.findByPk(userId);
        const currentQuizCount = user.quizCompleted || 0;
        const currentAverageScore = user.averageScore || 0;
        const newAverageScore = Math.round(
            ((currentAverageScore * currentQuizCount) + scorePercentage) / (currentQuizCount + 1)
        );

        await user.update({
            quizCompleted: currentQuizCount + 1,
            averageScore: newAverageScore,
            bestScore: Math.max(user.bestScore || 0, scorePercentage)
        });

        const responseData = {
            pointsGagnes,
            totalPoints,
            scorePercentage,
            bonnesReponses,
            totalQuestions: questions.length,
            timeSpent
        };

        console.log('=== RÉPONSE FINALE ===');
        console.log('Données envoyées au client:', responseData);

        res.status(200).send(responseData);
    } catch (err) {
        console.error('Erreur lors de la soumission du quiz:', err);
        res.status(500).send({
            message: "Une erreur est survenue lors de la soumission du quiz."
        });
    }
};
