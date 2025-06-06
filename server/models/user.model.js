const { password } = require("../config/db.config")

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        emailId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        quizCompleted: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        averageScore: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        bestScore: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    });

    return User;
};
