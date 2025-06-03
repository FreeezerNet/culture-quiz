const config = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        host: config.hostname,
        port: config.port,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        },
        define: {
            timestamps: false
        }
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modèles
db.user = require("./user.model.js")(sequelize, Sequelize);
db.refreshToken = require("./refreshToken.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.question = require("./question.model.js")(sequelize, Sequelize);
db.answer = require("./answer.model.js")(sequelize, Sequelize);
db.quizHistory = require("./quizHistory.model.js")(sequelize, Sequelize);

// Relations
db.refreshToken.belongsTo(db.user, {
    foreignKey: 'userId',
    targetKey: 'id'
});

// Une catégorie a plusieurs questions
db.category.hasMany(db.question);
db.question.belongsTo(db.category);

// Une question a plusieurs réponses
db.question.hasMany(db.answer);
db.answer.belongsTo(db.question);

// Un utilisateur a plusieurs historiques de quiz
db.user.hasMany(db.quizHistory);
db.quizHistory.belongsTo(db.user);

// Un historique de quiz est lié à une catégorie
db.category.hasMany(db.quizHistory);
db.quizHistory.belongsTo(db.category);

module.exports = db;
