const db = require('./models');

const initializeData = async () => {
    try {
        // Créer les catégories
        const categories = await db.category.bulkCreate([
            { name: 'Culture Générale', description: 'Questions variées sur différents sujets' },
            { name: 'Sciences', description: 'Questions sur les sciences et la technologie' },
            { name: 'Histoire', description: 'Questions sur l\'histoire mondiale' }
        ]);

        // Créer les questions et réponses pour chaque catégorie
        for (const category of categories) {
            if (category.name === 'Culture Générale') {
                const question1 = await db.question.create({
                    text: 'Quelle est la capitale de la France ?',
                    difficulty: 'facile',
                    points: 5,
                    categoryId: category.id
                });

                await db.answer.bulkCreate([
                    { text: 'Paris', isCorrect: true, questionId: question1.id },
                    { text: 'Londres', isCorrect: false, questionId: question1.id },
                    { text: 'Berlin', isCorrect: false, questionId: question1.id },
                    { text: 'Madrid', isCorrect: false, questionId: question1.id }
                ]);

                const question2 = await db.question.create({
                    text: 'Qui a peint la Joconde ?',
                    difficulty: 'moyen',
                    points: 10,
                    categoryId: category.id
                });

                await db.answer.bulkCreate([
                    { text: 'Léonard de Vinci', isCorrect: true, questionId: question2.id },
                    { text: 'Michel-Ange', isCorrect: false, questionId: question2.id },
                    { text: 'Picasso', isCorrect: false, questionId: question2.id },
                    { text: 'Van Gogh', isCorrect: false, questionId: question2.id }
                ]);
            }

            if (category.name === 'Sciences') {
                const question1 = await db.question.create({
                    text: 'Quelle est la formule chimique de l\'eau ?',
                    difficulty: 'facile',
                    points: 5,
                    categoryId: category.id
                });

                await db.answer.bulkCreate([
                    { text: 'H2O', isCorrect: true, questionId: question1.id },
                    { text: 'CO2', isCorrect: false, questionId: question1.id },
                    { text: 'O2', isCorrect: false, questionId: question1.id },
                    { text: 'N2', isCorrect: false, questionId: question1.id }
                ]);

                const question2 = await db.question.create({
                    text: 'Quelle est la vitesse de la lumière ?',
                    difficulty: 'difficile',
                    points: 15,
                    categoryId: category.id
                });

                await db.answer.bulkCreate([
                    { text: '299 792 458 m/s', isCorrect: true, questionId: question2.id },
                    { text: '200 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '300 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '250 000 000 m/s', isCorrect: false, questionId: question2.id }
                ]);
            }

            if (category.name === 'Histoire') {
                const question1 = await db.question.create({
                    text: 'En quelle année a eu lieu la Révolution française ?',
                    difficulty: 'moyen',
                    points: 10,
                    categoryId: category.id
                });

                await db.answer.bulkCreate([
                    { text: '1789', isCorrect: true, questionId: question1.id },
                    { text: '1799', isCorrect: false, questionId: question1.id },
                    { text: '1769', isCorrect: false, questionId: question1.id },
                    { text: '1809', isCorrect: false, questionId: question1.id }
                ]);

                const question2 = await db.question.create({
                    text: 'Qui était le premier empereur romain ?',
                    difficulty: 'difficile',
                    points: 15,
                    categoryId: category.id
                });

                await db.answer.bulkCreate([
                    { text: 'Auguste', isCorrect: true, questionId: question2.id },
                    { text: 'Jules César', isCorrect: false, questionId: question2.id },
                    { text: 'Néron', isCorrect: false, questionId: question2.id },
                    { text: 'Caligula', isCorrect: false, questionId: question2.id }
                ]);
            }
        }

        console.log('Données initiales créées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des données :', error);
    }
};

module.exports = initializeData;
