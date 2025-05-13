const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
    if (err instanceof TokenExpiredError) {
        return res.status(401).send({
            message: "Non autorisé, Le jeton a expiré !"
        });
    }

    return res.sendStatus(401).send({ message: "Non autorisé !" });
}

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        return res.status(403).send({ message: "Aucun jeton fourni !" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return catchError(err, res);
        }
        req.userId = decoded.id;
        next();
    });
}

const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;
