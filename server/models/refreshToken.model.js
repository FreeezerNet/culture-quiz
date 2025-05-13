const { v4: uuidv4 } = require("uuid");
const config = require("../config/auth.config.js");

module.exports = (sequelize, Sequelize) => {
    const RefreshToken = sequelize.define("refreshToken", {
        token: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiryDate: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    /**
     * Génère et enregistre un nouveau refresh token pour un utilisateur donné,
     * renvoie la chaîne du token.
     */
    RefreshToken.createToken = async function (user) {
        const expiredAt = new Date();
        expiredAt.setSeconds(
            expiredAt.getSeconds() + config.jwtRefreshExpiration
        );

        const _token = uuidv4();
        const refreshToken = await this.create({
            token: _token,
            userId: user.id,
            expiryDate: expiredAt
        });

        return refreshToken.token;
    };

    /**
     * Vérifie si un refresh token est expiré.
     * @param {Object} tokenInstance – instance du modèle RefreshToken
     * @returns {boolean} true si expiré
     */
    RefreshToken.verifyExpiration = (tokenInstance) => {
        return tokenInstance.expiryDate.getTime() < Date.now();
    };

    return RefreshToken;
};
