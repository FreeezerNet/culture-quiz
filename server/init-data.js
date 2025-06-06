const db = require('./models');

const initializeData = async () => {
    try {
        // Créer un utilisateur admin par défaut
        const adminUser = await db.user.create({
            firstName: 'Adenan',
            lastName: 'pass : 1111',
            emailId: 'akhachnane@gmail.com',
            password: '$2b$08$2OgFmgfkSteDr5V8JvloyuUZM79TfU3yXfGE.vHk8ueu/a.ZACTc.',
            quizCompleted: 0,
            averageScore: 0,
            bestScore: 0
        });

        // Créer les catégories
        const categories = await db.category.bulkCreate([
            { name: 'Culture Générale', description: 'Questions variées sur différents sujets', imageUrl: 'https://img.icons8.com/?size=100&id=CxypJ1aoy68v&format=png&color=000000' },
            { name: 'Sciences', description: 'Questions sur les sciences et la technologie', imageUrl: 'https://img.icons8.com/?size=100&id=EdEF9TzsFPs1&format=png&color=000000' },
            { name: 'Histoire', description: 'Questions sur l\'histoire mondiale', imageUrl: 'https://img.icons8.com/?size=100&id=q79Z7xiOM2AQ&format=png&color=000000' }
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
                    { text: 'Paris', isCorrect: true, questionId: question1.id, explanation: 'Paris est la capitale de la France depuis très longtemps' },
                    { text: 'Londres', isCorrect: false, questionId: question1.id },
                    { text: 'Berlin', isCorrect: false, questionId: question1.id },
                    { text: 'Madrid', isCorrect: false, questionId: question1.id },
                    { text: 'Rome', isCorrect: false, questionId: question1.id },
                    { text: 'Amsterdam', isCorrect: false, questionId: question1.id },
                    { text: 'Bruxelles', isCorrect: false, questionId: question1.id },
                    { text: 'Vienne', isCorrect: false, questionId: question1.id },
                    { text: 'Lisbonne', isCorrect: false, questionId: question1.id },
                    { text: 'Athènes', isCorrect: false, questionId: question1.id }
                ]);

                const question2 = await db.question.create({
                    text: 'Qui a peint la Joconde ?',
                    difficulty: 'moyen',
                    points: 10,
                    categoryId: category.id
                });

                await db.answer.bulkCreate([
                    { text: 'Léonard de Vinci', isCorrect: true, questionId: question2.id, explanation: 'La Joconde a été peinte par Léonard de Vinci entre 1503 et 1506' },
                    { text: 'Michel-Ange', isCorrect: false, questionId: question2.id },
                    { text: 'Picasso', isCorrect: false, questionId: question2.id },
                    { text: 'Van Gogh', isCorrect: false, questionId: question2.id },
                    { text: 'Rembrandt', isCorrect: false, questionId: question2.id },
                    { text: 'Monet', isCorrect: false, questionId: question2.id },
                    { text: 'Renoir', isCorrect: false, questionId: question2.id },
                    { text: 'Dali', isCorrect: false, questionId: question2.id },
                    { text: 'Cézanne', isCorrect: false, questionId: question2.id },
                    { text: 'Gauguin', isCorrect: false, questionId: question2.id }
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
                    { text: 'H2O', isCorrect: true, questionId: question1.id, explanation: 'H2O représente deux atomes d\'hydrogène et un atome d\'oxygène' },
                    { text: 'CO2', isCorrect: false, questionId: question1.id },
                    { text: 'O2', isCorrect: false, questionId: question1.id },
                    { text: 'N2', isCorrect: false, questionId: question1.id },
                    { text: 'H2SO4', isCorrect: false, questionId: question1.id },
                    { text: 'NaCl', isCorrect: false, questionId: question1.id },
                    { text: 'CH4', isCorrect: false, questionId: question1.id },
                    { text: 'NH3', isCorrect: false, questionId: question1.id },
                    { text: 'HCl', isCorrect: false, questionId: question1.id },
                    { text: 'H2O2', isCorrect: false, questionId: question1.id }
                ]);

                const question2 = await db.question.create({
                    text: 'Quelle est la vitesse de la lumière ?',
                    difficulty: 'difficile',
                    points: 15,
                    categoryId: category.id
                });

                await db.answer.bulkCreate([
                    { text: '299 792 458 m/s', isCorrect: true, questionId: question2.id, explanation: 'C\'est la vitesse exacte de la lumière dans le vide' },
                    { text: '200 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '300 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '250 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '150 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '350 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '400 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '180 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '220 000 000 m/s', isCorrect: false, questionId: question2.id },
                    { text: '280 000 000 m/s', isCorrect: false, questionId: question2.id }
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
                    { text: '1789', isCorrect: true, questionId: question1.id, explanation: 'La Révolution française a débuté en 1789 avec la prise de la Bastille' },
                    { text: '1799', isCorrect: false, questionId: question1.id },
                    { text: '1769', isCorrect: false, questionId: question1.id },
                    { text: '1809', isCorrect: false, questionId: question1.id },
                    { text: '1779', isCorrect: false, questionId: question1.id },
                    { text: '1790', isCorrect: false, questionId: question1.id },
                    { text: '1780', isCorrect: false, questionId: question1.id },
                    { text: '1795', isCorrect: false, questionId: question1.id },
                    { text: '1785', isCorrect: false, questionId: question1.id },
                    { text: '1792', isCorrect: false, questionId: question1.id }
                ]);

                const question2 = await db.question.create({
                    text: 'Qui était le premier empereur romain ?',
                    difficulty: 'difficile',
                    points: 15,
                    categoryId: category.id
                });

                await db.answer.bulkCreate([
                    { text: 'Auguste', isCorrect: true, questionId: question2.id, explanation: 'Auguste (Octave) est devenu le premier empereur romain en 27 av. J.-C.' },
                    { text: 'Jules César', isCorrect: false, questionId: question2.id },
                    { text: 'Néron', isCorrect: false, questionId: question2.id },
                    { text: 'Caligula', isCorrect: false, questionId: question2.id },
                    { text: 'Tibère', isCorrect: false, questionId: question2.id },
                    { text: 'Claude', isCorrect: false, questionId: question2.id },
                    { text: 'Trajan', isCorrect: false, questionId: question2.id },
                    { text: 'Hadrien', isCorrect: false, questionId: question2.id },
                    { text: 'Marc Aurèle', isCorrect: false, questionId: question2.id },
                    { text: 'Commodus', isCorrect: false, questionId: question2.id }
                ]);
            }
        }

        // Créer un historique de quiz fictif pour l'admin
        await db.quizHistory.create({
            userId: adminUser.id,
            categoryId: categories[0].id,
            score: 0,
            totalQuestions: 0,
            correctAnswers: 0,
            timeSpent: 0,
            completedAt: new Date()
        });

        console.log('Données initiales créées avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des données :', error);
    }
};

module.exports = initializeData;
