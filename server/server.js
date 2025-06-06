const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const categoryRouter = require('./routes/category.routes');
const quizRouter = require('./routes/quiz.routes');
const initializeData = require('./init-data');
const db = require('./models');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/quiz', quizRouter);
userRoutes(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Serveur sur ${PORT}`));

// Initialisation de la base de données
const initializeDatabase = async () => {
    try {
        // Désactive les contraintes de clés étrangères
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        console.log('Contraintes de clés étrangères désactivées');

        // Récupère toutes les tables de la base de données
        const [results] = await db.sequelize.query('SHOW TABLES');
        const tableNames = results.map(result => Object.values(result)[0]);

        // Supprime chaque table individuellement
        for (const tableName of tableNames) {
            await db.sequelize.query(`DROP TABLE IF EXISTS \`${tableName}\``);
            console.log(`Table ${tableName} supprimée`);
        }
        console.log('Toutes les tables ont été supprimées');

        // Réactive les contraintes de clés étrangères
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
        console.log('Contraintes de clés étrangères réactivées');

        // Crée toutes les tables
        await db.sequelize.sync();
        console.log('Toutes les tables ont été recréées');

        // Initialise les données
        await initializeData();
        console.log('Données initiales créées avec succès');
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
        // Réactive les contraintes de clés étrangères en cas d'erreur
        await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    }
};

initializeDatabase();
