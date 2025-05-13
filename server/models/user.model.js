const { password } = require("../config/db.config")

module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define('user', {
        id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER, allowNull: false },
        firstName: { type: Sequelize.STRING, notEmpty: true },
        lastName: { type: Sequelize.STRING, notEmpty: true },
        emailId: { type: Sequelize.STRING, validate: { isEmail: true } },
        password: { type: Sequelize.STRING, allowNull: false },
    }, {
        tableName: 'users'
    });
    return User;
}