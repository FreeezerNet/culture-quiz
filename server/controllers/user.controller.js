const db = require("../models");
const User = db.user;
const QuizHistory = db.quizHistory;

exports.allAccess = (req, res) => {
    res.status(200).send("Contenu public.");
};
exports.userAccess = (req, res) => {
    res.status(200).send("Contenu utilisateur.");
};

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'firstName', 'lastName', 'emailId', 'quizCompleted', 'averageScore', 'bestScore']
        });

        if (!user) {
            return res.status(404).send({
                message: "Utilisateur non trouvé."
            });
        }

        // Calculer le temps total passé dans les quiz
        const totalTimeSpent = await QuizHistory.sum('timeSpent', {
            where: { userId: userId }
        });

        // Ajouter le temps total au profil
        const userProfile = {
            ...user.toJSON(),
            totalTimeSpent: totalTimeSpent || 0
        };

        res.status(200).send(userProfile);
    } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        res.status(500).send({
            message: "Une erreur est survenue lors de la récupération du profil."
        });
    }
};
