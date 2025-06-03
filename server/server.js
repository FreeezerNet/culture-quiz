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
        // Vérifie si les tables existent déjà
        const categories = await db.category.findAll();

        // Si aucune catégorie n'existe, on initialise les données
        if (categories.length === 0) {
            await db.sequelize.sync({ force: true });
            console.log('Base de données synchronisée et tables recréées');
            await initializeData();
        } else {
            // Sinon, on synchronise simplement sans forcer
            await db.sequelize.sync();
            console.log('Base de données synchronisée');
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation de la base de données:', error);
    }
};

initializeDatabase();
