const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const RefreshToken = db.refreshToken;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Role = db.role;

exports.signup = (req, res) => {
    console.log('⚙️  signup handler called with:', req.body);

    User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailId: req.body.email,
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
            emailId: req.body.email
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
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token non fourni" });
        }

        const decoded = jwt.verify(token, config.secret);
        const user = await User.findById(decoded.id).populate("roles", "-__v");

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const newToken = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: config.jwtExpiration
        });

        const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

        res.status(200).json({
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            roles: authorities,
            accessToken: newToken
        });
    } catch (err) {
        console.error("Erreur lors du rafraîchissement du token:", err);
        return res.status(401).json({ message: "Token invalide" });
    }
};
