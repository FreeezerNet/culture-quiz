const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const RefreshToken = db.refreshToken;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    console.log('⚙️  signup handler called with:', req.body);

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.emailId,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        console.log('Utilisateur créé:', user);
        res.status(200).send({
            message: "Utilisateur enregistré avec succès !"
        });
    }).catch(err => {
        console.error('Erreur lors de la création de l\'utilisateur:', err);
        res.status(500).send({
            message: err.message || 'Une erreur est survenue lors de la création de l\'utilisateur.'
        });
    });
};


exports.signin = (req, res) => {
    console.log(req.body);

    User.findOne({
        where: {
            emailId: req.body.emailId
        }
    }).then(async (user) => {
        if (!user) {
            return res.status(404).send({
                message: "Utilisateur non trouvé !"
            });
        }
        let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Mot de passe incorrect!"
            });
        }

        let token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration
        });
        let refreshToken = await RefreshToken.createToken(user);

        res.status(200).send({
            id: user.id,
            username: user.emailId,
            accessToken: token,
            refreshToken: refreshToken,
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}


exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken: requestToken } = req.body;
        if (!requestToken) {
            return res.status(403).json({ message: "Le jeton d'actualisation est requis !" });
        }

        const storedToken = await RefreshToken.findOne({ where: { token: requestToken } });
        if (!storedToken) {
            return res.status(403).json({ message: "Le jeton d'actualisation n'existe pas dans la bdd !" });
        }

        if (RefreshToken.verifyExpiration(storedToken)) {
            RefreshToken.destroy({ where: { id: storedToken.id } });
            return res.status(403).json({
                message: "Le jeton d'actualisation a expiré. Veuillez vous reconnecter."
            });
        }

        const user = await storedToken.getUser();
        const newAccessToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtRefreshExpiration
        });

        return res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: storedToken.token
        });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};
