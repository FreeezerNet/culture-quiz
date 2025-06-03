module.exports = (sequelize, Sequelize) => {
    const QuizHistory = sequelize.define("quiz_history", {
        score: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        totalQuestions: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        correctAnswers: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        timeSpent: {
            type: Sequelize.INTEGER, // en secondes
            allowNull: false
        },
        completedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });

    return QuizHistory;
};
