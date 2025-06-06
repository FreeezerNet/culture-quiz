module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("questions", {
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        difficulty: {
            type: Sequelize.ENUM('facile', 'moyen', 'difficile'),
            defaultValue: 'moyen'
        },
        points: {
            type: Sequelize.INTEGER,
            defaultValue: 10
        }
    });

    return Question;
};
