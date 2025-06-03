module.exports = (sequelize, Sequelize) => {
    const Answer = sequelize.define("answers", {
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        isCorrect: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        explanation: {
            type: Sequelize.TEXT
        }
    });

    return Answer;
};
