const db = require("../models");
const User = db.user;

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

        res.status(200).send(user);
    } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        res.status(500).send({
            message: "Une erreur est survenue lors de la récupération du profil."
        });
    }
};
